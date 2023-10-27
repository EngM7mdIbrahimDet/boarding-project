import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "react-query";
import {
  addArticle,
  getArticle,
  getArticles,
  getMyArticles,
  updateArticle,
} from "/imports/api/requests/Articles";
import { IArticle, IArticleFilter } from "/imports/types/models/Article";

export const useGetAllArticles = (
  filter?: IArticleFilter,
  options?: UseQueryOptions<any, unknown, any>
) => {
  return useQuery<
    any,
    any,
    { articles: IArticle[]; pages: number; count: number},
    any
  >(
    ["getArticles", filter],
    () => getArticles(filter ?? { search: "", page: "1" }),
    {
      ...options,
    }
  );
};
export const useGetSingleArticle = (
  articleID: string,
  options?: UseQueryOptions<any, unknown, any>
) => {
  return useQuery<any, any, IArticle, any>(
    ["getArticle", articleID],
    () => getArticle(articleID),
    {
      ...options,
    }
  );
};
export const useAddArticle = (
  options?: UseMutationOptions<any, unknown, any, any>
) => {
  return useMutation<any, any, IArticle, any>(
    ["addArticle"],
    (article) => addArticle(article),
    {
      ...options,
    }
  );
};

export const useUpdateArticle = (
  articleID: string,
  options?: UseMutationOptions<any, unknown, any, any>
) => {
  return useMutation<any, any, IArticle, any>(
    ["updateArticle", articleID],
    (article) => updateArticle(articleID, article),
    {
      ...options,
    }
  );
};

export const useGetMyArticles = (
  userID: string,
  options?: UseQueryOptions<any, unknown, any>
) => {
  return useQuery<any, any, IArticle[], any>(
    ["getMyArticles", userID],
    () => getMyArticles(),
    {
      ...options,
    }
  );
};
