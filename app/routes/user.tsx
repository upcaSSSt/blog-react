import { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import CurUserContext from '../context';
import Card from '../card';
import Post from '../post';

export default function User() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { curUser, setCurUser } = useContext(CurUserContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3000/api/v1/users/${id}`);
      const data = await res.json();
      setUser(data);
    })();
  }, []);

  async function follow(flag: boolean) {
    const res = await fetch(`http://localhost:3000/users/${curUser.id}/follow/${id}/${flag}.json`, { method: 'post' });
    const data = await res.json();
    const clone = window.structuredClone(curUser);
    clone.following_ids = data;
    setCurUser(clone);
    navigate('/');
  }

  return (
    <section className="section">
      <Card id={id} name={user.name} />

      { curUser.name &&
        (curUser.id == id && <Link className="btn" to="/new">Пост</Link>
        || curUser.following_ids.includes(+id) && <button className="btn btn_red"
          onClick={() => follow(false)}>Отписаться</button>
        || <button className="btn" onClick={() => follow(true)}>Подписаться</button>)
      }

      {user.posts?.map(p => <Post post={p} key={p.id} />)}
    </section>
  );
}