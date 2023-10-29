import { IArticle } from "./Article";
import { IUser } from "./User";

export interface IComment {
    _id?: string;   
    text: string;
    createdOn?: Date;
    articleId?: string;
    createdById?: string;

    // These are not part of the comment, but are added by the links
    author?: IUser;
    article?: IArticle;
  }