import '@/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { apolloClient } from '../../utils/ApolloClient';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}
