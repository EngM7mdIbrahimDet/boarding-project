import { Meteor } from "meteor/meteor";
import { Comments } from "/imports/models/Comments";
import { IComment } from "/imports/types/models/Comment";
import { Articles } from "/imports/models/Articles";
import validateObject from "/imports/utils/validate-schema";

export const postCommentToArticle = ({
  comment,
  articleId,
}: {
  comment: IComment;
  articleId: string;
}) => {
  const currenUser = Meteor.user();
  if (!currenUser) {
    throw new Meteor.Error("You should be logged in to post a comment");
  }
  const currentArticle = Articles.collection.findOne({ _id: articleId });
  if (!currentArticle) {
    throw new Meteor.Error(
      "Article not found! May be the author has removed it!"
    );
  }
  const newComment = {
    ...comment,
    createdById: currenUser._id,
    articleId,
    createdOn: new Date(),
  };
  validateObject(
    Comments.schema,
    newComment,
    "Something is wrong with the comment"
  );
  Comments.collection.insert(newComment);
  return true;
};

export const removeComment = ({ commentId }: { commentId: string }) => {
  const currenUser = Meteor.user();
  if (!currenUser) {
    throw new Meteor.Error("You should be logged in to remove a comment");
  }
  const currentComment = Comments.collection.findOne({ _id: commentId });
  if (!currentComment) {
    throw new Meteor.Error(
      "Comment not found! May be you have already removed it!"
    );
  }
  if (currentComment.createdById !== currenUser._id) {
    throw new Meteor.Error("You can only remove your own comments");
  }
  Comments.collection.remove({ _id: commentId });
  return true;
};

export const updateComment = ({
  commentId,
  comment,
}: {
  commentId: string;
  comment: IComment;
}) => {
  const currenUser = Meteor.user();
  if (!currenUser) {
    throw new Meteor.Error("You should be logged in to update a comment");
  }
  const currentComment = Comments.collection.findOne({ _id: commentId });
  if (!currentComment) {
    throw new Meteor.Error(
      "Comment not found! May be you have removed it before!"
    );
  }
  if (currentComment.createdById !== currenUser._id) {
    throw new Meteor.Error("You can only update your own comments");
  }
  const {_id, ...restComment} = currentComment;
  const newComment = {
    ...comment,
    ...restComment,
  };
  validateObject(
    Comments.schema,
    newComment,
    "Something is wrong with the comment"
  );
  Comments.collection.update({ _id: commentId }, { $set: newComment });
  return true;
};

Meteor.methods({
  "comments.post": postCommentToArticle,
  "comments.remove": removeComment,
  "comments.update": updateComment,
});
