export type PostRaw = {
  subreddit: string;
  title: string;
  selftext: string;
  permalink: string;
  score: number;
  author: string;
  created_utc: number;
};

export type Post = {
  title: string;
  score: number;
  body: string;
  author: string;
  link: string;
  createdAt: Date;
};
