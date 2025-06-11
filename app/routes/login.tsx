import type { Route } from "./+types/home";
import { useContext, useRef } from 'react';
import { useNavigate, Link } from 'react-router';
import { CurUserContext } from '../global';

export function meta({}: Route.MetaArgs) {
  return [];
}

export default function Login() {
  const { setCurUser } = useContext(CurUserContext);
  const navigate = useNavigate();
  const email = useRef('');

  async function login(e) {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/v1/users');
    const data = await res.json();
    setCurUser(data.find(u => u.email === email.current.value));
    navigate('/');
  }

  return (
    <>
      <h1 className="title">Log in</h1>
      <form className="section" onSubmit={login}>
        <fieldset>
          <label>
            Email<br />
            <input className="input" type="email" ref={email} />
          </label>
        </fieldset>
        <fieldset>
          <label>
            Password<br />
            <input className="input" />
          </label>
        </fieldset>

        <fieldset className="row">
          <button className="btn">Log in</button>
          <Link className="btn" to="/signup">Sign up</Link>
        </fieldset>
      </form>
    </>
  );
}
