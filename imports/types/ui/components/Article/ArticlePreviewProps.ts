export interface ArticleHeaderProps{
    author: string;
    title: string;
}
export interface ArticlePreviewProps {
    author: string;
    title: string;
    text: string;
    date: Date | number;
    buttonText?: string;
    onPress?: () => void;
}