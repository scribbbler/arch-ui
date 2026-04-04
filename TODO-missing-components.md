# Missing Components — Uber Base Components Not in Arch UI

These components exist in Uber Base / Base Web but are not yet implemented in Arch UI.
They are candidates for Phase 5 (Composite Components) or future releases.

## High Priority (commonly used)
- **Menu** — Dropdown menu with keyboard navigation, nested submenus, option groups
- **Snackbar** — Bottom-anchored brief message (differs from Toast in position/behavior)
- **DatePicker** — Calendar picker with date range, min/max, disabled dates, locale
- **TimePicker** — Time input with 12h/24h format, step control
- **SegmentedControl** — Mutually exclusive toggle group (like iOS segmented control)
- **PinCode** — Multi-digit PIN input with auto-advance between fields
- **ButtonGroup** — Grouped buttons with mutual exclusivity (radio-like)
- **ButtonDock** — Fixed bottom button bar for mobile actions
- **Sheet** — Bottom sheet overlay (mobile-first pattern)
- **EmptyState** — Standardized empty/zero-data view with icon, title, description, action

## Medium Priority
- **Stepper** — Numeric increment/decrement input
- **TreeView** — Hierarchical expandable list with selection
- **SideNavigation** — Vertical navigation with nested sections, collapsible
- **TopNavigation** — Horizontal app bar with logo, links, actions
- **NavigationHeader** — App header with back button, title, actions
- **BottomNavigation** — Mobile tab bar navigation
- **DraggableList** — Reorderable list with drag-and-drop + keyboard alternative
- **Rating** — Star/icon rating input
- **DataTable** — Full-featured data table with sorting, filtering, row selection, batch actions
- **CommandPalette** — Cmd+K search overlay with grouped actions

## Lower Priority
- **InlineEdit** — Click-to-edit inline text field
- **Tour / Onboarding Steps** — Guided overlay sequence built on Popover
- **MessageCard** — Rich notification card with media
- **ModalFullScreen** — Full-screen modal variant (currently Modal supports size="full")
- **SystemBanner** — App-level system status banner (our Banner may cover this)
- **SlidingButton** — Swipe-to-confirm button
- **TimedButton** — Button with countdown timer
- **Tile** — Selection tile (image + label)
- **ProgressCircle** — Circular progress indicator (we have linear ProgressBar)
- **Placeholder** — Content placeholder distinct from Skeleton

## Notes
- Components marked [v0.2] in the plan: Combobox/Autocomplete, DatePicker, TimePicker, DataTable, CommandPalette, NavigationBar, SideNavigation, TreeView, DragAndDropList, Rating, InlineEdit, Tour
- ColorPicker is explicitly deferred until demand warrants it
- Some Uber Base components map to existing Arch components with different names (e.g., their "Check" = our "Checkbox", their "Switch" = our "Toggle")
