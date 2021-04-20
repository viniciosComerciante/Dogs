import React from "react";
import { COMMENT_POST } from "../../api";
import { ReactComponent as Enviar } from "../../Assets/enviar.svg";
import useFetch from '../../Hooks/useFetch';
import Error from './../Helper/Error';
import styles from './PhotoCommentsForm.module.css';

const PhotoCommentsForm = ({ id, setComments, single}) => {

  
  const {request, error} = useFetch();

  const [comment, setComment] = React.useState("");

  async function handleSubmit(e){
    e.preventDefault();

    const {url, options} = COMMENT_POST(id, {comment});
    const {response, json} = await request(url, options);

    if(response.ok){
        setComment('');
        setComments((comments) => [...comments, json])
    }

  }

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${single? styles.single: ''}`}>
      <textarea
        className={styles.textarea}
        name="comment"
        id="comment"
        value={comment}
        placeholder="Comente..."
        onChange={({ target }) => {
          setComment(target.value);
        }}
      ></textarea>
      <button className={styles.button}>
        <Enviar></Enviar>
      </button>
      <Error error={error}></Error>
    </form>
  );
};

export default PhotoCommentsForm;
