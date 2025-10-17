# Clarifying Questions: Code Review / Best Practices

## 1. What type of output are you looking for?
**Question:** What would you like as the end result of this request?
- A) Immediate code review report with findings and recommendations (not a PRD - just analyze the code now)
- B) PRD for a "Code Quality Improvement" feature that would add linting, formatting, CI checks, etc. to the project
- C) PRD for implementing specific best practice patterns (e.g., error handling, logging, testing standards) across the codebase
- D) Structured improvement plan with actionable tasks to address current code quality issues

**Your answer:** B
**Rationale:** A code review is typically an analysis task, not a feature to build. Option A would give you immediate feedback. Options B-D would create plans for systematic improvements.

---

## 2. If you want a PRD (Options B-D above), what's the scope?
**Question:** What specific areas should this "feature" address?
- A) Add development tooling (ESLint, Prettier, husky hooks, CI/CD workflows)
- B) Refactor existing code to follow established patterns (DRY, SOLID, etc.)
- C) Implement missing infrastructure (error handling, logging, monitoring)
- D) Add quality gates (test coverage requirements, type checking, code review checklist)
- E) All of the above - comprehensive code quality initiative

**Your answer:** E
**Rationale:** This helps scope whether we're building tooling, refactoring code, or establishing processes.

---

## 3. Current code quality assessment needed?
**Question:** Should I analyze the current codebase first to identify specific issues?
- A) Yes - analyze the code now and base the PRD on actual findings (recommended)
- B) No - create a generic best practices PRD without analyzing current code
- C) Just do the code review and skip the PRD entirely

**Your answer:** A
**Rationale:** If we're creating a PRD for improvements, it should be based on actual issues found in the codebase.

---

## 4. Priority areas (if applicable)
**Question:** Which areas are most important to address?
- A) Type safety and TypeScript usage
- B) Testing coverage and test quality
- C) Error handling and edge cases
- D) Code organization and architecture
- E) Documentation and comments
- F) Performance and efficiency
- G) All of the above

**Your answer:** G
**Rationale:** Helps focus the review/PRD on what matters most to you.

---

## RECOMMENDATION

Based on your original request "I would like a code review to make sure we fulfill best practices", I recommend:

**Option A from Question 1** - Let me do an immediate code review of your html2godot project and provide:
1. Analysis of current code quality
2. Best practice violations found
3. Specific recommendations for improvement
4. Priority ranking of issues

Then, if you want to systematically address the findings, we can create a PRD for a "Code Quality Improvement Initiative" based on the actual issues discovered.

**Would you prefer this approach?** If so, just say "yes" and I'll start the code review now instead of continuing with the PRD workflow.
