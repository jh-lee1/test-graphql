import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const link = createHttpLink({
    uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = process.env.NEXT_PUBLIC_AT;
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) graphQLErrors.forEach(({ message }) => console.log(`error : ${message}`));
    if (networkError) console.log(`network error : ${networkError}`);
    if ((graphQLErrors || networkError) && typeof window !== 'undefined') alert('오류');
});

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, authLink.concat(link)]),
});
