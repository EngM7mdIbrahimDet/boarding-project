import { Meteor } from "meteor/meteor";
import { Articles } from "/imports/models/Articles";
import { IArticle, IArticleFilter } from "/imports/types/models/Article";
import validateObject from "/imports/utils/validate-schema";

const getAllArticles = async ({ filter }: { filter: IArticleFilter }) => {
  const skipCount = filter?.page ? Math.max(+filter.page - 1, 0) * 10 : 0;
  console.log("skipCount", skipCount)
  const articles = Articles.collection
    .createQuery({
      $filters: {
        $or: [
          { title: { $regex: new RegExp(`.*${filter?.search}.*`, "i") } },
          {
            text: { $regex: new RegExp(`.*${filter?.search}.*`, "i") },
          },
        ],
      },
      $options: {
        sort: { createdOn: -1 },
        skip: skipCount,
      },
      title: 1,
      createdOn: 1,
      text: 1,
      createdById: 1,
      author: {
        profile: {
          name: 1,
        },
      },
      comments: {
        text: 1
      },
      commentsCount: 1,
    })
    .fetch();
  const articlesCount = Articles.collection.find({}).count();
  return {
    articles: articles.slice(0, 10),
    count: articlesCount,
    pages: Math.ceil(articles.length / 10),
  };
};
const getSignleArticle = ({ articleID }: { articleID: string }) => {
  return Articles.collection
    .createQuery({
      $filters: { _id: articleID },
      author: { profile: { name: 1 } },
    })
    .fetchOne();
};
const addArticle = ({ article }: { article: IArticle }) => {
  const currentUserID = Meteor.userId();
  if (!currentUserID) {
    throw new Meteor.Error("Unauthorized to create a new article");
  }
  const newArticle: IArticle = {
    ...article,
    createdById: currentUserID,
    createdOn: new Date(),
  };
  validateObject(Articles.schema, newArticle, "Invalid article to be added!");
  return Articles.collection.insert(newArticle);
};

const updateArticle = ({
  articleID,
  article,
}: {
  articleID: string;
  article: IArticle;
}) => {
  const currentUserID = Meteor.userId();
  if (!currentUserID) {
    throw new Meteor.Error("Unauthorized to update an article");
  }
  let currentArticle = Articles.collection.findOne({ _id: articleID });
  if (!currentArticle) {
    throw new Meteor.Error("Article not found");
  }
  if (currentArticle.createdById !== currentUserID) {
    throw new Meteor.Error("Unauthorized to update this article");
  }
  delete currentArticle._id;
  const { _id, ...restArticle } = article;
  const updatedArticle: IArticle = {
    ...currentArticle,
    ...restArticle,
    createdById: currentUserID,
    modifiedOn: new Date(),
  };
  validateObject(
    Articles.schema,
    updatedArticle,
    "Invalid article to be updated!"
  );
  return Articles.collection.update(
    { _id: articleID },
    { $set: updatedArticle }
  );
};

const removeArticle = ({ articleID }: { articleID: string }) => {
  const currentUserID = Meteor.userId();
  if (!currentUserID) {
    throw new Meteor.Error("Unauthorized to remove an article");
  }
  let currentArticle = Articles.collection.findOne({ _id: articleID });
  if (!currentArticle) {
    throw new Meteor.Error("Article not found");
  }
  if (currentArticle.createdById !== currentUserID) {
    throw new Meteor.Error("You are not the owner to remove this article");
  }
  return Articles.collection.remove({ _id: articleID });
};

const getMyArticles = () => {
  const currentUserID = Meteor.userId();
  if (!currentUserID) {
    throw new Meteor.Error("Unauthorized to get my articles");
  }
  return Articles.collection.find({ createdById: currentUserID }).fetch();
};

Meteor.methods({
  "articles.getAll": getAllArticles,
});
Meteor.methods({
  "articles.getSingle": getSignleArticle,
});
Meteor.methods({
  "articles.add": addArticle,
});
Meteor.methods({
  "articles.update": updateArticle,
});
Meteor.methods({
  "articles.getMyArticles": getMyArticles,
});
Meteor.methods({
  "articles.remove": removeArticle,
});
