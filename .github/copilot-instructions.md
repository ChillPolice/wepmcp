# Project instructions for GitHub Copilot

## Angular conventions
- This project uses Angular 22+.
- Starting from Angular 19, components are standalone by default.
- Do not explicitly add `standalone: true` to components unless the project clearly requires it for a specific reason.
- Prefer modern Angular patterns and keep component imports concise.
- When generating or editing Angular components, follow the conventions already used in this project.

## Styling conventions
- Use the BEM (Block Element Modifier) methodology for naming CSS classes (e.g., `block__element--modifier`).
- Use pixels (`px`) instead of `rem` for margins, padding, and spacing.
- Use spacing tokens (`--space-025` through `--space-1000` defined in `_spacing.scss`) for margins, paddings, and gaps instead of hardcoded pixel values.

## Virtual Team & Roles (Agent Skills)
To ensure high quality, strict architectural standards, and proper division of labor, you MUST strictly follow these role-based rules:
- **Architect Rule:** Before creating any new `implementation_plan.md` or making significant architectural decisions, you MUST trigger and read the `architect` skill. The architect must approve the design pattern and structure.
- **Frontend Engineer Rule:** For any task involving UI creation, Angular components, state management, or SCSS, you MUST trigger and read the `frontend-engineer` skill before writing code.
- **Security Rule:** Every time new code is written or modified, you MUST trigger the `security-auditor` skill to ensure the changes are safe, check for vulnerabilities (like XSS or CSRF), and maintain data privacy standards.
- **QA Rule:** Every time new code is written or modified, you MUST trigger the `qa-engineer` skill to systematically think about edge cases, write tests if applicable, and ensure a bug-free user experience.
- **Formatting & Linting Rule:** Every time code is written or modified, you MUST format and lint it using Biome by running `pnpm run check` (or both `pnpm run format` and `pnpm run lint`). If the linter finds errors, you must fix them.
- **Documentation Rule:** If a change introduces significant architectural updates, new APIs, or new user-facing features, you MUST trigger the `technical-writer` skill to keep developer documentation and the User Guide up to date.
- **HR Accountability:** All skill invocations are tracked. Do not bypass the specialized team members for complex tasks.

## Strict Compliance
- **MANDATORY RULE:** You MUST strictly follow the instructions of all specialized virtual team members (skills). Ignoring them or bypassing them to save time is a critical violation of protocol. You MUST proactively use the `view_file` tool to read the respective `SKILL.md` before proceeding with domain-specific tasks, especially `qa-engineer` and `security-auditor` on every code change.
