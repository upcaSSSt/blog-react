import { useEffect } from 'react';
import { Link } from 'react-router';
import type { Dispatch, SetStateAction } from "./+types/root";
import type { User } from './types';
import Ava from './ava';

export default function Header({ curUser, setCurUser }: { curUser: User, setCurUser: Dispatch<SetStateAction<User>> }) {
  return (
    <header className="header">
      <div className="header__container row row_spaced">
        { curUser.name ?
          <><Ava figureClass="ava" id={curUser.id} />
          <Link className="btn btn_red" to="/login" onClick={() => setCurUser({ following_ids: [] })}>Выйти</Link></>
          : <Link className="btn btn_yellow" to="/login">Войти</Link>
        }
      </div>
    </header>
  );
}