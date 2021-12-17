export type PostRaw = {
  subreddit: string;
  title: string;
  selftext: string;
  permalink: string;
  score: number;
  author: string;
};

export type Post = {
  title: string;
  score: number;
  body: string;
  author: string;
  link: string;
};
