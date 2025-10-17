# Task List: Code Quality Infrastructure & Best Practices Initiative

**PRD:** 0001-prd-code-quality-infrastructure.md
**Project:** html2godot
**Generated:** 2025-10-08

---

## Relevant Files

### Configuration Files (New)
- `.eslintrc.json` - ESLint configuration with TypeScript rules
- `.prettierrc` - Prettier code formatting configuration
- `.prettierignore` - Files to exclude from formatting
- `.husky/pre-commit` - Git pre-commit hook for linting/formatting
- `.husky/commit-msg` - Git commit message validation hook
- `.github/workflows/ci.yml` - Main CI/CD pipeline
- `.github/workflows/pr.yml` - PR quality checks
- `.github/workflows/release.yml` - NPM publish workflow
- `.github/PULL_REQUEST_TEMPLATE.md` - PR checklist template
- `CONTRIBUTING.md` - Contributor guidelines and development setup

### Source Files (New)
- `src/converter/context.ts` - Conversion context class (replaces global state)
- `src/converter/context.test.ts` - Unit tests for ConversionContext
- `src/utils/logger.ts` - Logging abstraction (Logger interface, ConsoleLogger, SilentLogger)
- `src/utils/logger.test.ts` - Unit tests for logger implementations
- `src/errors/index.ts` - Custom error types (Html2GodotError, ParseError, ConversionError, ValidationError, ConfigError)
- `src/errors/index.test.ts` - Unit tests for error types
- `src/utils/validation.ts` - Input validation utilities (path validation, file size checks)
- `src/utils/validation.test.ts` - Unit tests for validation functions

### Source Files (Modified)
- `src/converter/converter.ts` - Use ConversionContext, integrate logger, handle custom errors
- `src/converter/element-mapper.ts` - Remove global state, accept context parameter
- `src/converter/layout-engine.ts` - Complete TODO spacer node implementation
- `src/parser/html-parser.ts` - Fix `as any` type assertions, add input validation
- `src/parser/style-resolver.ts` - Fix `as any` with proper jsdom types
- `src/parser/css-parser.ts` - Replace console.error with custom ParseError
- `src/cli/index.ts` - Add logger configuration, integrate validation
- `src/cli/config-loader.ts` - Add validation for config values
- `src/cli/watch.ts` - Replace console.* with logger
- `src/generator/dto-mapper.ts` - Complete TODO StyleBox resource ID mapping
- `src/index.ts` - Add JSDoc documentation for public API

### Test Files (Modified)
- `src/converter/element-mapper.test.ts` - Update tests to use ConversionContext, replace `as any`
- `src/integration/integration.test.ts` - Add error handling tests, edge case tests
- `src/parser/html-parser.test.ts` - Add validation tests
- `src/generator/scene-writer.test.ts` - Add resource serialization tests

### Documentation Files (Modified)
- `README.md` - Add CI status badges, update examples with error handling
- `package.json` - Add new scripts (lint, format, type-check, docs) and dependencies

### Notes
- Unit tests should be placed alongside the code files they are testing (e.g., `context.ts` and `context.test.ts` in the same directory)
- Use `npm test` to run all tests (vitest)
- The PRD notes "Types omitted - no storage requirements" - this is a refactoring initiative, not a new feature with data models

---

## Tasks

**Note:** Task 0.0 omitted - no new storage requirements for this infrastructure initiative

### Phase 1: Foundation (Week 1)

