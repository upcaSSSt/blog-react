import { useEffect, useContext, useState, useRef } from 'react';
import type { Chat } from '../types';
import { CurUserContext } from '../global';
import Chat from '../chat';
import Dialog from '../dialog';

export const socket = new WebSocket("ws://localhost:3000/cable");

export default function Chats() {
  const { curUser } = useContext(CurUserContext);
  const [chats, setChats] = useState([]);
  const [msgs, setMsgs] = useState([]);
  const confName = useRef(null);
  const confAva = useRef(null);
  const clickedChatIndex = useRef(null);

  socket.onopen = (e) => {
    socket.send(JSON.stringify({
      command: 'subscribe',
      identifier: JSON.stringify({
        id: curUser.id,
        channel: 'ChatsChannel',
      }),
    }));
  };

  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    console.log(data);
    if (typeof(data.message) === 'object' && data.message.chat_id === chats[clickedChatIndex.current].id)
      setMsgs(window.structuredClone(msgs).concat(data.message));
  };

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3000/api/v1/users/${curUser.id}/chats`);
      const data = await res.json();
      setChats(data);
    })();
  }, []);

  function fetchMsgs(chatId: string, i: number) {
    const clone = window.structuredClone(chats);
    clone[i].n_unread = 0;
    setChats(clone);
    clickedChatIndex.current = i;
    fetch(`http://localhost:3000/api/v1/chats/${chatId}`).then(res => res.json()).then(data => setMsgs(data));
  }

  async function createConf(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append('name', confName.current.value);
    fd.append('users_ids', []);
    fd.append('images[]', confAva.current.files[0]);

    const res = await fetch(`http://localhost:3000/api/v1/users/${curUser.id}/chats`, {
      method: 'post',
      body: fd,
    });
    confName.current.value = '';

    const data = await res.json();
    console.log(data);
    setChats(window.structuredClone(chats).concat(data));
  }

  function chatName(chat: Chat): string {
    if (chat.name)
      return chat.name;
    else
      return chat.users[0].id === curUser.id ? chat.users[1].name : chat.users[0].name;
  }

  return (
    <section className="chats row">
      <div className="chats__list">
        <form className="chats__conf chat" onSubmit={createConf}>
          <input className="input" type="text" placeholder="Название" ref={confName} />
          <input type="file" accept="image/*" ref={confAva} />
          <button className="btn">Создать беседу</button>
        </form>
        {chats?.map((c, i) => <Chat key={c.id} id={1} name={chatName(c)} last={c.last} nUnread={c.n_unread} click={() => fetchMsgs(c.id, i)} />)}
      </div>
      <Dialog clickedChatIndex={clickedChatIndex} chats={chats} setChats={setChats} msgs={msgs} />
    </section>
  );
}