# PRD: Code Quality Infrastructure & Best Practices Initiative

**Project:** html2godot
**Version:** 0.1.0 → 0.2.0
**Date:** 2025-10-08
**Status:** Draft
**PRD Number:** 0001

---

## 1. Introduction/Overview

The html2godot project has strong architectural foundations and comprehensive test coverage (49/49 tests passing), but lacks critical development tooling and quality infrastructure necessary for production-ready open-source software. This initiative aims to establish a comprehensive code quality framework including linting, formatting, CI/CD, improved error handling, proper logging, and quality gates.

**Problem Statement:** While the codebase is well-architected, the absence of automated quality checks, inconsistent error handling, and missing development infrastructure creates technical debt and increases the risk of quality issues as the project scales.

**Goal:** Transform html2godot into a production-grade open-source project with industry-standard development tooling, automated quality gates, and maintainable code patterns.

---

## 2. Goals

1. **Establish Development Tooling Infrastructure**
   - Implement ESLint for code linting
   - Configure Prettier for code formatting
   - Setup git hooks with Husky
   - Create CI/CD pipeline with GitHub Actions

2. **Improve Code Quality & Maintainability**
   - Replace `as any` type assertions with proper types
   - Refactor global mutable state to context-based approach
   - Implement proper logging abstraction
   - Complete incomplete features (TODOs)

3. **Enhance Error Handling & Validation**
   - Create custom error types
   - Implement consistent error handling patterns
   - Add input validation and sanitization
   - Improve error reporting in ConversionReport

4. **Implement Quality Gates**
   - Enforce code quality checks on commits
   - Require passing tests before merge
   - Add test coverage tracking
   - Create code review checklist

5. **Improve Documentation**
   - Add JSDoc to all public APIs
   - Generate API documentation with TypeDoc
   - Document development workflows
   - Create contributor guidelines

---

## 3. User Stories

### US-1: Developer Onboarding
**As a** new contributor
**I want** clear code quality standards and automated checks
**So that** I can quickly start contributing without worrying about style inconsistencies

**Acceptance Criteria:**
- ESLint catches common mistakes in my editor
- Prettier auto-formats my code on save
- Pre-commit hooks prevent bad commits
- Clear error messages guide me to fix issues

---

### US-2: Pull Request Review
**As a** project maintainer
**I want** automated quality checks on all PRs
**So that** I can focus on logic review instead of style/formatting

**Acceptance Criteria:**
- CI/CD runs tests automatically on PR creation
- Linting failures block PR merge
- Build verification ensures no breaking changes
- Code coverage reports show test gaps

---

### US-3: Error Debugging
**As a** user of the CLI tool
**I want** clear, actionable error messages
**So that** I can quickly understand and fix conversion issues

**Acceptance Criteria:**
- Custom error types provide context
- Error messages include file/line information
- Suggestions provided for common errors
- Errors logged to ConversionReport

---

### US-4: Library Integration
**As a** library consumer
**I want** well-documented public APIs with TypeScript support
**So that** I can integrate html2godot into my projects confidently

**Acceptance Criteria:**
- JSDoc comments on all exported functions
- Generated API documentation available
- TypeScript types fully documented
- Usage examples included

---

### US-5: Production Deployment
**As a** DevOps engineer
**I want** structured logging with configurable verbosity
**So that** I can monitor and debug production issues effectively

**Acceptance Criteria:**
- Log levels (debug, info, warn, error) supported
- JSON output available for log aggregation
- --silent and --verbose flags work correctly
- Sensitive information not logged

---

## 4. Functional Requirements

### FR-1: ESLint Configuration
1. Install `eslint` and `@typescript-eslint/eslint-plugin`
2. Create `.eslintrc.json` with recommended TypeScript rules
3. Configure rules to prevent:
   - `as any` type assertions
   - `console.log` statements (except in CLI)
   - Unused variables and imports
   - Missing return types on functions
