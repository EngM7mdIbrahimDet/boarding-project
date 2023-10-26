import { IArticle } from "/imports/types/models/Article";
import callAsync from "/imports/utils/call-async";

export const getArticles = async (): Promise<IArticle[]> => {
  return await callAsync<IArticle[]>("articles.getAll", {});
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