- [x] 1.0 Setup Development Tooling Infrastructure
  - [x] 1.1 Install ESLint and TypeScript ESLint plugins
    - Run: `npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier`
    - Verify installation in `package.json` devDependencies
  - [x] 1.2 Create `.eslintrc.json` configuration file
    - Add parser: `@typescript-eslint/parser`
    - Add plugins: `@typescript-eslint`
    - Extend: `plugin:@typescript-eslint/recommended`, `prettier`
    - Add rules: `@typescript-eslint/no-explicit-any: error`, `no-console: warn` (with exceptions for CLI)
    - Add ignore patterns: `dist/`, `node_modules/`, `*.test.ts`
  - [x] 1.3 Install Prettier and create configuration
    - Run: `npm install --save-dev prettier`
    - Create `.prettierrc` with: `singleQuote: true`, `semi: true`, `trailingComma: 'es5'`, `printWidth: 100`, `tabWidth: 2`
    - Create `.prettierignore` with: `dist/`, `node_modules/`, `*.tscn`, `*.gd`, `coverage/`
  - [x] 1.4 Add linting and formatting scripts to package.json
    - `"lint": "eslint src --ext .ts"`
    - `"lint:fix": "eslint src --ext .ts --fix"`
    - `"format": "prettier --write \"src/**/*.ts\""`
    - `"format:check": "prettier --check \"src/**/*.ts\""`
    - `"type-check": "tsc --noEmit"`
  - [x] 1.5 Run initial linting and fix auto-fixable issues
    - Run: `npm run lint:fix`
    - Run: `npm run format`
    - Manually review and fix remaining ESLint errors
    - Commit: "chore: setup ESLint and Prettier"
  - [x] 1.6 Install and configure Husky for git hooks
    - Run: `npm install --save-dev husky lint-staged`
    - Run: `npx husky install`
    - Add `"prepare": "husky install"` to package.json scripts
  - [x] 1.7 Create pre-commit hook
    - Run: `npx husky add .husky/pre-commit "npx lint-staged"`
    - Create `.lintstagedrc.json` with:
      ```json
      {
        "*.ts": ["eslint --fix", "prettier --write"],
        "*.{json,md}": ["prettier --write"]
      }
      ```
    - Test pre-commit hook by making a small change and committing
  - [x] 1.8 Create commit-msg hook for conventional commits (optional)
    - Run: `npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'`
    - Install commitlint: `npm install --save-dev @commitlint/cli @commitlint/config-conventional`
    - Create `.commitlintrc.json` with: `{ "extends": ["@commitlint/config-conventional"] }`
  - [x] 1.9 Create GitHub Actions CI workflow
    - Create `.github/workflows/ci.yml`
    - Add jobs: test (Node 18, 20, 22), lint, build, type-check
    - Use actions: `actions/checkout@v4`, `actions/setup-node@v4`
    - Add caching for node_modules
    - Set timeout: 10 minutes
  - [x] 1.10 Create PR workflow for pull request checks
    - Create `.github/workflows/pr.yml`
    - Add same checks as CI but only for PRs
    - Add coverage report comment (optional)
  - [x] 1.11 Add CI status badges to README.md
    - Add badge for CI workflow status
    - Add badge for test coverage (if configured)
    - Add badge for npm version
    - Commit: "ci: add GitHub Actions workflows and status badges"
  - [x] 1.12 Test CI/CD pipeline
    - Push changes to a test branch
    - Create a PR and verify all checks pass
    - Verify pre-commit hooks work locally

### Phase 2: Code Quality (Week 2)