4. Add ESLint ignore patterns for build output and node_modules
5. Add `npm run lint` and `npm run lint:fix` scripts

### FR-2: Prettier Configuration
1. Install `prettier`
2. Create `.prettierrc` with project style guide:
   - Single quotes
   - 2-space indentation
   - Semicolons required
   - Trailing commas in multiline
   - Line length: 100 characters
3. Create `.prettierignore` for generated files
4. Add `npm run format` and `npm run format:check` scripts
5. Integrate with ESLint (use `eslint-config-prettier`)

### FR-3: Git Hooks with Husky
1. Install `husky` and `lint-staged`
2. Configure pre-commit hook to run:
   - ESLint on staged .ts files
   - Prettier check on staged files
   - TypeScript type checking
3. Configure commit-msg hook for conventional commits
4. Add `.husky/` directory with hook scripts
5. Document hook behavior in CONTRIBUTING.md

### FR-4: GitHub Actions CI/CD
1. Create `.github/workflows/ci.yml` with jobs:
   - **Test:** Run `npm test` on Node.js 18, 20, 22
   - **Lint:** Run `npm run lint`
   - **Build:** Run `npm run build` and verify output
   - **Type Check:** Run `tsc --noEmit`
2. Create `.github/workflows/pr.yml` for PR checks
3. Create `.github/workflows/release.yml` for npm publishing
4. Add status badges to README.md
5. Configure branch protection rules (require CI to pass)

### FR-5: Type Safety Improvements
1. Remove all `as any` assertions in production code (2 instances):
   - `src/parser/html-parser.ts:75` - Create proper ComputedStyle initialization
   - `src/parser/style-resolver.ts:56` - Add jsdom type definitions
2. Replace `as any` in tests with proper type factories
3. Add ESLint rule: `@typescript-eslint/no-explicit-any: error`
4. Create type guards for runtime validation where needed

### FR-6: Refactor Global State
1. Create `ConversionContext` class in `src/converter/context.ts`:
   ```typescript
   export class ConversionContext {
     private nameRegistry = new Map<string, number>();

     ensureUniqueName(baseName: string): string { /* ... */ }
     reset(): void { /* ... */ }
   }
   ```
2. Update `converter.ts` to create and pass context
3. Update `element-mapper.ts` to accept context parameter
4. Update all tests to use context
5. Remove global `nameRegistry` variable

### FR-7: Logging Abstraction
1. Create `src/utils/logger.ts` with interface:
   ```typescript
   export interface Logger {
     debug(message: string, ...args: any[]): void;
     info(message: string, ...args: any[]): void;
     warn(message: string, ...args: any[]): void;
     error(message: string, ...args: any[]): void;
   }
   ```
2. Implement `ConsoleLogger` and `SilentLogger`
3. Replace all 27 `console.*` calls with logger
4. Add logger configuration to CLI options
5. Support JSON output format for CI/CD

### FR-8: Custom Error Types
1. Create `src/errors/index.ts` with error classes:
   - `Html2GodotError` (base class)
   - `ParseError` (HTML/CSS parsing failures)
   - `ConversionError` (element conversion failures)
   - `ValidationError` (input validation failures)
   - `ConfigError` (configuration issues)
2. Include context in errors (file, line, element)
3. Add error recovery strategies where appropriate
4. Update all error handling to use custom errors

### FR-9: Complete TODO Items
1. **StyleBox Resource Extraction** (`converter.ts:61`):
   - Extract StyleBox from nodes to resources array
   - Generate unique resource IDs
   - Reference resources in node properties
2. **Spacer Node Implementation** (`layout-engine.ts:278,283,288`):
   - Implement spacer nodes for space-between/around/evenly
   - Calculate spacer sizes based on container size
   - Update tests
3. **StyleBox DTO Mapping** (`dto-mapper.ts:154,190`):
   - Map StyleBox objects to resource IDs
   - Update DTO types
   - Test resource serialization

