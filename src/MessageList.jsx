import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
          {this.props.messages.map((message) => {
            if (message.type === "incomingMessage") {
              console.log("message received")
              return (
                <Message colour={message.colour} key={message.id} name={message.username} content={message.content}/>
              );
            } else {
              return (
                <div key={message.id} className="message system">
                  {message.content}
                </div>
              );
            }
          }
          )}
      </main>
    );
  }
}
export default MessageList;
