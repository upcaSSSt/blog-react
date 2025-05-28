import { Link } from 'react-router';
import Ava from './ava';

export default function Autor({ id, name, time }: { id: number, name: string, time: string }) {
  return (
    <Link className="row" to={`/users/${id}`}>
      <Ava figureClass="ava" id={id} />
      <h4>{ name }</h4>
      <time className="post__time">{ time }</time>
    </Link>
  );
}