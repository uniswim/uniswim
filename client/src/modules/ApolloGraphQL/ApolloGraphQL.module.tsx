import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"
import ApolloClient from "./ApolloGraphQL.Setup"



export default class ApolloGraphQLModule extends React.PureComponent
{ 
    render(){
        return (
            <ApolloProvider client={ApolloClient}>
                {this.props.children}
            </ApolloProvider>
        )
    }
}
