import type { Route } from "./+types/home";
import { useEffect, useContext, useRef, useState } from 'react';
import { Link } from 'react-router';
import { CurUserContext } from '../global';
import Post from '../post';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "blog" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { curUser } = useContext(CurUserContext);
  const search = useRef('');
  const data = useRef('');
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3000/api/v1/posts');
      data.current = await res.json();
      setPosts(data.current.filter(p => curUser.following_ids.includes(p.user_id)));
    })();
  }, []);

  function searchPosts() {
    setPosts(data.current.filter(p => p.body.includes(search.current.value)));
  }

  return (
    <section className="section">
      <div className="row">
        { curUser.name && <Link className="btn" to="/new">Пост</Link> }
        <input className="input input_small" placeholder="Поиск постов..." ref={search} onChange={searchPosts} />
      </div>

      {posts ? posts.map(p => <Post post={p} key={p.id} />) : <p>Загрузка...</p>}
    </section>
  );
}
