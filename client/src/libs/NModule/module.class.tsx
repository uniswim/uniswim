import React from "react"
import { getComponentDisplayName } from "./utils";

export interface IModule {
    importsModules?: any[]
    providerComponent?: any
    bootstrapComponent?: any
    services?: any[]
}

const ModulesMaps = new Map();

export class ModuleClass
{
    private _moduleComponent: React.ComponentType | undefined
    constructor(private options: IModule){ }

    private cloneStaticMethods(source: any, target: any){
        Reflect.ownKeys(source).reduce((tab: string[], key) => {
            let _dontcopy = ["name", "length", "defaultProps", "prototype"];
            if(_dontcopy.indexOf(key as string) !== -1) return tab;
            tab = [...tab, key as string]
            return tab;
        }, []).forEach(x => {
            target[x] = source[x];
        })
    }

    private generateModuleComponent(){

        /**
         * ModuleComponent
         *  +--ImportModules(providersComponent)
         *  +------BootstrapComponent
         */

        const BootstrapComponent = this.options.bootstrapComponent;
        const ImportedModules = this.options.importsModules || [];

        class ModuleComponent extends React.Component
        {
            render(){

                // -- bootstrap component
                let Result = this.props.children;
                if(BootstrapComponent) Result = BootstrapComponent;

                // -- import modules
                

                return Result
            }
        }

        // -- display name
        if(BootstrapComponent){
            let _name = `ModuleComponent(${getComponentDisplayName(BootstrapComponent)})`;
            if(ModuleComponent.prototype) (ModuleComponent.prototype as any).displayName = _name;    
            (ModuleComponent as any).displayName = _name;
        }

        // -- clone static methods
        if(BootstrapComponent) this.cloneStaticMethods(BootstrapComponent, ModuleComponent)

        return ModuleComponent;


        /*let WrappedComponent: any = this.options.component as unknown as ModuleComponent;
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

        return ModuleComponent;*/
    }

    private generateBootstrapElement(){

    }

}