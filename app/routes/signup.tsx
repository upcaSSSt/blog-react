import { useContext, useRef } from 'react';
import { useNavigate, Link } from 'react-router';
import { CurUserContext } from '../global';

export default function Signup() {
  const { setCurUser } = useContext(CurUserContext);
  const navigate = useNavigate();
  const email = useRef('');
  const name = useRef('');
  const pass = useRef('');

  async function signup(e) {
    e.preventDefault();
    await fetch('http://localhost:3000/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: {
        email: email.current.value, name: name.current.value, password: pass.current.value
      } }),
    });
    const res = await fetch('http://localhost:3000/api/v1/users');
    const data = await res.json();
    setCurUser(data.find(u => u.email === email.current.value));
    navigate('/');
  }

  return (
    <>
      <h1 className="title">Sign up</h1>
      <form className="section" onSubmit={signup}>
        <fieldset>
          <label>
            Email<br />
            <input className="input" type="email" ref={email} />
          </label>
        </fieldset>
        <fieldset>
          <label>
            Name<br />
            <input className="input" ref={name} />
          </label>
        </fieldset>
        <fieldset>
          <label>
            Password (6 characters minimum)<br />
            <input className="input" ref={pass} />
          </label>
        </fieldset>

        <fieldset className="row">
          <button className="btn">Sign up</button>
          <Link className="btn" to="/login">Log in</Link>
        </fieldset>
      </form>
    </>
  );
}