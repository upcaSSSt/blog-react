import { useEffect, useState } from 'react';
import Card from '../card';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3000/api/v1/users');
      const data = await res.json();
      setUsers(data);
    })();
  }, []);

  return (<section className="section">{users.map(u => (<Card key={u.id} id={u.id} name={u.name} />))}</section>);
}