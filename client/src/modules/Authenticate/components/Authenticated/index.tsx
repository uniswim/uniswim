import React from "react"
import { useHistory } from "react-router"
import { Location } from "history"

export type AuthenticatedProps = {
    children: React.ReactNode
    AuthentificationLoading?: string | React.FunctionComponent<any> | React.ComponentClass<any, any>
    onFailed?: (() => void) | string
    onSuccess?: (() => void) | string
    isLoggedFn?: () => Promise<boolean>
    location?: Location
}

type AuthenticatedState = {
    loading?: boolean
    authenticated?: boolean
}

/**
 * Affiche le composant enfant si l'authentification réussie
 */
export default class Authenticated extends React.PureComponent<AuthenticatedProps, AuthenticatedState>
{
    static defaultProps: Partial<AuthenticatedProps> = {

    }

    constructor(props: AuthenticatedProps) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentWillMount() {
        if (!this.props.isLoggedFn) return;

        this.props.isLoggedFn()
            .then((connected) => {
                this.setState({ loading: false, authenticated: connected });
                if (connected) {
                    if (this.props.onSuccess) {
                        if (typeof (this.props.onSuccess) == "string") {
                            useHistory().push(this.props.onSuccess);
                        } else {
                            this.props.onSuccess();
                        }
                    }
                } else {
                    if (this.props.onFailed) {
                        if (typeof (this.props.onFailed) == "string") {
                            let _uri = this.props.onFailed;
                            if (this.props.location) {
                                _uri = `${_uri}?r=${this.props.location.pathname}`;
                            }
                            useHistory().push(_uri);
                        } else {
                            this.props.onFailed();
                        }
                    }
                }
            })
            .catch((err) => {
                if (this.props.onFailed) {
                    if (typeof (this.props.onFailed) == "string") {
                        useHistory().push(this.props.onFailed);
                    } else {
                        this.props.onFailed();
                    }
                }
            })

    }

    render(){
        if(this.state.loading && this.props.AuthentificationLoading) return React.createElement(this.props.AuthentificationLoading)
        if(!this.state.authenticated) return <div></div>
        return <React.Fragment>{this.props.children}</React.Fragment>;
    }
}