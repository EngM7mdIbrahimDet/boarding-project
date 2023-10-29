import { Meteor } from "meteor/meteor";
import { Articles } from "./Articles";
import { Comments } from "./Comments";

//Link between articles and users
Articles.collection.addLinks({
  author: {
    type: "one",
    collection: Meteor.users,
    field: "createdById",
  },
});
Meteor.users.addLinks({
  articles: {
    collection: Articles.collection,
    inversedBy: "author",
  },
});

//Link between articles and comments
Comments.collection.addLinks({
  article: {
    collection: Articles.collection,
    type: "one",
    field: "articleId",
  },
});
Articles.collection.addLinks({
  comments: {
    collection: Comments.collection,
    inversedBy: "article",
  },
});

//Link between comments and users
Comments.collection.addLinks({
  author: {
    type: "one",
    collection: Meteor.users,
    field: "createdById",
  },
});
Meteor.users.addLinks({
  comments: {
    collection: Comments.collection,
    inversedBy: "author",
  },
});

//Reducers for articles
Articles.collection.addReducers({
  commentsCount: {
    body: {
      _id: 1,
      comments: {
        text: 1,
      },
    },
    reduce(body: any) {
      if (body.comments) {
        return body.comments.length;
      } else {
        return 0;
      }
    },
  },
});
