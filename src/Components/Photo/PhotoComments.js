import React from 'react'
import { UserContext } from '../../UserContext';
import PhotoCommentsForm from './PhotoCommentsForm';
import styles from './PhotoComments.module.css';

const PhotoComments = (props) => {
  const { login } = React.useContext(UserContext)
  const [coments, setComents] = React.useState(() => props.coments)
  const comentSection = React.useRef(null);

  React.useEffect(() => {
    comentSection.current.scrollTop = comentSection.current.scrollHeight
  }, [coments])

  return (
    <React.Fragment>
      <ul ref={comentSection} className={`${styles.comments} ${props.single ? styles.single : ''}`}>
        {coments.map(coment => <li key={coment.comment_ID}>
          <b>{coment.comment_author}: </b>
          <span>{coment.comment_content}</span>
        </li>)}
      </ul>
      {login && <PhotoCommentsForm id={props.id} single={props.single} setComents={setComents} />}
    </React.Fragment>
  )
}

export default PhotoComments
