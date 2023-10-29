import { Meteor } from "meteor/meteor";
export interface UseSubscribeCommentsProps {
  articleId: string;
  onError?: (error: Meteor.Error) => void;
}