### FR-10: Input Validation
1. Create `src/utils/validation.ts` with validators:
   - `validateFilePath(path: string): void` - Check for path traversal, extensions
   - `validateFileSize(size: number, maxSize: number): void` - Prevent huge files
   - `sanitizeNodeName(name: string): string` - Already exists, document it
2. Add validation in:
   - `html-parser.ts` - Validate file path before reading
   - `cli/index.ts` - Validate CLI arguments
   - `config-loader.ts` - Validate config values
3. Add max file size limit (default: 5MB, configurable)
4. Document security considerations in README

### FR-11: JSDoc Documentation
1. Add JSDoc to all exported functions with:
   - Function description
   - `@param` for all parameters
   - `@returns` for return values
   - `@throws` for possible errors
   - `@example` for complex functions
2. Priority files:
   - `src/index.ts` (main API)
   - `src/converter/converter.ts`
   - `src/parser/html-parser.ts`
   - `src/generator/*.ts`
3. Install and configure TypeDoc
4. Add `npm run docs` script to generate docs
5. Deploy docs to GitHub Pages (optional)

### FR-12: Testing Improvements
1. Add error handling tests:
   - Test invalid file paths
   - Test malformed HTML
   - Test CSS parse errors
   - Test configuration errors
2. Add edge case tests:
   - Empty HTML file
   - Missing CSS properties
   - Deeply nested structures
   - Large file handling
3. Track and display test coverage
4. Add coverage requirement (80% minimum)

### FR-13: Code Review Checklist
1. Create `.github/PULL_REQUEST_TEMPLATE.md` with checklist:
   - [ ] Tests added/updated
   - [ ] Documentation updated
   - [ ] No `as any` added
   - [ ] Error handling considered
   - [ ] Breaking changes documented
2. Create `CONTRIBUTING.md` with:
   - Development setup instructions
   - Code style guide
   - Testing guidelines
   - PR process
   - Commit message format

---

## 5. Non-Goals (Out of Scope)

1. **Performance Optimization** - Not addressing performance in this initiative
2. **New Features** - Focus is on quality, not new functionality
3. **UI/Web Interface** - Remains a CLI tool
4. **Breaking API Changes** - Maintain backward compatibility
5. **Rewriting Core Logic** - Refactor patterns only, not algorithms
6. **Migration to Different Testing Framework** - Keep vitest
7. **Monorepo Setup** - Remain single package
8. **Docker/Kubernetes** - No containerization in this phase

---

## 6. Design Considerations

### UI Mockup
**Note:** UI mockup omitted - headless feature (CLI tool improvements)

### Architecture Changes

#### Before: Global Mutable State
```typescript
// element-mapper.ts
const nameRegistry = new Map<string, number>(); // Global

export function mapElement(element: ParsedElement): GodotNode {
  const name = ensureUniqueName(generateNodeName(element));
  // ...
}
```

#### After: Context-Based Approach
```typescript
// context.ts
export class ConversionContext {
  private nameRegistry = new Map<string, number>();

  ensureUniqueName(baseName: string): string { /* ... */ }
}

// element-mapper.ts
export function mapElement(
  element: ParsedElement,
  context: ConversionContext
): GodotNode {
  const name = context.ensureUniqueName(generateNodeName(element));
  // ...
}
```

#### Error Handling Pattern
```typescript
// Before: Silent failure
try {
  const ast = csstree.parse(cssString);
} catch (error) {
  console.error('CSS Parse Error:', error);
  return []; // Silent failure
}

// After: Proper error propagation
try {
  const ast = csstree.parse(cssString);
} catch (error) {
  throw new ParseError(
    `Failed to parse CSS: ${error.message}`,
    { cssString, originalError: error }
  );
}
```

#### Logging Pattern
```typescript
// Before: Direct console usage
console.log(`Converting: ${inputPath}`);

// After: Logger abstraction
logger.info(`Converting: ${inputPath}`);

// With structured logging
logger.info('Starting conversion', {
  inputPath,
  options: conversionOptions,
  timestamp: Date.now()
});
```

