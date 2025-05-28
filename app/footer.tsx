import { Link } from 'react-router';

export default function Footer({ curUser }) {
  return (
    <footer className="footer">
      { curUser.name && <nav className="footer__container row row_spaced">
        <Link to="/">Посты</Link>
        <Link to={`/users/${curUser.id}`}>Профиль</Link>
        <Link to="/users">Люди</Link>
      </nav> }
    </footer>
  );
}