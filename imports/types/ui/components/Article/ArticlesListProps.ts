import { IArticle } from "/imports/types/models/Article";

export interface ArticlesListProps {
  articles: IArticle[];
  loading: boolean;
  error?: Error;
}
