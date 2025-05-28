import { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import CurUserContext from '../context';
import Form from '../form';

export default function Edit() {
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const { curUser } = useContext(CurUserContext);
  const [post, setPost] = useState({});

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3000/api/v1/posts/${postId}`);
      const data = await res.json();
      setPost(data);
    })();
  }, []);

  async function purgeImg(id: number, i: number) {
    await fetch(`http://localhost:3000/api/v1/purge_image/${id}`, { method: 'delete' });
    const clone = window.structuredClone(post);
    clone.images.splice(i, 1);
    setPost(clone);
  }

  async function destroy() {
    await fetch(`http://localhost:3000/api/v1/posts/${postId}`, { method: 'delete' });
    navigate('/');
  }

  return (
    <section className="section">
      { curUser.id === post.user_id ?
        <>
          <div className="post__imgs">
            {post.images?.map((img, i) =>
              <figure className="post__img" key={img.id}>
                <img src={img.url} alt="PostImg" />
                <button className="btn btn_red" key={img.id} onClick={() => purgeImg(img.id, i)}>Удалить</button>
              </figure>
            )}
          </div>
          <Form url={`posts/${postId}`} method="put" body={post.body} />
          <button className="btn btn_red" onClick={destroy}>Удалить</button>
        </>
      :
        <>
          <p>Вы не являетесь создателем</p>
          <Link className="btn" to={`/posts/${postId}`}>Назад</Link>
        </>
      }
    </section>
  );
}