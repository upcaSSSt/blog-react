export default function Ava({ figureClass, id }: { figureClass: string, id: number }) {
  return (
    <figure className={figureClass}>
      <img className="ava__img" src={`/${id}.webp`} alt="Ava" />
    </figure>
  );
}