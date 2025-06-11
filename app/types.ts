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

interface Chat {
  id: number;
  name: string;
  last: string;
  n_unread: number;
  created_at: string;
  updated_at: string;
  users: { id: number, name: string }[];
}

interface Msg {
  id: number;
  user_id: number;
  chat_id: number;
  body: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export type { IPost, User, Chat, Msg };