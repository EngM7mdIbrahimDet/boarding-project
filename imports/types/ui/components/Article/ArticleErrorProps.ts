import { Meteor } from "meteor/meteor";

export interface ArticleErrorProps {
  error?: Meteor.Error | Meteor.TypedError | Error;
}
