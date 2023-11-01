import { CodegenConfig } from '@graphql-codegen/cli';

const token = process.env.NEXT_PUBLIC_AT;

const config: CodegenConfig = {
    schema: 'https://api.github.com/graphql',
    config: {
        headers: {
            'User-Agent': 'mac',
            'authorization': `Bearer ${token}`,
        },
    },
    documents: ['src/**/*.{ts,tsx}'],
    generates: {
        './schema/__generated__/': {
            preset: 'client',
            plugins: [],
            presetConfig: {
                gqlTagName: 'gql',
            },
            config: {
                maybeValue: 'T',
            },
        },
    },
    ignoreNoDocuments: true,
};

export default config;
