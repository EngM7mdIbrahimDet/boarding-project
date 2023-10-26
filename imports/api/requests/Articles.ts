import { IArticle } from "/imports/types/models/Article";
import callAsync from "/imports/utils/call-async";

export const getArticles = async (): Promise<IArticle[]>=>{
    return await callAsync<IArticle[]>("articles.getAll",{});
}