import { ModuleClass, OptionsModule } from "./Module.class";
import React from "react"

export function Module(options?: OptionsModule) {
    return <T extends React.ComponentClass | {new(...args:any[]):{}}>(component: T) : T => {

        

        if((component as React.ComponentClass).prototype && (component as React.ComponentClass).prototype.render){
            let _module = new ModuleClass({
                ...options,
                component: component as React.ComponentClass
            });
            return _module.getModuleComponent() as T;
        } else {
            let _module = new ModuleClass({
                ...options
            });
            return component;
        }

    }
}