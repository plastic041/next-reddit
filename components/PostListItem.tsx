import type { Post } from "../typings/post";
import { currentPostAtom } from "../stores/post";
import { useAtom } from "jotai";

const PostListItem = ({ title, score, body, author, link }: Post) => {
  const [currentPost, setCurrentPost] = useAtom(currentPostAtom);
  const isCurrent = currentPost?.title === title;

  const onClick = () => {
    setCurrentPost({
      title,
      score,
      body,
      author,
      link,
    });
  };

  return (
    <article
      className={`flex flex-col gap-2 rounded-md p-4 ${
        isCurrent ? "bg-gray-300" : "bg-gray-100"
      }`}
      onClick={onClick}
    >
      <div className="flex flex-row gap-2 justify-between items-center">
        <h2 className="text-gray-900 text-xl" onClick={onClick}>
          <span className="font-light">u/{author} - </span>
          <span className="font-bold">{title}</span>
        </h2>
      </div>

      <p className="line-clamp-4 text-gray-600">{body.trim()}</p>
    </article>
  );
};

export default PostListItem;
