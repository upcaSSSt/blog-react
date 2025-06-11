import { Link } from 'react-router';
import type { User } from './types';

export default function Footer({ curUser }: User) {
  return (
    <footer className="footer">
      { curUser.name && <nav className="footer__container row row_spaced">
        <Link to="/">Посты</Link>
        <Link to={`/users/${curUser.id}`}>Профиль</Link>
        <Link to="/users">Люди</Link>
        <Link to="/chats">Чаты</Link>
      </nav> }
    </footer>
  );
}