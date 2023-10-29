import { UseMutationOptions, useMutation } from "react-query";
import {
  addComment,
  removeComment,
  updateComment,
} from "/imports/api/requests/Comments";
import { IComment } from "/imports/types/models/Comment";

export const useAddComment = (
  articleId: string,
  options?: UseMutationOptions<any, unknown, any, any>
) => {
  return useMutation<any, any, IComment, any>(
    ["addComment", articleId],
    (comment) => addComment({ articleId, comment }),
    {
      ...options,
    }
  );
};

export const useDeleteComment = (
  options?: UseMutationOptions<any, unknown, any, any>
) => {
  return useMutation<any, any, string, any>(
    ["removeComment"],
    (commentId) => removeComment({ commentId }),
    {
      ...options,
    }
  );
};

export const useUpdateComment = (
  commentId: string,
  options?: UseMutationOptions<any, unknown, any, any>
) => {
  return useMutation<any, any, IComment, any>(
    ["updateComment", commentId],
    (comment) => updateComment({ commentId, comment }),
    {
      ...options,
    }
  );
};
