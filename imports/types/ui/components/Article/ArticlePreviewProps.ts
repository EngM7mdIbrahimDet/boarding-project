export interface ArticleHeaderProps{
    author: string;
    title: string;
    _id?: string;
    onDelete: (articleId: string) => void;
}
export interface ArticlePreviewProps {
    _id?: string;
    author: string;
    authorId: string;
    title: string;
    text: string;
    date: Date | number;
    buttonText?: string;
    onDelete: (articleId: string) => void;
    onPress?: () => void;
}