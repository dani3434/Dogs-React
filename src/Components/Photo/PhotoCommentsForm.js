import React from 'react'
import { COMMENT_POST } from '../../api';
import { ReactComponent as Enviar } from '../../Assets/enviar.svg';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import styles from './PhotoCommentsForm.module.css';


const PhotoCommentsForm = ({ id, setComents, single }) => {
  const [comment, setComent] = React.useState('');
  const { request, error } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = COMMENT_POST(id, { comment });
    const { response, json } = await request(url, options);

    if (response.ok) {
      setComent('')
      setComents((coments) => [...coments, json]);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${single ? styles.single : ''}`}>
      <textarea value={comment} onChange={({ target }) => setComent(target.value)} id="comment" name="comment" placeholder='Comente...' className={styles.textarea}></textarea>

      <button className={styles.button}><Enviar /></button>

      <Error error={error} />
    </form>
  )
}

export default PhotoCommentsForm
