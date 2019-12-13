import React from "react";
import { Comment as CommentUI } from "semantic-ui-react";

const Comment = props =>
  <CommentUI>
    <CommentUI.Avatar as="a" src={props.comment.commenter.avatar} />
    <CommentUI.Content>
      <CommentUI.Author>
        {props.comment.commenter.email}
      </CommentUI.Author>
      <CommentUI.Metadata>
        <div>
          {props.comment.created_at}
        </div>
      </CommentUI.Metadata>
      <CommentUI.Text>
        {props.comment.body}
      </CommentUI.Text>
    </CommentUI.Content>
  </CommentUI>;

export default Comment;
