import { FormEvent, FormEventHandler, useState } from 'react';
import { Comment } from '../interfaces';

interface Props {
  comments: Comment[];
  addComment: Function;
}

const CommentView = (props: Props) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.addComment(title, content);
        }}
      >
        <input value={title} onChange={(e) => setTitle(e.target.value)} id="title" />
        <input value={content} onChange={(e) => setContent(e.target.value)} type="text" id="content"></input>
        <button type="submit">Add comment</button>
      </form>
      <br />
      {props.comments.map((comment) => (
        <>
        <h1>{comment.title}</h1>
        <p>{comment.content}</p>
        <br></br>
        </>
      ))}
    </div>
  );
};

export default CommentView;
