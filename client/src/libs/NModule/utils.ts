export function getComponentDisplayName(wrappedComponent: any){
    return wrappedComponent.displayName || wrappedComponent.name || 'Component';
}