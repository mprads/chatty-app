import React, {Component} from 'react';

class Message extends Component {
  render() {
    const input = this.props.messages.map((message) =>
      <div key={message.id} className="message">
        <span className="message-username">{message.username}</span>
        <span className="message-content">{message.content}</span>
      </div>
    );
    return (
      <div>{input}</div>
    );
  }
}
export default Message;
