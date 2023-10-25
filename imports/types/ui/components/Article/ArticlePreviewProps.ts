export interface ArticleHeaderProps{
    author: string;
}
export interface ArticlePreviewProps {
    author: string;
    text: string;
    date: Date | number;
    buttonText?: string;
    onPress?: () => void;
}