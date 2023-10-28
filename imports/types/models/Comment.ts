export interface IComment {
    _id?: string;   
    text: string;
    createdOn?: Date;
    articleId?: string;
    createdById?: string;
  }