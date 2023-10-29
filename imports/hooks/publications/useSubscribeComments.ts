import { Meteor } from "meteor/meteor";
import { UseSubscribeCommentsProps } from "/imports/types/hooks/useSubscribeCommentsProps";
import { useTracker } from "meteor/react-meteor-data";
import { IComment } from "/imports/types/models/Comment";
import { useRef } from "react";
import { Comments } from "/imports/models/Comments";
import getDifference from "/imports/utils/difference-arrays";
import { showNotification } from "@mantine/notifications";

function useSubscribeComments({
  articleId,
  onError,
}: UseSubscribeCommentsProps) {
  const commentsRef = useRef<IComment[]>([]);
  const { isLoading, comments } = useTracker(() => {
    const handler = Meteor.subscribe(
      "getArticleComments",
      { articleId },
      {
        onStop(error: Meteor.Error) {
          if (error && onError) {
            onError(error);
          }
        },
      }
    );
    if (!handler.ready()) {
      return { isLoading: true, comments: [] };
    } else {
      const comments = Comments.collection.find({ articleId }).fetch();
      console.log("prevComments", commentsRef.current);
      console.log("comments", comments);
      const { change, difference } = getDifference<IComment>({
        prevArray: commentsRef.current,
        nextArray: comments,
      });
      if (change === "added" && difference) {
        difference.forEach((comment: IComment) => {
          showNotification({
            title: "New Comment",
            message: `New comment has been added says: ${comment.text}`,
            color: "cyan",
            autoClose: 5000,
          });
        });
      } else if (change === "removed" && difference) {
        showNotification({
          title: "Comment Removed",
          message: `A comment has been removed!`,
          color: "red",
          autoClose: 5000,
        });
      }
      commentsRef.current = comments;
      return { isLoading: false, comments };
    }
  }, [articleId]);
  console.log("comments In hook out traccker", comments);
  return { comments, isLoading };
}

export default useSubscribeComments;