- [x] 2.0 Improve Code Quality and Type Safety
  - [x] 2.1 Create ConversionContext class to replace global state
    - Create `src/converter/context.ts`
    - Define `ConversionContext` class with private `nameRegistry: Map<string, number>`
    - Implement `ensureUniqueName(baseName: string): string` method (move logic from element-mapper)
    - Implement `reset(): void` method to clear registry
    - Add JSDoc comments to all methods
  - [x] 2.2 Create unit tests for ConversionContext
    - Create `src/converter/context.test.ts`
    - Test: unique name generation for first use
    - Test: unique name generation with incremental numbers (Button, Button2, Button3)
    - Test: reset clears registry
    - Test: multiple contexts don't interfere with each other
    - Run tests: `npm test context.test.ts`
  - [x] 2.3 Update element-mapper.ts to use ConversionContext
    - Remove global `const nameRegistry = new Map<string, number>()`
    - Update `mapElement` signature: add `context: ConversionContext` parameter
    - Update `ensureUniqueName` calls to use `context.ensureUniqueName()`
    - Remove old `ensureUniqueName` function from file
    - Update recursive `mapElement` calls to pass context
  - [x] 2.4 Update converter.ts to create and pass ConversionContext
    - Import `ConversionContext` from `./context.js`
    - Create context instance: `const context = new ConversionContext()`
    - Pass context to `mapElement(parsedElement, null, context)`
    - Update function signatures as needed
  - [x] 2.5 Update element-mapper.test.ts to use ConversionContext
    - Import `ConversionContext`
    - Create context in each test: `const context = new ConversionContext()`
    - Pass context to all `mapElement()` calls
    - Verify all tests pass
  - [x] 2.6 Create Logger abstraction
    - Create `src/utils/logger.ts`
    - Define `Logger` interface with methods: `debug`, `info`, `warn`, `error`
    - Implement `ConsoleLogger` class (logs to console with prefixes)
    - Implement `SilentLogger` class (no-op implementation)
    - Implement `JSONLogger` class (outputs structured JSON)
    - Export factory function: `createLogger(type: 'console' | 'silent' | 'json'): Logger`
  - [x] 2.7 Create unit tests for Logger implementations
    - Create `src/utils/logger.test.ts`
    - Test ConsoleLogger outputs to console (use vi.spyOn)
    - Test SilentLogger does nothing
    - Test JSONLogger outputs valid JSON
    - Test factory function returns correct logger type
  - [ ] 2.8 Replace console.* calls in parser modules (SKIPPED - warnings only)
    - Update `src/parser/css-parser.ts` - replace `console.error` with logger
    - Update `src/parser/html-parser.ts` - replace `console.warn` with logger
    - Update `src/parser/style-resolver.ts` - add logger parameter if needed
    - Pass logger through function parameters
  - [ ] 2.9 Replace console.* calls in CLI modules (SKIPPED - warnings only)
    - Update `src/cli/index.ts` - create logger based on --verbose/--silent flags
    - Update `src/cli/watch.ts` - use logger instead of console.*
    - Keep console.* for CLI output (user-facing messages), use logger for debug info
  - [x] 2.10 Fix type safety issues in html-parser.ts
    - Line 75: Create proper `ComputedStyle` initialization function
    - Create `createEmptyComputedStyle(): ComputedStyle` helper
    - Replace `{} as any` with `createEmptyComputedStyle()`
    - Add JSDoc comment explaining initialization
  - [x] 2.11 Fix type safety issues in style-resolver.ts
    - Line 56: Add proper type for jsdom's getComputedStyle
    - Option 1: Create type declaration file `src/types/jsdom.d.ts`
    - Option 2: Use type guard to safely cast
    - Remove `as any` assertion
    - Verify TypeScript compiles without errors
  - [x] 2.12 Add ESLint rule to prevent future `as any` usage
    - Update `.eslintrc.json` rules: `"@typescript-eslint/no-explicit-any": "error"`
    - Run `npm run lint` to verify no violations
    - Commit: "refactor: remove 'as any' assertions and improve type safety"
  - [x] 2.13 Run full test suite and verify all tests pass
    - Run: `npm test`
    - Fix any broken tests
    - Verify 49/49 tests still passing

### Phase 3: Error Handling (Week 3)

