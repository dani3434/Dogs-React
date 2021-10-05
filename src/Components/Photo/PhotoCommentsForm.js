import React from 'react'
import { COMMENT_POST } from '../../api';
import {ReactComponent as Enviar} from '../../Assets/enviar.svg';
import useFetch from '../../Hooks/useFetch';


const PhotoCommentsForm = ({id}) => {
  const [coment,setComent] = React.useState('');
  const {request,error} = useFetch();

  async function handleSubmit(event){
    event.preventDefault();

    const {url,options} = COMMENT_POST(id,{coment});
    await request(url,options);
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={coment} onChange={({target}) => setComent(target.value)} id="comment" name="comment" placeholder='Comente...'></textarea>
      <button><Enviar /></button>
    </form>
  )
}

export default PhotoCommentsForm
