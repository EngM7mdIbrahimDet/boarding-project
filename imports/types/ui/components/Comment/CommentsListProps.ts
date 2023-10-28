import { IComment } from "/imports/types/models/Comment";

export interface CommentsListProps {
  comments: IComment[];
  className?: string;
}
