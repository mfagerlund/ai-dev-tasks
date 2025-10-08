# Initiating a Code Review Using the PRD Workflow

This guide explains how to use the AI Dev Tasks workflow to conduct comprehensive code reviews of your codebase.

## Overview

Code reviews are a perfect fit for the structured PRD workflow, even though they don't involve traditional feature development. The workflow helps ensure thorough, systematic code analysis with clear deliverables.

**Key differences for code reviews:**
- **UI Mockups**: Omitted - code reviews are headless analysis tasks
- **Type Definitions**: Omitted - no storage requirements, pure analysis and reporting
- **Focus**: Analysis, findings, and recommendations rather than implementation

## Initial Prompt Template

Use this template to initiate a code review PRD:

```
Use @create-prd.md

I need a comprehensive code review of [scope description].

The review should cover:
- Code quality and maintainability
- Security vulnerabilities and best practices
- Performance issues and optimization opportunities
- Architectural patterns and consistency
- Testing coverage and quality
- Documentation completeness
- [Add/remove areas based on your needs]

The deliverable should be a structured report with:
- Prioritized findings (critical, high, medium, low)
- Specific file locations and line numbers for issues
- Actionable recommendations for each finding
- Example fixes where applicable

Reference these files/directories for context: @[relevant paths]
```

## Scope Examples

### Full Codebase Review
```
I need a comprehensive code review of the entire codebase focusing on security
and maintainability before our v2.0 release.
```

### Module-Specific Review
```
I need a code review of the authentication module (@src/auth/) to identify
security vulnerabilities and ensure best practices before production deployment.
```

### Technology-Specific Review
```
I need a code review of all React components (@src/components/) focusing on
performance optimization and modern React patterns (hooks, composition).
```

### Pre-Migration Review
```
I need a code review to assess our current Python 2.7 codebase (@legacy/) and
identify compatibility issues and refactoring requirements for Python 3.x migration.
```

## What to Expect

### 1. Clarifying Questions

The AI will generate questions in `/tasks/[review-name]-questions.md` such as:

- **Review Scope**: Full codebase vs. specific modules? Include dependencies?
- **Priority Focus**: Security, performance, maintainability, or balanced approach?
- **Severity Levels**: Which severity levels matter most for your timeline?
- **Output Format**: Single report, per-file reports, or grouped by issue type?
- **Standards**: Specific coding standards, linters, or framework guidelines to enforce?
- **Depth**: Surface-level scan vs. deep architectural analysis?
- **Action Items**: Just identify issues or include refactoring plans?

### 2. PRD Generation

Based on your answers, the AI creates a PRD with:

- **Goals**: What the review aims to accomplish
- **Scope**: Files, directories, and areas to analyze
- **Review Criteria**: Specific checks and standards to apply
- **Deliverables**: Report format, findings structure, recommendation format
- **Success Metrics**: How to measure review completeness

The PRD will note:
- "UI mockup omitted - headless feature"
- "Types omitted - no storage requirements"

### 3. Task List Generation

Using `@generate-tasks.md`, the AI creates a detailed task list that might include:

```markdown
Task 0.0 omitted - no storage requirements for this feature

- [ ] 1.0 Analyze codebase structure and create inventory
  - [ ] 1.1 Scan directory structure and file organization
  - [ ] 1.2 Identify main modules and dependencies
  - [ ] 1.3 Document architectural patterns in use

- [ ] 2.0 Security analysis
  - [ ] 2.1 Check for common vulnerabilities (OWASP Top 10)
  - [ ] 2.2 Review authentication and authorization logic
  - [ ] 2.3 Analyze input validation and sanitization

- [ ] 3.0 Code quality assessment
  - [ ] 3.1 Review code complexity and maintainability
  - [ ] 3.2 Check adherence to coding standards
  - [ ] 3.3 Identify code duplication and refactoring opportunities
```

### 4. Iterative Review Process

Using `@process-task-list.md`, the AI works through each task:

1. Completes one analysis sub-task (e.g., "Review authentication logic")
2. Documents findings with file paths and line numbers
3. Waits for your approval before proceeding
4. Marks task complete and moves to next

## Complete Example Workflow

### Step 1: Initiate PRD
```
Use @create-prd.md

I need a security-focused code review of our authentication module before
production deployment. Focus on vulnerabilities, best practices, and compliance
with OWASP guidelines.

Reference: @src/auth/ @src/middleware/auth.ts
```

### Step 2: Answer Clarifying Questions
The AI creates `security-auth-review-questions.md` with questions about:
- Review depth (surface scan vs. deep analysis)
- Compliance requirements (OWASP, SOC2, etc.)
- Output format preferences
- Critical vs. non-critical issues

### Step 3: Generate Tasks
```
Now take @0001-prd-security-auth-review.md and create tasks using @generate-tasks.md
```

### Step 4: Execute Review
```
Please start on task 1.1 and use @process-task-list.md
```

The AI works through each task, documenting findings incrementally with your approval.

## Best Practices

1. **Be Specific About Scope**: Clearly define which files/directories to review
2. **Prioritize Concerns**: Focus on what matters most (security, performance, etc.)
3. **Provide Context**: Reference relevant coding standards, frameworks, or compliance requirements
4. **Review Incrementally**: Approve each task to ensure findings are accurate before proceeding
5. **Request Examples**: Ask for example fixes or refactoring suggestions for major issues

## Output Deliverables

The final review typically produces:

- **PRD**: `/tasks/[n]-prd-[review-name].md` - Review objectives and criteria
- **Task List**: `/tasks/tasks-[n]-prd-[review-name].md` - Detailed analysis breakdown
- **Findings Report**: Structured document with:
  - Executive summary
  - Findings by severity/category
  - File locations and line numbers
  - Specific recommendations
  - Example fixes
  - Refactoring suggestions

## Tips for Large Codebases

- **Chunk the Review**: Create separate PRDs for different modules or concerns
- **Start High-Level**: Begin with architectural review, then dive into specifics
- **Parallel Reviews**: Use multiple PRDs to review different aspects simultaneously
- **Incremental Approach**: Review critical paths first, then expand to full codebase
- **Leverage Existing Tools**: Combine with linter/analyzer output for comprehensive coverage

## Common Review Types

| Review Type | Focus Areas | Typical Scope |
|-------------|-------------|---------------|
| Security Review | Vulnerabilities, auth, data validation | Critical paths, user inputs |
| Performance Review | Bottlenecks, optimization, scaling | Hot paths, data processing |
| Maintainability Review | Code quality, patterns, documentation | Full codebase or module |
| Pre-Release Review | All concerns, regression risks | Recent changes, critical features |
| Migration Assessment | Compatibility, breaking changes | Legacy code, dependencies |
| Compliance Review | Standards adherence, audit readiness | Regulated components |

## Integration with Development Workflow

Code reviews using this process integrate well with:

- **Pre-deployment checks**: Systematic review before production releases
- **Onboarding**: Help new team members understand codebase quality
- **Technical debt planning**: Identify and prioritize refactoring work
- **Architecture decisions**: Validate patterns and consistency
- **Documentation**: Generate comprehensive codebase documentation as a byproduct
