import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
          <Message
          messages={this.props.messages}
          userInfo={this.props.userInfo}
          />
      </main>
    );
  }
}
export default MessageList;
