import React, { useState } from "react"
import LayoutConnectedDefault, { LayoutConnectedDefaultProps } from "./Layout.Connected.Default/Layout.Connected.Default";
import LayoutConnectedHeader, { LayoutConnectedHeaderProps } from "./Layout.Connected.Header/Layout.Connected.Header";
import { useApolloClient, useQuery, useMutation } from "@apollo/react-hooks";
import { ApolloCache } from "apollo-cache";
import gql from "graphql-tag";

type layouts = "ConnectedDefault" | "ConnectedHeader"
export type layoutOptions<T extends layouts> = 
    T extends "ConnectedDefault" ? LayoutConnectedDefaultProps :
    T extends "ConnectedHeader" ? LayoutConnectedHeaderProps :
    {}

const useLayoutQuery = () => useQuery(gql`
{ 
    configLayout @client { 
        layout 
    } 
}
`);
const useConfigLayoutMutation = () => {
    const [configLayout] = useMutation(gql`
    mutation ConfigLayout($layout: String!){ 
        ConfigLayout(layout: $layout) @client 
    }`)
    return configLayout;
}

let _options: any = {}

export const useLayout = <T extends layouts>(layout: T, options?: layoutOptions<T> ) => {
    const [init, setInit] = useState(false);
    const changeLayout = useConfigLayoutMutation();
    if(!init){
        _options = options;
        changeLayout({ variables: { layout: layout } })
        setInit(true);
    }
}


const LayoutModule: React.FC = (props) => { 
    const client = useApolloClient();
    const [init, setInit] = useState(false);
    if(!init){
        client.cache.writeData({ data: { configLayout: { __typename: "configLayout", layout: "ConnectedDefault" } } });
        client.addResolvers({
            Mutation: {
                ConfigLayout: (_, args, { cache }) => {
                    (cache as ApolloCache<any>).writeData({
                        data: {
                            configLayout: {
                                __typename: "configLayout", 
                                layout: args.layout
                            }
                        }
                    })
                }
            }
        });
        setInit(true);
    }

    const { data } = useLayoutQuery();
    let layout = data ? data.configLayout.layout : "ConnectedDefault";
    let Comp: React.ExoticComponent<any> | React.ComponentClass<any> | React.FC<any> = React.Fragment;
    if(layout === "ConnectedDefault") Comp = LayoutConnectedDefault;
    if(layout === "ConnectedHeader") Comp = LayoutConnectedHeader;
    
    return (
        <Comp {..._options}>
            {props.children}
        </Comp>
    );

}

export default LayoutModule;
