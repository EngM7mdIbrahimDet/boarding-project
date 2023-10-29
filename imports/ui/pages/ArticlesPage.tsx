import React, { useState } from "react";
import Page from "../layouts/Page";
import { useGetAllArticles } from "/imports/hooks/requests/Articles";
import ArticlesList from "../components/Article/ArticlesList";
import { useDebouncedState } from "@mantine/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Card,
  Loader,
  Modal,
  Pagination,
  TextInput,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { ACCENT_COLOUR } from "/imports/constants/styles";
import { IArticleFilter } from "/imports/types/models/Article";

export default function ArticlesPage() {
  const queryParams = useSearchParams();
  const search = queryParams[0].get("search");
  const page = queryParams[0].get("page");
  const goTo = useNavigate();
  const [filter, setFilter] = useDebouncedState<IArticleFilter>(
    { search: search ?? "", page: page ?? "1" },
    500
  );
  const { data, isLoading, error } = useGetAllArticles(filter, {});
  console.log("Articles", data)
  const { articles, pages, count } = data ?? {
    articles: [],
    pages: 0,
    count: 0,
  };
  return (
    <Page className="py-7" stack>
      <TextInput
        label="Search"
        className="w-2/5 self-center"
        placeholder={`We have arround ${count} articles in our space!`}
        defaultValue={filter.search}
        disabled={isLoading && filter.search === ""}
        onChange={(e) => {
          setFilter({ search: e.currentTarget.value, page: "1" });
        }}
        rightSection={
          isLoading && filter.search !== "" ? (
            <Loader size="xs" />
          ) : (
            <IconSearch size={20} color={ACCENT_COLOUR} />
          )
        }
      />
      
      <ArticlesList loading={isLoading} articles={articles} error={error} />
      <Pagination
        onChange={(value) => {
          setFilter({ ...filter, page: "" + value });
          goTo(`/?${filter.search && `search=${filter.search}&`}page=${value}`);
        }}
        page={parseInt(filter.page ?? "")}
        align="center"
        className="self-center items-center"
        total={pages}
      />
    </Page>
  );
}
