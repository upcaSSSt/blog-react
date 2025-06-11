import { useRef } from 'react';
import { useNavigate } from 'react-router';

export default function Form({ url, method, body = '' }: { url: string, method: string, body: string }) {
  const navigate = useNavigate();
  const bodyRef = useRef(body);
  const imgs = useRef(null);

  async function send(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append('body', bodyRef.current.value);
    for (const file of imgs.current.files)
      fd.append('images[]', file);

    await fetch(`http://localhost:3000/api/v1/${url}`, {
      method,
      body: fd,
    });
    navigate('/');
  }

  return (
    <form className="section" action="" onSubmit={send}>
      <fieldset>
        <textarea className="input" ref={bodyRef} defaultValue={body}></textarea>
      </fieldset>
      <fieldset>
        <input type="file" accept="image/*" multiple="true" ref={imgs} />
      </fieldset>
      <button className="btn">Готово</button>
    </form>
  );
}