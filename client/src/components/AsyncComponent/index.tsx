import React, { Component } from "react"
import Loadable from "react-loadable"
import LoadingComponent from "./../LoadingComponent";

type dynamicImport = () => Promise<{ default: React.ReactElement | React.SFCElement<any> | React.FunctionComponent }>

type state = {
    component: React.ReactElement | React.SFCElement<any> | React.FunctionComponent | null
}

function DynamicImport<T = {}>(importComponent: dynamicImport){
    class AsyncComponent extends Component<T, state> {
        constructor(props: T){
            super(props);
            this.state = {
                component: null
            }
        }

        async componentDidMount(){
            const { default: component } = await importComponent();
            this.setState({
                component: component
            });
        }

        render(){
            const C = this.state.component;
            return C ? React.createElement(C as any, this.props) : null;
        }
    }

    return AsyncComponent;
}

function DynamicImportLoadbale<T = {}>(importComponent: dynamicImport){
    return Loadable({
        loader: importComponent as any,
        loading: LoadingComponent
    })
}

/**
 * Fonction permettant le code splitting
 */
export default DynamicImport
