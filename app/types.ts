interface IPost {
  id: number;
  user_id: number;
  name: string;
  body: string;
  created_at: string;
  updated_at: string;
  time: string;
  images: { id: number, url: string }[];
}

interface User {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
  name: string;
  following_ids: number[],
  posts: IPost[];
}

export type { IPost, User };