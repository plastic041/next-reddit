import type { Post } from "../typings/post";
import { currentPostAtom } from "../stores/post";
import { useAtom } from "jotai";

const PostListItem = ({ post }: { post: Post }) => {
  const [currentPost, setCurrentPost] = useAtom(currentPostAtom);
  const isCurrent = currentPost?.title === post.title;

  const onClick = () => {
    setCurrentPost(post);
  };

  return (
    <article
      className={`flex flex-col gap-2 rounded-md p-4 transition ${
        isCurrent ? "bg-gray-300" : "bg-gray-100"
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-gray-900 text-lg font-bold">{post.title}</h2>
        <p className="line-clamp-2 text-gray-600">{post.body.trim()}</p>
      </div>
      <div className="flex justify-end text-sm gap-2">
        <span className="text-yellow-600">{post.score}⬆️</span>
        <span className="text-blue-600">{post.awardsCount}🏆</span>
      </div>
    </article>
  );
};

export default PostListItem;
