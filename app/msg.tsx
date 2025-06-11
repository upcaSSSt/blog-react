import Ava from './ava';

export default function Msg({ id, name, body }: { id: number, name: string, body: string }) {
  return (
    <div className="msg">
      <Ava id={id} figureClass="ava" />
      <h3>{ name }</h3>
      <p>{ body }</p>
    </div>
  );
}