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
} from "/imports/api/requests/Articles";
import { IArticle } from "/imports/types/models/Article";

export const useGetAllArticles = (
  options?: UseQueryOptions<any, unknown, any>
) => {
  return useQuery<any, any, IArticle[], any>(
    ["getArticles"],
    () => getArticles(),
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
    (article) => addArticle(article),
    {
      ...options,
    }
  );
};
