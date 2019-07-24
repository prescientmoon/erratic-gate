/**
 * The interface for all the actions wvound to the Simulation button on the sidebar
 */
export interface SidebarAction {
    name: string
    icon: string
    keybinding?: string[]
    action: () => void
}
