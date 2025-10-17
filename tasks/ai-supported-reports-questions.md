# AI-Supported Reports - Clarifying Questions

Based on the finalized specification at `C:\Nitro\NCVIB\POCCreateReportFromText\Finalized Specification.md`, I need your input on a few remaining decisions to create a complete PRD.

---

## 1. Phase Scope for This PRD
**Question:** Which implementation phase(s) should this PRD cover?
- A) Phase 1 only (Foundation & Data Access) - get LLM querying data first (recommended for POC)
- B) Phases 1 + 2 (Foundation + Report Structure & Hydration) - includes report definition and hydration
- C) Phases 1 + 2 + 3 (Complete POC) - all the way through Word document generation
- D) All phases including Phase 4 (Polish & Enhancement)

**Your answer:**
**Rationale:** Breaking into smaller PRDs allows faster iteration and validation. Phase 1 proves the API/LLM integration works before investing in report generation.

---

## 2. Report Storage Strategy
**Question:** How should ReportDefinitions be persisted?
- A) JSON files in file system - simple for POC, easy to inspect (recommended for POC)
- B) Database table with JSON column - easier querying, better for production
- C) Database with normalized schema - most robust, but more complex
- D) In-memory only (no persistence) - simplest, but reports lost on restart

**Your answer:**
**Rationale:** For POC, file system is fastest to implement and allows easy manual inspection. Can migrate to database later.

Store in C:\Slask\

---

## 3. Authentication Implementation Timeline
**Question:** When should token authentication be implemented?
- A) Skip entirely for POC - use hardcoded project/user context (recommended)
- B) Include in Phase 1 - 8-char tokens, in-memory storage
- C) Include in Phase 2 - after core functionality proven
- D) Post-POC only - focus on functionality first

**Your answer:**
**Rationale:** Authentication adds complexity without proving core value. Hardcoded context gets POC working faster.

---

## 4. OpenAPI Documentation Approach
**Question:** How should API documentation be provided to the LLM?
- A) Generate OpenAPI JSON dynamically from controller attributes (recommended)
- B) Manually maintain OpenAPI YAML file
- C) Custom JSON schema endpoint with simplified structure
- D) Include documentation directly in generated prompt (no separate endpoint)

**Your answer:**
**Rationale:** Dynamic generation from attributes keeps docs in sync with code automatically using existing Swagger infrastructure.

---

## 5. ViewDataBuilder Reuse Strategy
**Question:** How should existing ViewDataBuilders be adapted for AI endpoints?
- A) Create thin wrapper classes that call existing builders and simplify output (recommended)
- B) Modify existing builders to support "simplified" mode flag
- C) Copy and paste existing builder code into new AI-specific builders
- D) Use existing builders as-is, let LLM handle verbose data

**Your answer:**
**Rationale:** Wrapper approach keeps existing code unchanged while providing LLM-optimized output. Follows DRY principle.

Use the old builders and create completely new view data objects that are slimmed down to work as well as possible for this particular use case.

---

## 6. Period Selection in UI
**Question:** Which predefined period options should be available?
- A) Current month, Previous month, Current quarter, Previous quarter, YTD, Custom (recommended)
- B) Last 7 days, Last 30 days, Last 90 days, Custom
- C) Current week, Previous week, Current month, Previous month, Custom
- D) Only custom date range picker (most flexible, but less user-friendly)

**Your answer:**
**Rationale:** Business-aligned periods (month/quarter/YTD) match typical reporting cycles in construction/monitoring projects.

Use two fixed dates for POC. 2025-01-01 to 2025-03-31 (how many days in march?) we have period filter components that we'll reuse.

---

## 7. Error Handling Strategy
**Question:** How should API errors be communicated to the LLM?
- A) Standard HTTP status codes + JSON error objects with message and code (recommended)
- B) Always return 200 OK with error details in response body
- C) Simple error messages in plain text
- D) Detailed stack traces for debugging

**Your answer:**
**Rationale:** Standard REST error handling with structured JSON helps LLM understand and communicate errors to users.

---

## 8. Data Pagination Defaults
**Question:** What should the default pagination values be?
- A) top=100, max=1000 (recommended in spec)
- B) top=50, max=500 (more conservative)
- C) top=200, max=2000 (more permissive)
- D) No limits - return all data

**Your answer:**
**Rationale:** Balances LLM context window constraints with useful data amounts. 100 rows typically sufficient for summaries.

Default = top 20 but max can be left open.

---

## 9. Table Column Configuration
**Question:** How should users/LLMs specify which columns to include in report tables?
- A) List specific property names to include (whitelist approach) (recommended)
- B) List specific property names to exclude (blacklist approach)
- C) Include all properties by default, allow column hiding
- D) Predefined column sets (e.g., "summary", "detailed", "full")

**Your answer:**
**Rationale:** Explicit whitelist gives LLM control over report content and makes intent clear in ReportDefinition JSON.

Ignore for POC

---

## 10. Word Document Formatting
**Question:** What level of formatting control should ReportDefinition support?
- A) Basic only - headings (H1-H4), paragraphs, tables (recommended for POC)
- B) Basic + text styles (bold, italic, underline)
- C) Basic + styles + colors and fonts
- D) Full formatting including margins, page layout, custom styles