### Configuration Files Structure

```
html2godot/
├── .eslintrc.json           # ESLint configuration
├── .prettierrc              # Prettier configuration
├── .prettierignore          # Prettier ignore patterns
├── .husky/                  # Git hooks
│   ├── pre-commit          # Lint & format check
│   └── commit-msg          # Commit message validation
├── .github/
│   ├── workflows/
│   │   ├── ci.yml          # Main CI pipeline
│   │   ├── pr.yml          # PR checks
│   │   └── release.yml     # NPM publish
│   └── PULL_REQUEST_TEMPLATE.md
├── CONTRIBUTING.md          # Contributor guidelines
└── src/
    ├── errors/
    │   └── index.ts        # Custom error types
    ├── utils/
    │   ├── logger.ts       # Logging abstraction
    │   └── validation.ts   # Input validation
    └── converter/
        └── context.ts      # Conversion context
```

---

## 7. Technical Considerations

### Dependencies to Add
```json
{
  "devDependencies": {
    "eslint": "^8.57.0",
    "@typescript-eslint/eslint-plugin": "^6.21.0",
    "@typescript-eslint/parser": "^6.21.0",
    "eslint-config-prettier": "^9.1.0",
    "prettier": "^3.2.5",
    "husky": "^9.0.11",
    "lint-staged": "^15.2.2",
    "@vitest/coverage-v8": "^3.2.4",
    "typedoc": "^0.25.13"
  }
}
```

### Package.json Scripts to Add
```json
{
  "scripts": {
    "lint": "eslint src --ext .ts",
    "lint:fix": "eslint src --ext .ts --fix",
    "format": "prettier --write \"src/**/*.ts\"",
    "format:check": "prettier --check \"src/**/*.ts\"",
    "type-check": "tsc --noEmit",
    "docs": "typedoc --out docs src/index.ts",
    "prepare": "husky install"
  }
}
```

### Type Definitions Needed
```typescript
// Add to package.json or create types file
declare module 'jsdom' {
  export interface DOMWindow {
    getComputedStyle(element: Element): CSSStyleDeclaration;
  }
}
```

### Breaking Changes
**None expected** - All changes are additive or internal refactoring.

### Backward Compatibility
- Maintain existing CLI interface
- Keep current API signatures
- Support old config format
- No breaking type changes

### Migration Path
1. Add new tooling (ESLint, Prettier) without enforcing
2. Fix violations incrementally
3. Enable pre-commit hooks
4. Enable CI/CD checks
5. Gradually migrate patterns (logging, errors)
6. Document new patterns in CONTRIBUTING.md

---

## 8. Success Metrics

### Quantitative Metrics
1. **Code Quality Score:**
   - ESLint violations: 0 (from current unknown)
   - Prettier violations: 0
   - TypeScript strict mode: 100% (already achieved)
   - `as any` usage: 0 in production code (currently 2)

2. **Test Coverage:**
   - Line coverage: ≥ 80%
   - Branch coverage: ≥ 75%
   - Function coverage: ≥ 85%
   - All 49 tests continue to pass

3. **Development Velocity:**
   - Time to first contribution: < 15 minutes
   - Average PR review time: < 2 hours (automated checks)
   - CI/CD build time: < 5 minutes

4. **Error Reporting:**
   - 100% of errors include context
   - 100% of errors include suggestions
   - 0 silent failures

### Qualitative Metrics
1. **Developer Experience:**
   - Contributors report clear quality standards
   - PRs receive faster, focused reviews
   - Onboarding documentation rated helpful

2. **Code Maintainability:**
   - Consistent code style across codebase
   - Clear error messages in production
   - Well-documented public APIs

3. **Production Readiness:**
   - Meets open-source project standards
   - Ready for v1.0 release
   - Suitable for enterprise use

---

## 9. Open Questions