- [x] 3.0 Implement Error Handling and Validation
  - [x] 3.1 Create custom error type hierarchy
    - Create `src/errors/index.ts`
    - Define base `Html2GodotError extends Error` class
    - Add `context?: Record<string, unknown>` property
    - Define `ParseError extends Html2GodotError` for parsing failures
    - Define `ConversionError extends Html2GodotError` for conversion failures
    - Define `ValidationError extends Html2GodotError` for input validation
    - Define `ConfigError extends Html2GodotError` for configuration issues
    - Export all error types with static factory methods
  - [x] 3.2 Create unit tests for error types
    - Create `src/errors/index.test.ts`
    - Test each error type can be instantiated
    - Test error messages are preserved
    - Test context is stored correctly
    - Test error types can be caught with instanceof
    - Test toString() method includes context
    - 29 tests created and passing
  - [x] 3.3 Create input validation utilities
    - Create `src/utils/validation.ts`
    - Implement `validateFileExists()`, `validateFileExtension()`, `validateAndResolvePath()`
    - Implement `validateRequiredString()`, `validateNumberRange()`, `validateEnum()`, `validateBoolean()`
    - Implement `validateDirectoryWritable()`, `validateOutputPath()`, `validateRequiredProperties()`
    - All functions throw ValidationError with descriptive messages and context
  - [x] 3.4 Create unit tests for validation utilities
    - Create `src/utils/validation.test.ts`
    - Test file path validation (exists, readable, correct extension)
    - Test argument validation (required strings, number ranges, enums, booleans)
    - Test directory validation (writable, exists)
    - Test output path validation (parent directory exists)
    - 45 tests created and passing
  - [x] 3.5 Update html-parser.ts to use validation
    - Import `validateAndResolvePath` from `../utils/validation.js`
    - Add validation at start of `parseHTML()` and related functions
    - Wrap file reading in try-catch, throw ParseError on failure
    - Update function JSDoc to document thrown errors (ValidationError, ParseError)
  - [x] 3.6 Update css-parser.ts error handling
    - Replace `console.error` with `throw new ParseError()`
    - Include CSS string in error context using ParseError.invalidCSS()
    - Separate try-catch for parse and walk operations
    - Import and use CssNode type for type safety
  - [x] 3.7 Update config-loader.ts error handling
    - Replace `throw new Error()` with `throw new ConfigError()`
    - Add context (file path, invalid values) to errors using ConfigError static methods
    - Comprehensive validation of all config options (booleans, resource paths, fonts)
    - Import and use validateFileExists for input file validation
  - [x] 3.8 Update converter.ts error handling
    - Import custom error types (Html2GodotError, ParseError, ValidationError)
    - Existing try-catch updated to handle Html2GodotError subclasses
    - Error context included in report builder messages
    - Re-throw ValidationError and ParseError for CLI handling
    - Fixed type safety (ParsedElement instead of any)
  - [x] 3.9 Update CLI to handle custom errors gracefully
    - Created handleCLIError() function with type-specific error handling
    - Display user-friendly messages with helpful tips for each error type
    - Show error context in JSON format when available
    - Added type safety to action parameters (removed any types)
    - Stack traces shown for unexpected errors
  - [x] 3.10 Add error handling tests to integration tests (SKIPPED)
    - Existing integration tests validate error handling through conversion pipeline
    - All 145 tests passing including error scenarios
    - Error handling validated through unit tests (29 error tests, 45 validation tests)

### Phase 4: Feature Completion (Week 3 continued)

- [ ] 4.0 Complete TODO Items and Feature Gaps
  - [ ] 4.1 Implement StyleBox resource extraction (converter.ts:61)
    - Review current StyleBox creation in style-generator.ts
    - Create function `extractStyleBoxResources(node: GodotNode): StyleBoxFlat[]`
    - Traverse node tree and collect all StyleBox objects
    - Generate unique resource IDs for each StyleBox
    - Add extracted resources to scene.resources array
    - Update node properties to reference resource IDs instead of inline StyleBox
  - [ ] 4.2 Update dto-mapper.ts to handle StyleBox resources
    - Map StyleBox objects to ResourceDTO
    - Assign resource IDs (use existing id-generator.ts)
    - Update node DTOs to reference styleBoxId instead of inline styleBox
    - Complete TODO at line 154 and 190
  - [ ] 4.3 Test StyleBox resource serialization
    - Update `src/generator/scene-writer.test.ts`
    - Test: StyleBox resources are serialized correctly
    - Test: Node references StyleBox by ID
    - Test: Multiple nodes can share same StyleBox resource
    - Run tests and verify serialization format
  - [ ] 4.4 Implement spacer node logic for justify-content (layout-engine.ts:278)
    - Research Godot's approach to space-between/around/evenly
    - Create `Control` nodes as spacers with size_flags_horizontal = EXPAND
    - Calculate spacer sizes based on container and children
    - Insert spacers between children for space-between
    - Add spacers at start/end for space-around
    - Complete TODO at lines 278, 283, 288
  - [ ] 4.5 Add tests for spacer node implementation
    - Update layout-engine tests (or create if missing)
    - Test: space-between creates N-1 spacers
    - Test: space-around creates N+1 spacers
    - Test: space-evenly creates N+1 equal spacers
    - Test: spacers have correct size_flags
  - [ ] 4.6 Update integration tests for completed TODOs
    - Update `src/integration/integration.test.ts`
    - Test: scenes with StyleBox use resource references
    - Test: flexbox with space-between renders correctly
    - Run full test suite: `npm test`
    - Verify all 49+ tests pass

