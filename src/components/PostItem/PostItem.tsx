import stylse from './styles.module.scss';

interface Props {
    title: string;
    createdAt: string;
    comments: {
        totalCount: number;
    };
}

export function PostItem({ title, createdAt, comments }: Props) {
    return (
        <div className={stylse.container}>
            <div className={stylse.post_item_wrapper}>
                <div>{title}</div>
                <div>{createdAt}</div>
            </div>
            <div className={stylse.post_item_comments_wrapper}>{comments.totalCount}</div>
        </div>
    );
}
