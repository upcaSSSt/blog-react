import type { Route } from "./+types/home";
import { useEffect, useContext, useRef, useState } from 'react';
import { useParams, Link } from 'react-router';
import { CurUserContext } from '../global';
import Post from "../post";
import Autor from '../autor';

export function meta({}: Route.MetaArgs) {
  return [];
}

export default function PostView() {
  const { id: postId } = useParams();
  const { curUser } = useContext(CurUserContext);
  const comment = useRef('');
  const [post, setPost] = useState({});

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3000/api/v1/posts/${postId}`);
      const data = await res.json();
      setPost(data);
    })();
  }, []);

  async function sendComment(e) {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/v1/users/${curUser.id}/posts/${postId}/comments`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment: comment.current.value }),
    });
    const data = await res.json();
    const clone = window.structuredClone(post);
    clone.comments.unshift({ ...data, name: curUser.name });
    setPost(clone);
    comment.current.value = '';
  }

  return (
    <section className="section">
      <Post post={post} />

      <form action="" onSubmit={sendComment}>
        <textarea className="input" placeholder="Комментарий..." ref={comment}></textarea>
        <div className="row">
          <button className="btn">Отправить</button>
          <Link to={`/edit/${postId}`} className="btn">Редактировать пост</Link>
        </div>
      </form>

      {post.comments?.map(c =>
        <div className="post" key={c.id}>
          <Autor id={c.user_id} name={c.name} time={c.time} />
          <p>{ c.body }</p>
        </div>
      )}
    </section>
  );
}
