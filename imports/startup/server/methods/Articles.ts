import { Meteor } from "meteor/meteor";
import { Articles } from "/imports/models/Articles";
import { IArticle } from "/imports/types/models/Article";

const getAllArticles = () => {
  return Articles.collection.find({}).fetch();
};
const getSignleArticle = (articleID: string) => {
  return Articles.collection.find({ _id: articleID }).fetch();
};
const addArticle = (article: IArticle) => {
  const currentUserID = Meteor.userId();
  if (!currentUserID) {
    throw new Meteor.Error("Unauthorized to create a new article");
  }
  Articles.schema.validate({ ...article, createdById: currentUserID });
  return Articles.collection.insert({ ...article, createdById: currentUserID });
};

const updateArticle = (articleID: string, article: IArticle) => {
  const currentUserID = Meteor.userId();
  if (!currentUserID) {
    throw new Meteor.Error("Unauthorized to update an article");
  }
  Articles.schema.validate({ ...article, createdById: currentUserID });
  const currentArticle = Articles.collection.findOne({ _id: articleID });
  if (!currentArticle) {
    throw new Meteor.Error("Article not found");
  }
  if (currentArticle.createdById !== currentUserID) {
    throw new Meteor.Error("Unauthorized to update this article");
  }

  return Articles.collection.update(
    { _id: articleID },
    { ...currentArticle, ...article, createdById: currentUserID }
  );
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
