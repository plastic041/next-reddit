import { PostRaw } from "../typings/post";

export const getAwardsCount = (post: PostRaw): number => {
  return post.all_awardings.reduce((acc, cur) => acc + cur.count, 0);
};
