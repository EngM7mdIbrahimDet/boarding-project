export interface ArticleHeaderProps{
    author: string;
    title: string;
    _id?: string;
}
export interface ArticlePreviewProps {
    _id?: string;
    author: string;
    title: string;
    text: string;
    date: Date | number;
    buttonText?: string;
    onPress?: () => void;
}