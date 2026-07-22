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