### Q1: ESLint Rule Strictness
**Question:** Should we start with recommended rules or strict rules?
**Options:**
- A) `plugin:@typescript-eslint/recommended` (less strict, fewer violations)
- B) `plugin:@typescript-eslint/recommended-requiring-type-checking` (strict)

**Recommendation:** Start with A, gradually add stricter rules

---

### Q2: Conventional Commits Enforcement
**Question:** Should we enforce conventional commit format?
**Options:**
- A) Enforce with commit-msg hook
- B) Recommend but don't enforce
- C) Don't use conventional commits

**Recommendation:** B initially, move to A once documented

---

### Q3: Test Coverage Requirements
**Question:** What minimum test coverage should we require?
**Options:**
- A) 80% (standard)
- B) 90% (strict)
- C) 70% (lenient)

**Recommendation:** A (80%) - balanced approach

---

### Q4: API Documentation Hosting
**Question:** Where should we host generated API documentation?
**Options:**
- A) GitHub Pages
- B) README.md only
- C) Separate docs site

**Recommendation:** A (GitHub Pages) - automatic deployment

---

### Q5: Logging in Library Mode
**Question:** How should logging work when used as a library?
**Options:**
- A) Default to SilentLogger, allow override
- B) Always log to console
- C) Require logger to be passed in

**Recommendation:** A - sensible default with flexibility

---

### Q6: Error Recovery Strategy
**Question:** Should we attempt to recover from errors or fail fast?
**Options:**
- A) Fail fast on any error
- B) Best-effort conversion with warnings
- C) Configurable (strict/lenient mode)

**Recommendation:** C - give users control

---

## 10. Implementation Plan

### Phase 1: Foundation (Week 1) - P0
**Goal:** Establish core development tooling

**Tasks:**
1. Setup ESLint + Prettier (4 hours)
   - Install dependencies
   - Create config files
   - Fix existing violations
   - Update package.json

2. Setup Git Hooks (2 hours)
   - Install husky + lint-staged
   - Configure pre-commit
   - Test hooks work

3. Create CI/CD Pipeline (4 hours)
   - GitHub Actions workflows
   - Test on multiple Node versions
   - Add status badges

**Deliverables:**
- `.eslintrc.json`, `.prettierrc`
- `.husky/pre-commit`, `.husky/commit-msg`
- `.github/workflows/ci.yml`
- Updated README with badges

**Success Criteria:**
- ESLint finds 0 violations
- Prettier formats code consistently
- Pre-commit hook runs successfully
- CI pipeline passes on PR

---

### Phase 2: Code Quality (Week 2) - P1
**Goal:** Improve code quality and type safety

**Tasks:**
1. Fix Type Safety Issues (6 hours)
   - Remove `as any` in production code
   - Add proper type definitions
   - Create type guards
   - Update tests

2. Refactor Global State (4 hours)
   - Create ConversionContext class
   - Update converter pipeline
   - Update element-mapper
   - Update tests

3. Add Logging Abstraction (3 hours)
   - Create Logger interface
   - Implement ConsoleLogger + SilentLogger
   - Replace console.* calls
   - Add CLI options

**Deliverables:**
- `src/converter/context.ts`
- `src/utils/logger.ts`
- Zero `as any` in production code
- Logging support in CLI

**Success Criteria:**
- TypeScript compiles with no warnings
- All tests pass
- Logging works in all modes

---

### Phase 3: Error Handling & Validation (Week 3) - P2
**Goal:** Implement robust error handling

**Tasks:**
1. Create Custom Error Types (3 hours)
   - Define error classes
   - Add error context
   - Update error handling

2. Complete TODO Items (8 hours)
   - StyleBox resource extraction
   - Spacer node implementation
   - StyleBox DTO mapping
   - Test all features

3. Add Input Validation (3 hours)
   - Path validation
   - File size limits
   - Security audit

**Deliverables:**
- `src/errors/index.ts`
- `src/utils/validation.ts`
- All TODOs resolved
- Security improvements

