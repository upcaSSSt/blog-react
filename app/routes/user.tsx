import { useEffect, useContext, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { CurUserContext } from '../global';
import Card from '../card';
import Post from '../post';

export default function User() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { curUser, setCurUser } = useContext(CurUserContext);
  const [user, setUser] = useState({});
  const [chatBtn, setChatBtn] = useState(null);
  const chats = useRef([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3000/api/v1/users/${id}`);
      const data = await res.json();
      setUser(data);

      const resChats = await fetch(`http://localhost:3000/api/v1/users/${curUser.id}/chats`);
      chats.current = await resChats.json();
      chats.current.some(c => {
        console.log(!c.users.some(u => {console.log(u.id, id, u.id == id); return u.id == id;}));
        return !c.name && !c.users.some(u => u.id == id);
      });
      if (chats.current.some(c => !c.name && !c.users.some(u => u.id == id)))
        setChatBtn(<button className="btn" onClick={createChat}>Чат</button>);
    })();
  }, []);

  async function follow(flag: boolean) {
    const res = await fetch(`http://localhost:3000/users/${curUser.id}/follow/${id}/${flag}.json`, { method: 'post' });
    const data = await res.json();
    setCurUser({ ...curUser, following_ids: data });
    navigate('/');
  }

  async function createChat() {
    setChatBtn(null);
    await fetch(`http://localhost:3000/api/v1/users/${curUser.id}/chats`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: null, users_ids: [+id] }),
    });
  }

  return (
    <section className="section">
      <Card id={id} name={user.name} />

      <div className="row">
        { curUser.name &&
          (curUser.id == id && <Link className="btn" to="/new">Пост</Link>
          || curUser.following_ids.includes(+id) && <button className="btn btn_red"
            onClick={() => follow(false)}>Отписаться</button>
          || <button className="btn" onClick={() => follow(true)}>Подписаться</button>)
        }
        {chatBtn}
      </div>

      {user.posts?.map(p => <Post post={p} key={p.id} />)}
    </section>
  );
}