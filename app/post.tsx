import { Link } from 'react-router';
import type { IPost } from './types';
import Autor from './autor';

export default function Post({ post }: IPost) {
  return (
    <div className="post">
      <Autor id={post.user_id} name={post.name} time={post.time} />
      <Link className="post__body" to={`/posts/${post.id}`}>
        { post.body }
      </Link>
      <div className="post__imgs">
        {post.images?.map(img => <figure className="post__img" key={img.id}><img src={`${img.url}`} alt="PostImg" /></figure>)}
      </div>
    </div>
  );
}