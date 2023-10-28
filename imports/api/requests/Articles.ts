import { IArticle, IArticleFilter } from "/imports/types/models/Article";
import callAsync from "/imports/utils/call-async";

export const getArticles = async (filter: IArticleFilter): Promise<IArticle[]> => {
  return await callAsync<IArticle[]>("articles.getAll", {filter});
};

export const getArticle = async (articleID: string): Promise<IArticle> => {
  return await callAsync<IArticle>("articles.getSingle", { articleID });
};

export const addArticle = async (article: IArticle): Promise<IArticle> => {
  return await callAsync<IArticle>("articles.add", { article });
};

export const updateArticle = async (
  articleID: string,
  article: IArticle
): Promise<IArticle> => {
  return await callAsync<IArticle>("articles.update", { articleID, article });
};

export const getMyArticles = async (): Promise<IArticle[]> => {
  return await callAsync<IArticle[]>("articles.getMyArticles", {});
}

export const removeArticle = async (articleID: string): Promise<void> => {
  return await callAsync<void>("articles.remove", { articleID });
}
