import { useEffect, useRef } from 'react';
import useHttp from '../../hooks/use-http';
import {addComment} from '../../lib/api'
import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const {sendRequest,status,error} = useHttp(addComment,true)
  
  
  const {onAddedComment} = props
  useEffect(()=>{
    if(status === 'completed' && !error){
      onAddedComment();
    }
  },[onAddedComment,status,error])

  const submitFormHandler = (event) => {
    event.preventDefault();
    const commentText = commentTextRef.current.value
    sendRequest({commentData:{text:commentText},quoteId:props.quoteId});
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
