import { FormEvent, FormEventHandler, useState } from 'react';
import { Comment } from '../interfaces';
import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import Loader from './LoaderView';
import { Link } from 'react-router-dom';

interface Props {
  comments: Comment[] | null;
  onAddComment: Function;
}

const CommentView = (props: Props) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  return (
    <Paper elevation={3} style={{ maxWidth: '400px', padding: '20px', margin: '0px auto' }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.onAddComment(title, content);
        }}
      >
        <TextField
          fullWidth
          required
          value={title}
          label="title"
          onChange={(e) => setTitle(e.target.value)}
        ></TextField>
        <Divider style={{ height: '10px' }} variant="fullWidth" />
        <TextField
          fullWidth
          required
          multiline
          rows={3}
          value={content}
          label="text"
          onChange={(e) => setContent(e.target.value)}
        ></TextField>
        <div style={{ width: '100%', margin: '10px 0px', textAlign: 'center' }}>
          <Button variant="contained" type="submit">
            Add comment
          </Button>
        </div>
      </form>
      <br />
      {props.comments ? (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {props.comments.map((comment) => (
            <div key={comment.timestamp.toString()}>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="profile image" src={comment.user_image} />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.title}
                  secondary={
                    <React.Fragment>
                      {comment.content}
                      <div>
                        <Link  to={`/user/${comment.user_id}`}>{`${comment.user_name}, `}</Link>
                        {formatDistanceToNow(comment.timestamp.toDate(), { addSuffix: true })}
                      </div>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </div>
          ))}
        </List>
      ) : (
        <Loader />
      )}
    </Paper>
  );
};

export default CommentView;
