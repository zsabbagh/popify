import { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { Model } from '../interfaces';
import CommentView from '../views/CommentView';
import Loader from '../components/Loader';
import { Comment } from '../interfaces';

interface Props {
  model: Model;
  uri: string;
}

const CommentPresenter = (props: Props) => {
  const [comments, setComments] = useState<Comment[] | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await props.model.getComments(props.uri);
        setComments(response);
      } catch (error) {
        console.error('Error fetching rating:', error);
      }
    };

    fetchComments();
  }, []);

  if (comments === null) {
    return <Loader />;
  }
  const addComment = async(title: string, content: string) => {    
    const response = await props.model.postComment(props.uri, content, title);
    if(response){
      setComments((oldComments) => [...(oldComments || []), response])
    }
  };

  return (
    <div>
      <CommentView comments={comments} addComment={addComment} />
    </div>
  );
};

export default CommentPresenter;
