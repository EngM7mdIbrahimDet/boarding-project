export interface IArticle {
  _id?: string;
  title: string;
  text: string;
  createdOn?: Date;
  modifiedOn?: Date;
  createdById?: string;
}
