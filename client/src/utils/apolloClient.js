import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create main HTTP link
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Create authentication link
const authLink = setContext((_, { headers }) => {
  // Get the token from localStorage
  const token = localStorage.getItem('id_token');
  
  // Return the headers to the context
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client; 