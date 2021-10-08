import React from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import PhotoComments from './PhotoComments';
import styles from './PhotoContent.module.css';
import PhotoDelete from './PhotoDelete';
import Image from '../Helper/Image';

const PhotoContent = ({ data, single }) => {
  const { photo, comments } = data;
  const user = React.useContext(UserContext);

  return (
    <div className={`${styles.photo} ${single ? styles.single : ''}`}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title} />
      </div>

      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {user.data && user.data.username === photo.author ? <PhotoDelete id={photo.id} /> : <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>}

            <span className={styles.visualizacoes}>{photo.acessos}</span>
          </p>

          <h1 className='title'>
            <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>

          <ul className={styles.atributes}>
            <li>{photo.peso} kg</li>
            <li>{photo.idade === '1' ? photo.idade + ' ano' : photo.idade + ' anos'}</li>
          </ul>
        </div>
      </div>

      <PhotoComments id={photo.id} single={single} coments={comments} />
    </div>
  )
}

export default PhotoContent
