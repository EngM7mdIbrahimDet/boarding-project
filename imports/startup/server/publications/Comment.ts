import { Meteor } from "meteor/meteor";
import { Comments } from "/imports/models/Comments";

Meteor.publish("getArticleComments", function ({articleId}: {articleId: string}) {
  return Comments.collection.find({articleId});
});
