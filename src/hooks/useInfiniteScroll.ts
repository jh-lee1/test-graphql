import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { GitObject, PullRequest, PullRequestEdge } from '../../schema/__generated__/graphql';
import { RemoveMaybeAsList } from '../../utils/RemoveMaybe';
import { apolloClient } from '../../utils/ApolloClient';
import { GIT_PR_QUERY } from '../../utils/query/GetPR';

const observerOption = {
    threshold: 0.4,
};

interface Props<T> {
    initialData?: T[];
    query?: (page: number) => Promise<T[]>;
    tracking?: any;
}

export function useInfiniteScroll<T>({ query, initialData = [], tracking }: Props<T>) {
    const router = useRouter();
    const [target, setTarget] = useState<HTMLElement | null>();
    const [data, setData] = useState<T[]>(initialData);
    const [loading, setLoading] = useState(false);
    const [isEndPage, setIsEndPage] = useState(false);
    const lastEdgeRef = useRef<string>();

    const handleObserver = async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        if (entries[0].intersectionRatio <= 0) return;
        if (!entries[0].isIntersecting) return;
        if (loading) return;
        if (isEndPage) return;
        try {
            setLoading(true);
            const res = await apolloClient.query<GitObject>({ query: GIT_PR_QUERY, variables: { page: lastEdgeRef.current || null } });
            const pullRequestsNodes = res.data.repository.pullRequests.nodes;
            const pullRequestEdges = res.data.repository.pullRequests.edges;

            if (!pullRequestsNodes) {
                setIsEndPage(true);
                return console.log('pullRequests nodes 없음');
            }
            if (!pullRequestEdges) {
                setIsEndPage(true);
                return console.log('edges 없음');
            }

            const filteredNodesMaybe = RemoveMaybeAsList(pullRequestsNodes) as T[];
            const filteredEdgesMaybe = RemoveMaybeAsList(pullRequestEdges);

            const lastEdge = filteredEdgesMaybe[filteredEdgesMaybe.length - 1];

            setData((prev) => [...prev, ...filteredNodesMaybe]);
            lastEdgeRef.current = lastEdge.cursor;
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, { threshold: 0.4 });
        if (target) observer.observe(target);
        return () => {
            observer.disconnect();
        };
    }, [target, lastEdgeRef.current]);

    return { setTarget, target, lastEdge: lastEdgeRef.current, isEndPage, data: data.length === 0 ? initialData : data, loading };
}
