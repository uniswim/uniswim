import React from "react"
import { Route, RouteProps } from "react-router"
import Authenticated, { AuthenticatedProps } from "../Authenticated";

type compProps = {
    AuthenticatedProps?: AuthenticatedProps
} & RouteProps

/**
 * Affiche la route si l'authentification est réussie
 */
export class PrivateRoute extends React.Component<compProps, any>
{
    render(){
        const { component: Component, ...rest } = this.props;
        if(!Component) return null;
        return (
            <Route 
                {...rest}
                render={props => {
                    const { children, ...compProps } = props as any;
                    return (
                        <Authenticated location={this.props.location}>
                            <Component {...compProps} />
                        </Authenticated>
                    )
                }}
            />
        )
    }
}