**Success Criteria:**
- All errors include context
- No silent failures
- Input validation works
- Security scan passes

---

### Phase 4: Documentation & Polish (Week 4) - P3
**Goal:** Complete documentation and testing

**Tasks:**
1. Add JSDoc Documentation (4 hours)
   - Document public APIs
   - Add examples
   - Configure TypeDoc

2. Improve Testing (5 hours)
   - Error handling tests
   - Edge case tests
   - Coverage tracking

3. Create Contributor Docs (3 hours)
   - CONTRIBUTING.md
   - PR template
   - Code review checklist

**Deliverables:**
- JSDoc on all exports
- Generated API docs
- CONTRIBUTING.md
- `.github/PULL_REQUEST_TEMPLATE.md`
- Test coverage ≥ 80%

**Success Criteria:**
- API docs generated successfully
- Test coverage meets target
- Contributing guide complete
- PR template in use

---

## 11. Timeline & Resources

### Timeline
| Phase | Duration | Start | End |
|-------|----------|-------|-----|
| Phase 1: Foundation | 1 week | Week 1 | Week 1 |
| Phase 2: Code Quality | 1 week | Week 2 | Week 2 |
| Phase 3: Error Handling | 1 week | Week 3 | Week 3 |
| Phase 4: Documentation | 1 week | Week 4 | Week 4 |
| **Total** | **4 weeks** | - | - |

### Resource Requirements
- **1 Senior Developer** (full-time) - 37 hours total
- **Code Reviewer** (part-time) - 4 hours total
- **Technical Writer** (optional) - 2 hours for docs review

### Total Effort
**37 hours** of focused development work over 4 weeks

---

## 12. Risks & Mitigation

### Risk 1: Existing Code Violations
**Probability:** High | **Impact:** Medium

**Risk:** Enabling ESLint may find hundreds of violations

**Mitigation:**
- Start with recommended rules, not strict
- Use `eslint --fix` to auto-fix many issues
- Create eslint-disable comments for complex cases
- Fix incrementally over multiple PRs

---

### Risk 2: Breaking Changes from Refactoring
**Probability:** Medium | **Impact:** High

**Risk:** Refactoring could introduce bugs

**Mitigation:**
- Comprehensive test coverage (already 49/49 passing)
- Run tests after every change
- Use TypeScript to catch type errors
- Get code reviews on all refactoring PRs

---

### Risk 3: CI/CD Pipeline Failures
**Probability:** Low | **Impact:** Medium

**Risk:** CI pipeline could have flaky tests or slow builds

**Mitigation:**
- Test workflows locally with `act`
- Use caching for node_modules
- Set reasonable timeouts
- Monitor CI performance

---

### Risk 4: Developer Resistance to Tools
**Probability:** Low | **Impact:** Low

**Risk:** Contributors may dislike strict linting rules

**Mitigation:**
- Document rationale in CONTRIBUTING.md
- Allow reasonable eslint-disable exceptions
- Provide clear error messages
- Auto-fix on commit with pre-commit hook

---

## 13. Appendix

### A. Related Documents
- [Code Quality Review Report](./code-quality-review.md)
- Project README.md
- CLAUDE.md (project context)

### B. Glossary
- **CI/CD:** Continuous Integration / Continuous Deployment
- **ESLint:** JavaScript/TypeScript linting tool
- **Prettier:** Code formatting tool
- **Husky:** Git hooks tool
- **JSDoc:** JavaScript documentation format
- **ConversionContext:** Context object passed through conversion pipeline

### C. Research & References
- [ESLint TypeScript Guide](https://typescript-eslint.io/)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)
- [Husky Documentation](https://typicode.github.io/husky/)
- [GitHub Actions for Node.js](https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs)
- [TypeScript Error Handling Best Practices](https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript)

---

**Document Version:** 1.0
**Last Updated:** 2025-10-08
**Next Review:** After Phase 1 completion
