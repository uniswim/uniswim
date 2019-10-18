import React from "react"
import {} from "reflect-metadata"
import { RouteComponentProps, RouteChildrenProps, Route } from "react-router"


const __modules = new Map();
const __routes = new Map<string, ModuleRoute>();


export type ModuleComponent = React.FC | React.ComponentClass
export type ModuleImport = ModuleComponent | DynamicModule | {new(...args:any[]):{}}
export type ModuleRouteDetailed = {
    component?: React.ComponentType<RouteComponentProps<any>>;
    render?: ((props: RouteComponentProps<any>) => React.ReactNode);
    children?: ((props: RouteChildrenProps<any>) => React.ReactNode) | React.ReactNode;
    exact?: boolean;
    sensitive?: boolean;
    strict?: boolean;
}
export type ModuleRoute = {
    [key: string]: ModuleComponent | ModuleRouteDetailed
}

export type OptionsModule = {
    imports?: (ModuleImport)[],
    services?: any[],
    routes?: ModuleRoute
}

export type DynamicModule = {
    component?: ModuleComponent
} & OptionsModule


export class ModuleClass {

    private _moduleComponent?: React.ComponentClass
    constructor(
        private options: DynamicModule
    ){ 


        if( this.options.component &&
            (this.options.component as ModuleComponent).prototype && 
            (this.options.component as ModuleComponent).prototype.render){

            this._moduleComponent = this.createModuleComponent();
            ModuleClass.setModule(this._moduleComponent, this);
        }
        if(this.options.routes) ModuleClass.addModuleRoute(this.options.routes);
    }

    getModuleComponent(){
        return this._moduleComponent;
    }

    private createModuleComponent(){

        let WrappedComponent: any = this.options.component as unknown as ModuleComponent;
        let ImportedModules = this.options.imports || [];

        class ModuleComponent extends React.Component
        {
            render(){
                let Result = <WrappedComponent {...this.props} />
                ImportedModules.forEach(mod => {
                    let _mod = ModuleClass.getModule(mod);
                    if(!_mod){
                        if(!ModuleClass.isDynamicModule(mod)) return;
                        _mod = new ModuleClass(mod as DynamicModule);
                    }
                    let Comp: any = _mod.getModuleComponent() as unknown as ModuleComponent;
                    Result = (<Comp>{Result}</Comp>)
                });
                return Result
            }
        }

        // -- display name
        let _name = `ModuleComponent(${ModuleClass.getDisplayName(WrappedComponent)})`;
        if(ModuleComponent.prototype) (ModuleComponent.prototype as any).displayName = _name;    
        (ModuleComponent as any).displayName = _name;

        // -- clone static methods
        Reflect.ownKeys(WrappedComponent).reduce((tab: string[], key) => {
            let _dontcopy = ["name", "length", "defaultProps", "prototype"];
            if(_dontcopy.indexOf(key as string) !== -1) return tab;
            tab = [...tab, key as string]
            return tab;
        }, []).forEach(x => {
            (ModuleComponent as any)[x] = (WrappedComponent as any)[x];
        })

        return ModuleComponent;
    }

    private createModuleRoutes(){
        if(this.options.routes){

        }
    }

    private static getDisplayName(wrappedComponent: any){
        return wrappedComponent.displayName || wrappedComponent.name || 'Component';
    }

    static getModule(target: any): ModuleClass{
        return Reflect.getMetadata("module", target);
    }

    static setModule(target: any, moduleMeta: ModuleClass){
        Reflect.defineMetadata("module", moduleMeta, target);
    }

    static isDynamicModule(mod: ModuleImport){
        if((mod as DynamicModule).component) return true;
        return false;
    }

    static addModuleRoute(route: ModuleRoute, category: string = "root"){
        let _routes = this.getModuleRoute(category);
        if(!_routes) _routes = {};
        _routes = {
            ..._routes,
            ...route
        };
        this.setModuleRoute(_routes, category);
    }

    static setModuleRoute(route: ModuleRoute, category: string = "root"){
        console.log("setModuleRoute",route, category);
        __routes.set(category, route);
    }

    static getModuleRoute(category: string = "root"){
        console.log("getModuleRoute",category);
        return __routes.get(category);
    }
}