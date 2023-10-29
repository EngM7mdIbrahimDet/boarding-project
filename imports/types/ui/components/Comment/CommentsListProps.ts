import { IComment } from "/imports/types/models/Comment";

export interface CommentsListProps {
  articleId: string;
  comments: IComment[];
  className?: string;
}
