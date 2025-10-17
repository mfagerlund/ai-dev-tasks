// AI-Supported Reports - Phase 1 Type Definitions
// Do not reference by ID. Create DTOs for serialization in serializations.ts

// ============================================================================
// Core Domain Types
// ============================================================================

/**
 * Project overview containing metadata and entity counts
 */
export interface AiReportProjectOverview {
  projectId: number;
  projectName: string;
  description: string;
  periodFrom: Date;
  periodTo: Date;
  entityCounts: EntityCounts;
}

/**
 * Entity counts for the project
 */
export interface EntityCounts {
  measurementPoints: number;
  blasts: number;
  events: number;
  inventoryObjects: number;
  inspectionObjects: number;
  pointsOfInterest: number;
  users: number;
}

// ============================================================================
// Blast Types
// ============================================================================

/**
 * Collection of blasts with pagination metadata
 */
export interface AiReportBlasts {
  totalCount: number;
  blasts: AiReportBlast[];
}

/**
 * Individual blast event
 */
export interface AiReportBlast {
  id: string; // GUID
  dateTime: Date;
  name: string;
  measurementPoints: AiReportMeasurementPoint[]; // Strong references
  maxVibration: number | null;
  location: string;
}

// ============================================================================
// Measurement Point Types
// ============================================================================

/**
 * Collection of measurement points with pagination metadata
 */
export interface AiReportMeasurementPoints {
  totalCount: number;
  measurementPoints: AiReportMeasurementPoint[];
}

/**
 * Individual measurement point (sensor location)
 */
export interface AiReportMeasurementPoint {
  id: number;
  name: string;
  placement: string;
  isActive: boolean;
  measurementType: MeasurementType;
}

/**
 * Type of measurement being performed
 */
export enum MeasurementType {
  Vibration = 'Vibration',
  Noise = 'Noise',
  Air = 'Air',
  Combined = 'Combined'
}

// ============================================================================
// Notification Types
// ============================================================================

/**
 * Collection of notifications with pagination metadata
 */
export interface AiReportNotifications {
  totalCount: number;
  notifications: AiReportNotification[];
}

/**
 * Individual notification sent to stakeholders
 */
export interface AiReportNotification {
  id: string; // GUID
  sentDate: Date;
  type: NotificationType;
  recipients: string[]; // Email addresses
  blast: AiReportBlast | null; // Strong reference (may be null for cancellation notifications)
}

/**
 * Type of notification
 */
export enum NotificationType {
  BlastSchedule = 'BlastSchedule',
  BlastResult = 'BlastResult',
  Cancellation = 'Cancellation',
  Alert = 'Alert'
}

// ============================================================================
// Blast Statistics Types
// ============================================================================

/**
 * Aggregated blast statistics
 */
export interface AiReportBlastStatistics {
  totalBlasts: number;
  averageVibration: number;
  maxVibration: number;
  blastsExceedingLimit: number;
  periodFrom: Date;
  periodTo: Date;
}

// ============================================================================
// Query Parameter Types
// ============================================================================

/**
 * Query parameters for blasts endpoint
 */
export interface BlastsQueryParams {
  fromDate?: Date; // Defaults to 2025-01-01
  toDate?: Date; // Defaults to 2025-03-31
  top?: number; // Default 20, no hard max
  skip?: number; // Default 0
  sortBy?: BlastSortField;
}

/**
 * Fields that can be used to sort blasts
 */
export enum BlastSortField {
  DateTime = 'DateTime',
  Name = 'Name',
  MaxVibration = 'MaxVibration'
}

/**
 * Query parameters for measurement points endpoint
 */
export interface MeasurementPointsQueryParams {
  loadActive?: boolean; // Default true
  loadInactive?: boolean; // Default false
  top?: number; // Default 20, no hard max
  skip?: number; // Default 0
  sortBy?: MeasurementPointSortField;
}

/**
 * Fields that can be used to sort measurement points
 */
export enum MeasurementPointSortField {
  Name = 'Name',
  Placement = 'Placement',
  MeasurementType = 'MeasurementType'
}

/**
 * Query parameters for notifications endpoint
 */
export interface NotificationsQueryParams {
  daysBack?: number; // Default 30
  top?: number; // Default 20, no hard max
  skip?: number; // Default 0
}

// ============================================================================
// Error Types
// ============================================================================

/**
 * Standard error response
 */
export interface AiReportErrorResponse {
  message: string; // Human-readable error description
  code: string; // Machine-readable error code
  details?: Record<string, any>; // Optional additional context
}

/**
 * Standard error codes
 */
export enum ErrorCode {
  InvalidDateFormat = 'INVALID_DATE_FORMAT',
  InvalidParameter = 'INVALID_PARAMETER',
  ResourceNotFound = 'RESOURCE_NOT_FOUND',
  InternalError = 'INTERNAL_ERROR',
  ValidationError = 'VALIDATION_ERROR'
}

// ============================================================================
// UI Component Types
// ============================================================================

/**
 * Form model for report configuration
 */
export interface ReportConfigurationForm {
  reportName: string;
  userInstructions: string;
}

/**
 * Generated prompt content
 */
export interface GeneratedPrompt {
  content: string;
  projectName: string;
  projectId: number;
  periodFrom: Date;
  periodTo: Date;
  baseUrl: string;
  generatedAt: Date;
}

/**
 * State of the prompt generation UI
 */
export interface PromptGenerationState {
  isGenerating: boolean;
  hasGenerated: boolean;
  form: ReportConfigurationForm;
  generatedPrompt: GeneratedPrompt | null;
  error: string | null;
}

// ============================================================================
// Notes for Implementation
// ============================================================================

/**
 * SERIALIZATION NOTES:
 *
 * These types use strong object references (e.g., AiReportBlast contains
 * measurementPoints: AiReportMeasurementPoint[]). When serializing to JSON
 * for API responses, create DTOs that use ID references instead:
 *
 * Example DTO structure (to be created separately):
 * ```typescript
 * export interface AiReportBlastDTO {
 *   id: string;
 *   dateTime: string; // ISO 8601
 *   name: string;
 *   measurementPointIds: number[]; // ID references, not objects
 *   maxVibration: number | null;
 *   location: string;
 * }
 * ```
 *
 * The DTOs should be defined in a separate serializations.ts file.
 */

/**
 * ID FORMAT:
 * - IDs use 6 characters from [a-zA-Z0-9] character set
 * - IDs only exist for DTO serialization, not on domain objects themselves
 * - Example: "aB3xY9"
 *
 * Note: This applies to future phases when reports are persisted.
 * Phase 1 uses existing database IDs (numbers for measurement points,
 * GUIDs for blasts/notifications).
 */
