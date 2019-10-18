import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloLink } from "apollo-link";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new ApolloLink()
});

export default client;