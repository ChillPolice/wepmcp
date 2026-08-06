# Pulsera Design System

This document serves as the long-term memory and single source of truth for all design decisions made by the virtual design team.

## Chat Component Decisions
- **Textarea Resizing**: Use modern `field-sizing: content` to allow fluid resizing without JS. Min height is `1.5lh`, max height `8lh`.
- **Message Bubbles**:
  - Max width: `80%` of container.
  - Border radii: `var(--radius-medium)`, except for the directional corner which is flattened (`4px`) to point to the sender.
  - User messages: Align right, background `var(--color-primary)`, text `var(--color-on-primary)`.
  - Assistant messages: Align left, background `var(--color-surface-variant)`, text `var(--color-text)`.
- **Animations**: Typing indicator uses a 3-dot `pulse` animation spanning `1.5s` infinitely.
