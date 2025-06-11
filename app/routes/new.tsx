import { useContext } from 'react';
import { CurUserContext } from '../global';
import Form from '../form';

export default function New() {
  const { curUser } = useContext(CurUserContext);
  return <>{ curUser.name ?
    <Form url={`users/${curUser.id}/posts`} method="post" /> : <p>Войдите, чтобы создать пост</p>}</>;
}