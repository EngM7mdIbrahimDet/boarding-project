import { Meteor } from "meteor/meteor";
import { UseSubscribeCommentsProps } from "/imports/types/hooks/useSubscribeCommentsProps";
import { useTracker } from "meteor/react-meteor-data";
import { IComment } from "/imports/types/models/Comment";
import { useState } from "react";
import { Comments } from "/imports/models/Comments";
import getDifference from "/imports/utils/difference-arrays";
import { showNotification } from "@mantine/notifications";

function useSubscribeComments({
  articleId,
  onError,
}: UseSubscribeCommentsProps) {
  const [currComments, setCurrComments] = useState<IComment[]>([]);
  const { isLoading } = useTracker(() => {
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
      return { isLoading: true };
    } else {
      const comments = Comments.collection.find({ articleId }).fetch();
      setCurrComments((prevComments) => {
        console.log("prevComments", prevComments);
        console.log("comments", comments);
        const { change, difference } = getDifference<IComment>({
          prevArray: prevComments,
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
        return comments;
      });
      return { isLoading: false };
    }
  }, [articleId]);
    return { comments: currComments, isLoading };
}

export default useSubscribeComments;
