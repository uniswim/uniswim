import React from "react"
import { Switch, Route } from "react-router-dom"
import { ModuleClass, ModuleRoute, ModuleComponent, ModuleRouteDetailed } from "./Module.class"

function isModuleRouteDetailed(routeKey: ModuleComponent | ModuleRouteDetailed): routeKey is ModuleRouteDetailed
{
    if((routeKey as ModuleRouteDetailed).component || (routeKey as ModuleRouteDetailed).render) return true;
    if(typeof routeKey == "object") return true;
    return false;
}

export const useRoutes = (category: string = "root") => {
    return ModuleClass.getModuleRoute(category);
}

export const makeRoutes = (RoutesOrCategory: string | ModuleRoute = "root") => {
    let _routes: ModuleRoute | undefined = undefined;
    if(typeof RoutesOrCategory === "string"){
        _routes = ModuleClass.getModuleRoute(RoutesOrCategory);
    } else {
        _routes = RoutesOrCategory
    }

    if(!_routes) return null;

    let _routesElements = []
    for(let key in _routes){
        let _element = null;
        if(isModuleRouteDetailed(_routes[key])){
            _element = (<Route key={key} path={key} {..._routes[key]} />)
        } else {
            _element = (<Route key={key} path={key} component={_routes[key] as any} />)
        }
        if(_element) _routesElements.push(_element);
    }
    return (
        <Switch>
            {_routesElements}
        </Switch>
    )
}