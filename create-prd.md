# Rule: Generating a Product Requirements Document (PRD)

## Goal

To guide an AI assistant in creating a detailed Product Requirements Document (PRD) in Markdown format, based on an initial user prompt. The PRD should be clear, actionable, and suitable for a junior developer to understand and implement the feature.

## Process

1.  **Receive Initial Prompt:** The user provides a brief description or request for a new feature or functionality.
2.  **Ask Clarifying Questions:** Before writing the PRD, the AI *must* generate clarifying questions in a file to gather sufficient detail. Create a file named `[feature-name]-questions.md` in the `/tasks` directory with the questions. The goal is to understand the "what" and "why" of the feature, not necessarily the "how" (which the developer will figure out). Make sure to provide options in letter/number lists so the user can respond easily with their selections directly in the file.
3.  **Generate PRD:** Based on the initial prompt and the user's answers to the clarifying questions, generate a PRD using the structure outlined below.
4.  **Generate UI Mockup Options (if applicable):** If the feature includes a user interface, create 3 different barebones UI mockup options:
    - Check the project for existing CSS framework (Tailwind, Bootstrap, etc.) and use that
    - Generate simple, functional HTML with inline styling or CSS classes from the detected framework
    - Keep mockups minimal - focus on layout and key UI elements only
    - Present all 3 options clearly labeled (Option 1, Option 2, Option 3)
    - Ask user to select their preferred mockup (1, 2, or 3)
    - **Omit this step if:** The feature is headless (CLI tools, APIs, background services, code review tasks, etc.)
5.  **Add Mockup to PRD (if applicable):** Once the user selects a mockup, add it to the "Design Considerations" section of the PRD. If omitted, note in the PRD: "UI mockup omitted - headless feature"
6.  **Generate Core Types (if applicable):** If the feature requires data persistence or complex data structures, design and generate the core type definitions in a file for user review:
    - Create a file named `[feature-name]-types.ts` in the `/tasks` directory
    - Include a header comment in the types file: "// Do not reference by ID. Create DTOs for serialization in serializations.ts"
    - Define all core domain types (entities, enums, interfaces) based on the PRD requirements
    - Use strong references (object references, not IDs) for in-memory relationships
    - The user will review and provide feedback directly in the file or through follow-up conversation
    - Note: Serialization DTOs are NOT part of this initial types task
    - **Omit this step if:** The feature has no storage requirements (stateless CLIs, pure code transformations, code review tasks, simple utilities, etc.)
7.  **Save PRD:** Save the generated document as `[n]-prd-[feature-name].md` inside the `/tasks` directory. (Where `n` is a zero-padded 4-digit sequence starting from 0001, e.g., `0001-prd-user-authentication.md`, `0002-prd-dashboard.md`, etc.)

## Clarifying Questions Format

Questions should be formatted with clear options and AI recommendations, allowing users to quickly accept defaults or make changes.

### Format Template

```markdown
## [N]. [Question Title]
**Question:** [Clear question text]?
- A) [Option A description] (recommended)
- B) [Option B description]
- C) [Option C description]
- D) [Option D description]

**Your answer:** (A for MVP, consider C for v2)
**Rationale:** [Brief explanation of why this recommendation makes sense]
```

### Example

```markdown
## 1. Aggregate Card Generation Strategy
**Question:** How should we generate the content for aggregate cards?
- A) Machine aggregation only (merge metadata, concatenate stats) - fast, cheap (recommended)
- B) LLM joins textual descriptions from child cards - slower, more coherent
- C) Hybrid: machine aggregation for metadata, optional LLM summary for descriptions
- D) Configurable per-directory depth (machine for deep dirs, LLM for top-level)

**Your answer:** (A for POC, consider C later)
**Rationale:** Machine aggregation proves the concept works while keeping costs low. Can upgrade to hybrid once value is proven.
```

### Common Question Areas

The AI should adapt its questions based on the prompt, but here are common areas to explore:

*   **Problem/Goal:** What problem does this feature solve? What is the main goal?
*   **Target User:** Who is the primary user of this feature?
*   **Core Functionality:** What key actions should users be able to perform?
*   **User Stories:** What user stories drive this feature? (As a [user], I want to [action] so that [benefit])
*   **Acceptance Criteria:** How will we know when this feature is successfully implemented?
*   **Scope/Boundaries:** What should this feature *not* do (non-goals)?
*   **Data Requirements:** What data does this feature need to display or manipulate?
*   **Design/UI:** Are there existing design mockups or UI guidelines to follow?
*   **Edge Cases:** What potential edge cases or error conditions should we consider?
*   **Implementation Approach:** What are the different approaches to building this, and which is recommended?
*   **Configuration:** Should this be configurable or opinionated?

## PRD Structure

The generated PRD should include the following sections:

1.  **Introduction/Overview:** Briefly describe the feature and the problem it solves. State the goal.
2.  **Goals:** List the specific, measurable objectives for this feature.
3.  **User Stories:** Detail the user narratives describing feature usage and benefits.
4.  **Functional Requirements:** List the specific functionalities the feature must have. Use clear, concise language (e.g., "The system must allow users to upload a profile picture."). Number these requirements.
5.  **Non-Goals (Out of Scope):** Clearly state what this feature will *not* include to manage scope.
6.  **Design Considerations:** Include the selected UI mockup (barebones HTML with CSS framework classes). Also describe any UI/UX requirements or mention relevant components/styles if applicable.
7.  **Technical Considerations (Optional):** Mention any known technical constraints, dependencies, or suggestions (e.g., "Should integrate with the existing Auth module").
8.  **Success Metrics:** How will the success of this feature be measured? (e.g., "Increase user engagement by 10%", "Reduce support tickets related to X").
9.  **Open Questions:** List any remaining questions or areas needing further clarification.

## Target Audience

Assume the primary reader of the PRD is a **junior developer**. Therefore, requirements should be explicit, unambiguous, and avoid jargon where possible. Provide enough detail for them to understand the feature's purpose and core logic.

## Output

*   **Format:** Markdown (`.md`)
*   **Location:** `/tasks/`
*   **Filename:** `[n]-prd-[feature-name].md`

## Final instructions

1. Do NOT start implementing the PRD
2. Generate clarifying questions in a file (`[feature-name]-questions.md`) for the user to answer
3. Take the user's answers to the clarifying questions and improve the PRD
4. **If the feature has a UI:** Generate 3 barebones UI mockup options using HTML and the project's CSS framework, then wait for user to select their preferred mockup. **Otherwise:** Note "UI mockup omitted - headless feature" in the Design Considerations section
5. **If the feature requires data persistence:** Generate core type definitions in a file (`[feature-name]-types.ts`) for user review (with header comment about not using ID references), then wait for user approval on types. **Otherwise:** Note "Types omitted - no storage requirements" in the Technical Considerations section
6. Save the PRD after completing applicable steps