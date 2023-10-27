import React, { useEffect } from "react";
import Page from "../layouts/Page";
import AddEditArticle from "../components/Article/AddEditArticle";
import randAvat from "/imports/utils/random-avatar";
import { useParams } from "react-router-dom";
import { useGetSingleArticle } from "/imports/hooks/requests/Articles";
import { ArticlePreviewLoading } from "../components/Article/ArticlePreview";

export default function EditArticlePage() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleArticle(id as string, {});
  useEffect(() => {
    console.log("ID: ", id);
    console.log(data);
  }, [data]);
  return (
    <Page className="py-7 flex justify-center items-center">
      {isLoading ? (
        <ArticlePreviewLoading />
      ) : (
        <AddEditArticle
          _id={id}
          text={data?.text}
          timeline={{
            date:
              (data?.modifiedOn ? data?.modifiedOn : data?.createdOn) ??
              new Date(),
            isEdit: Boolean(data?.modifiedOn),
          }}
          title={data?.title}
          image={randAvat()}
        />
      )}
    </Page>
  );
}
