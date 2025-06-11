import Ava from './ava';

export default function Chat({ id, name, last, nUnread, click }:
  { noBg: boolean, id: number, name: string, last: string, nUnread: number, click: () => void }) {
  return (
    <div className="chat row" onClick={click}>
      <Ava id={id} figureClass="chat__ava" />
      <h3 className="chat__name">
        {name}
        {nUnread > 0 && <p className="chat__unread">{nUnread}</p>}
        <p className="chat__text">{last}</p>
      </h3>
    </div>
  );
}