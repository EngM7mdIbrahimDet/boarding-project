import { IComment } from "/imports/types/models/Comment";
import callAsync from "/imports/utils/call-async";

export const addComment = async ({ articleId, comment }: { articleId: string; comment: IComment }) => {
    return await callAsync("comments.post", { articleId, comment });
}

export const removeComment = async ({ commentId }: { commentId: string }) => {
    return await callAsync("comments.remove", { commentId });
}

export const updateComment = async ({ commentId, comment }: { commentId: string; comment: IComment }) => {
    return await callAsync("comments.update", { commentId, comment });
}