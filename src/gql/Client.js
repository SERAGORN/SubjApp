import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloLink} from 'apollo-link'
import ApolloClient from "apollo-boost"
const cache = new InMemoryCache();

const Client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: cache,
  opts: {
    mode: 'no-cors',
  },
});

export default Client;
