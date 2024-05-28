export type Subreddit = {
	data: SubredditData;
};

type SubredditData = {
	children: Child[];
};

type Child = {
	data: Post;
};

export type Post = {
	subreddit: string;
	selftext: string;
	author: string;
	title: string;
	score: number;
	created_utc: number;
	id: string;
	url: string;
};