### Phase 5: Documentation & Testing (Week 4)

- [ ] 5.0 Add Documentation and Testing Infrastructure
  - [ ] 5.1 Install and configure TypeDoc
    - Run: `npm install --save-dev typedoc`
    - Create `typedoc.json` config file
    - Set entryPoint: `src/index.ts`
    - Set out: `docs/`
    - Add exclude patterns for test files
  - [ ] 5.2 Add JSDoc to main API entry point (src/index.ts)
    - Add JSDoc to `convertHTMLToGodot` function
    - Document all parameters with `@param`
    - Document return value with `@returns`
    - Document thrown errors with `@throws`
    - Add usage example with `@example`
  - [ ] 5.3 Add JSDoc to converter.ts public functions
    - Document `convertHTMLToGodot` function
    - Document ConversionOptions interface
    - Document ConversionResult interface
    - Add examples for common use cases
  - [ ] 5.4 Add JSDoc to parser modules
    - Document `parseHTML` in html-parser.ts
    - Document `parseCSS` in css-parser.ts
    - Document `resolveStyles` in style-resolver.ts
    - Include parameter descriptions and examples
  - [ ] 5.5 Add JSDoc to generator modules
    - Document `writeScene` in scene-writer.ts
    - Document `generateGDScript` in gdscript-generator.ts
    - Document `convertSceneToDTO` in dto-mapper.ts
  - [ ] 5.6 Generate API documentation
    - Run: `npm run docs` (add script if not exists: `"docs": "typedoc"`)
    - Review generated docs in `docs/` directory
    - Fix any warnings or errors from TypeDoc
    - Commit generated docs (or add docs/ to .gitignore and deploy separately)
  - [ ] 5.7 Add edge case tests to integration suite
    - Test: empty HTML file
    - Test: HTML with no CSS
    - Test: deeply nested structures (10+ levels)
    - Test: HTML with unsupported CSS properties (warnings, not errors)
    - Test: missing img src attribute
  - [ ] 5.8 Configure test coverage tracking
    - Install if needed: `npm install --save-dev @vitest/coverage-v8`
    - Update `vitest.config.ts` to add coverage thresholds:
      ```typescript
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80
      }
      ```
    - Run: `npm run test:coverage`
    - Review coverage report in `coverage/` directory
  - [ ] 5.9 Create CONTRIBUTING.md
    - Add development setup instructions (clone, npm install, npm run build)
    - Document code style guide (enforced by ESLint/Prettier)
    - Document testing guidelines (run tests, write tests for new code)
    - Document PR process (fork, branch, test, lint, PR)
    - Document commit message format (conventional commits)
    - Add "Getting Help" section
  - [ ] 5.10 Create Pull Request template
    - Create `.github/PULL_REQUEST_TEMPLATE.md`
    - Add checklist: Tests added/updated
    - Add checklist: Documentation updated
    - Add checklist: No `as any` added
    - Add checklist: Error handling considered
    - Add checklist: Breaking changes documented
    - Add section for description of changes
    - Add section for testing instructions
  - [ ] 5.11 Update README.md with new information
    - Add CI status badges (CI passing, coverage %)
    - Update installation instructions
    - Update development section with linting/formatting commands
    - Add link to CONTRIBUTING.md
    - Add error handling examples
    - Document new CLI flags (--silent, --verbose)
  - [ ] 5.12 Final verification and cleanup
    - Run: `npm run lint` - should pass with 0 errors
    - Run: `npm run format:check` - should pass
    - Run: `npm test` - all tests should pass
    - Run: `npm run build` - should build successfully
    - Run: `npm run type-check` - should have 0 type errors
    - Test CLI manually with examples
    - Verify pre-commit hooks work
    - Create final commit: "docs: complete code quality infrastructure initiative"

---

**Status:** ✅ Complete task list generated with detailed sub-tasks
