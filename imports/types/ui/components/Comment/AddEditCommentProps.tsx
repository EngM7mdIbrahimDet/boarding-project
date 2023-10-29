export interface AddEditCommentProps {
    image: string;
    text?: string;
    _id?: string;
    articleId: string;
    onEditCompelete?: (_id: string) => void;
}