export interface CommentsPreviewProps {
    author: string;
    image: string;
    text: string;
    date: Date | number;
    _id: string;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}