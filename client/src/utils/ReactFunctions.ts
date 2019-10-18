export const getDisplayName = (WrappedComponent: any): string => {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}