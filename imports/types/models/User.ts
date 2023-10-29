import { IArticle } from "./Article";
import { IComment } from "./Comment";

export interface IUser {
  _id?: string;
  emails?: Array<{ address: string; verified?: boolean }>;
  password?: string;
  confirmPassword?: string;
  profile?: {
    name?: string;
  };
  // These are not part of the user, but are added by the links
  articles?: IArticle[];
  comments?: IComment[];
}