**Your answer:**
**Rationale:** Basic formatting proves concept while keeping implementation simple. Can extend based on user feedback.

---

## 11. Hydration Performance
**Question:** How should report hydration handle slow API calls?
- A) Sequential - call endpoints one at a time (simple, easier to debug) (recommended)
- B) Parallel - call all endpoints simultaneously (faster, more complex)
- C) Mixed - parallel within sections, sequential between sections
- D) Background job - hydrate asynchronously, notify when complete

**Your answer:**
**Rationale:** Sequential is easier to implement and debug. Can optimize if performance becomes issue.

---

## 12. LLM Prompt Strategy
**Question:** How should the initial prompt be structured for LLM interaction?
- A) Single comprehensive prompt with all context and examples (recommended)
- B) Multi-stage prompts - start simple, add detail as needed
- C) System prompt + user message approach
- D) Provide API docs only, let LLM figure out rest

**Your answer:**
**Rationale:** Comprehensive prompt reduces back-and-forth and ensures LLM has all necessary context from start.

---

## 13. Report Validation
**Question:** Should the system validate ReportDefinition structure before hydration?
- A) Yes - validate against JSON schema, return clear errors (recommended)
- B) Yes - validate but be lenient, attempt to fix common issues
- C) Minimal - check required fields only
- D) No - attempt hydration and let it fail naturally

**Your answer:**
**Rationale:** Schema validation catches errors early with clear feedback, helping LLM correct issues quickly.

---

## 14. UI Framework
**Question:** The spec mentions Angular 19 - should we use any specific component library?
- A) Angular Material (if already used in project) (recommended)
- B) Bootstrap components (spec mentions Bootstrap)
- C) Custom components only
- D) Minimal HTML forms (no component library)

**Your answer:**
**Rationale:** Consistency with existing project UI patterns. Need to check what's currently used.

B.

---

## 15. Testing Approach
**Question:** What level of testing should be included in Phase 1 implementation?
- A) Manual testing with ngrok + LLM interaction only (recommended for POC)
- B) Unit tests for ViewDataBuilders and controllers
- C) Integration tests for full API endpoints
- D) Full test coverage including E2E tests

**Your answer:**
**Rationale:** Manual testing proves concept fastest. Can add automated tests once behavior is validated.

---

## 16. Logging and Observability
**Question:** What should be logged for AI report API calls?
- A) Basic - endpoint called, project ID, timestamp, response time (recommended)
- B) Detailed - include query parameters and response sizes
- C) Full - log request/response bodies for debugging
- D) Minimal - errors only

**Your answer:**
**Rationale:** Basic logging enables troubleshooting without overwhelming logs or exposing sensitive data.

---

## 17. Example Report for Prompt
**Question:** How should existing reports be provided to the LLM in the generated prompt?
- A) Include full report structure as Markdown in prompt (recommended)
- B) Provide report file path for LLM to load
- C) Describe report verbally without showing structure
- D) Skip for Phase 1 - add in Phase 2

**Your answer:**
**Rationale:** Including report in prompt gives LLM clear target to work toward. Markdown is LLM-friendly format.

If you're referring to the users pre-existing reports, they won't be provided. The user will ultimately pick a report and the instructions for that report will be provided.

---

## 18. Success Metrics for POC
**Question:** How will we measure if Phase 1 POC is successful?
- A) LLM successfully calls all 5 endpoints and retrieves data (recommended)
- B) LLM can answer 3+ predefined questions about project data
- C) End-to-end report generation (requires Phase 3)
- D) User feedback/satisfaction scores

**Your answer:**
**Rationale:** Clear, objective criteria for Phase 1. Can expand metrics for later phases.

---

## 19. NCVIB Domain Context
**Question:** Should the PRD include domain-specific explanations (blasts, measurement points, etc.)?
- A) Yes - brief glossary for junior developers unfamiliar with domain (recommended)
- B) Yes - detailed explanations with context
- C) No - assume developer will learn domain as needed
- D) Link to external documentation only

**Your answer:**
**Rationale:** Glossary helps junior developers understand feature context without overwhelming PRD.

---

## 20. Next Steps After Phase 1
**Question:** What should happen after Phase 1 PRD is implemented?
- A) Create separate PRD for Phase 2 (Report Structure & Hydration) (recommended)
- B) Extend this PRD with Phase 2 details
- C) Skip to Phase 3 if Phase 1 works well
- D) Evaluate POC viability before continuing

**Your answer:**
**Rationale:** Separate PRDs allow course correction based on Phase 1 learnings and maintain clear scope.

---

## Additional Context

**Existing Specification Reference:**
The finalized specification is at: `C:\Nitro\NCVIB\POCCreateReportFromText\Finalized Specification.md`

**Project Context:**
- .NET 8.0 C# backend with ASP.NET Core
- Angular 19 TypeScript frontend
- NHibernate ORM with SQL Server
- Bootstrap + Material for UI
- Existing Swagger/OpenAPI infrastructure

**Key Technical Patterns:**
- ViewDataBuilder pattern for data aggregation
- `.ToFuture()` for query batching
- DocumentFormat.OpenXml for Word generation
- Existing project/user injection mechanisms

---

Please fill in your answers above. When done, let me know and I'll generate the PRD based on your responses.
