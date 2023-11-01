import { gql } from '@apollo/client';

export const GIT_PR_QUERY = gql`
    query GetPr($page: String) {
        repository(name: "next.js", owner: "vercel") {
            id
            name
            pullRequests(last: 20, before: $page) {
                nodes {
                    id
                    title
                    createdAt
                    comments {
                        totalCount
                    }
                }
                edges {
                    cursor
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
                totalCount
            }
        }
    }
`;
