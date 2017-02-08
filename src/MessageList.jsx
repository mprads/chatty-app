import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        <div className="message-system">
          <Message
          messages={this.props.messages}
          />
        </div>
      </main>
    );
  }
}
export default MessageList;
