export type PostRaw = {
  subreddit: string;
  title: string;
  selftext: string;
  permalink: string;
  score: number;
  author: string;
  created_utc: number;
  all_awardings: {
    icon_url: string;
    count: number;
    name: string;
  }[];
};

export type Post = {
  title: string;
  score: number;
  body: string;
  author: string;
  link: string;
  createdAt: Date;
  awardsCount: number;
};
