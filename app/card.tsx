import { Link } from 'react-router';
import Ava from './ava';

export default function Card({ id, name }: { id: number, name: string }) {
  return (
    <Link className="user-card row" to={`/users/${id}`}>
      <Ava figureClass="user-card__ava" id={id} />
      <h3 className="user-card__name">
        { name }
      </h3>
    </Link>
  );
}