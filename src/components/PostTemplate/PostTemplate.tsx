import { Dispatch, SetStateAction } from 'react';
import { PostItem } from '../PostItem/PostItem';
import styles from './styles.module.scss';
import { PullRequest } from '../../../schema/__generated__/graphql';

interface Props {
    data: PullRequest[];
    isEndPage: boolean;
    setTarget: Dispatch<SetStateAction<HTMLElement | null | undefined>>;
    loading: boolean;
    lastEdge?: string;
}

export function PostTemplate({ data, isEndPage, setTarget, loading, lastEdge }: Props) {
    return (
        <div className={styles.container}>
            {data.map((item) => (
                <PostItem key={item.id} title={item.title} createdAt={item.createdAt} comments={item.comments} />
            ))}
            {isEndPage && <div>페이지 끝 입니다.</div>}
            <div ref={setTarget}>{loading ? 'loading...' : lastEdge}</div>
        </div>
    );
}
