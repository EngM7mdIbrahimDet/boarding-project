import { UseQueryOptions, useQuery } from "react-query";
import { getArticles } from "/imports/api/requests/Articles";
import { IArticle } from "/imports/types/models/Article";

export const useGetAllArticles = (
    options?: UseQueryOptions<any, unknown, any>
  ) => {
    return useQuery<any, any, IArticle[],any>(
      ["getArticles"],
      () => getArticles(),
      {
        ...options,
      }
    );
  };