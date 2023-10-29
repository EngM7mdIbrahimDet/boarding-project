import { Meteor } from "meteor/meteor";
import { IComment } from "./Comment";
import { IUser } from "./User";

export interface IArticle {
  _id?: string;
  title: string;
  text: string;
  createdOn?: Date;
  modifiedOn?: Date;
  createdById?: string;


  // These are not part of the article, but are added by the links
  author?: IUser;
  comments?: IComment[];
  commentsCount?: number;
}

export interface IArticleFilter {
  search?: string;
  page?:  string;
}
