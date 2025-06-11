import { useEffect, useContext, useState, useRef } from 'react';
import type { Dispatch, SetStateAction, RefObject } from "./+types/root";
import type { Chat, Msg } from './types';
import { CurUserContext } from './global';
import Msg from './msg';

export default function Dialog({ clickedChatIndex, chats, setChats, msgs }:
  { clickedChatIndex: RefObject<number>, chats: Chat[], setChats: Dispatch<SetStateAction<Chat>>, msgs: Msg[] }) {
  const { curUser } = useContext(CurUserContext);
  const [users, setUsers] = useState([]);
  const newMsg = useRef(null);

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3000/api/v1/users');
      const data = await res.json();
      setUsers(data);
    })();
  }, []);

  async function send(e) {
    e.preventDefault();
    await fetch(`http://localhost:3000/api/v1/users/${curUser.id}/chats/${chats[clickedChatIndex.current].id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ body: newMsg.current.value }),
    });
    newMsg.current.value = '';
  }

  async function editUsers(e) {
    await fetch(`http://localhost:3000/api/v1/chats/${chats[clickedChatIndex.current].id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: users[e.target.value].id }),
    });
    const clone = window.structuredClone(chats);
    clone[clickedChatIndex.current].users.push({ id: users[e.target.value].id, name: users[e.target.value].name });
    setChats(clone);
  }

  return (
    <div className="chats__dialog dialog">
      { chats[clickedChatIndex.current] && <div className="dialog__header row">
        <select className="dialog__users" defaultValue="default">
          <option value="default" disabled hidden>Список пользователей</option>
          {chats[clickedChatIndex.current]?.users.map((u, i) => <option key={i} disabled>{u.name}</option>)}
        </select>
        { chats[clickedChatIndex.current].name && <select defaultValue="default" onChange={editUsers}>
          <option value="default" disabled hidden>Добавить пользователя</option>
          {users?.map((u, i) => <option key={u.id} value={i}>{u.name}</option>)}
        </select>}
      </div>}
      <div className="dialog__msgs">
        {msgs?.map(m => <Msg key={m.id} id={m.user_id} name={m.name} body={m.body} />)}
      </div>
      { chats[clickedChatIndex.current] && <form className="dialog__form row" onSubmit={send} >
        <input ref={newMsg} type="text" placeholder="Сообщение..." />
        <button type="submit" className="btn">Отправить</button>
      </form>}
    </div>
  );
}