# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is **AI Dev Tasks**, a collection of structured markdown workflows for AI-powered IDEs and CLIs. The repository contains three core workflow files that guide AI assistants through feature development: from PRD creation, to task breakdown, to iterative implementation.

## Core Workflow Files

The repository contains three primary workflow files in the root directory:

1. **`create-prd.md`**: Guides AI in generating Product Requirement Documents with:
   - Clarifying questions in `/tasks/[feature-name]-questions.md`
   - 3 barebones UI mockup options (using project's CSS framework) - **only if feature has UI** (omit for headless features)
   - Core type definitions in `/tasks/[feature-name]-types.ts` (with strong references, not IDs) - **only if feature requires data persistence** (omit for stateless features)
   - Final PRD saved as `/tasks/[n]-prd-[feature-name].md` (zero-padded 4-digit sequence)

2. **`generate-tasks.md`**: Converts PRDs into detailed task lists:
   - Two-phase process: parent tasks first, then sub-tasks after user confirmation ("Go")
   - Starts with Task 0.0 for reviewing core type definitions **only if PRD includes types** (omit for features without storage)
   - Analyzes codebase to identify relevant files and patterns
   - Saves as `/tasks/tasks-[prd-file-name].md`

3. **`process-task-list.md`**: Manages task execution:
   - One sub-task at a time, waiting for user approval between tasks
   - Marks sub-tasks complete (`[x]`) immediately after finishing
   - When all sub-tasks complete: runs full test suite, stages changes, cleans up temp files/code, commits with conventional commit format, then marks parent task complete
   - Uses `-m` flags for multi-line commit messages
   - Maintains "Relevant Files" section throughout

## Workflow Sequence

1. User describes feature → create PRD using `create-prd.md` → clarifying questions → UI mockups → type definitions → save PRD
2. Reference PRD → generate tasks using `generate-tasks.md` → parent tasks → wait for "Go" → sub-tasks → save task list
3. Process tasks using `process-task-list.md` → implement sub-task → update task list → wait for approval → repeat

## Directory Structure

- `/tasks/`: Contains all PRDs, task lists, clarifying questions, and type definitions
- Root: Contains the three workflow markdown files and documentation

## Important Conventions

- PRD filenames: `[n]-prd-[feature-name].md` (e.g., `0001-prd-user-authentication.md`)
- Task list filenames: `tasks-[prd-file-name].md` (matches the PRD filename)
- Types files: `[feature-name]-types.ts` with header comment: "// Do not reference by ID. Create DTOs for serialization in serializations.ts" - **only created if feature requires storage**
- Questions files: `[feature-name]-questions.md`
- All task-related files go in `/tasks/` directory

## Conditional Workflow Steps

- **UI Mockups**: Only generate for features with user interfaces. Omit for headless features (CLIs, APIs, background services, code review tasks). Note in PRD: "UI mockup omitted - headless feature"
- **Type Definitions**: Only generate for features requiring data persistence or complex data structures. Omit for stateless features (pure code transformations, simple utilities). Note in PRD: "Types omitted - no storage requirements"
- **Task 0.0**: Only include if PRD contains type definitions. If omitted, note in task list: "Task 0.0 omitted - no storage requirements for this feature"

## Target Audience

All workflows are designed for junior developers - be explicit, unambiguous, and avoid jargon.

## Key Principles

- **Structured development**: Clear process from idea to implementation
- **Step-by-step verification**: Review and approve at each checkpoint
- **Iterative approach**: One task at a time, with user control
- **Progress tracking**: Visual representation of completed work
- **Strong typing**: Use object references in core types, not IDs; DTOs are separate
