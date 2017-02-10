import React, {Component} from 'react';

class Message extends Component {
  render() {
    return ( <div style={this.props.colour} key={this.props.id} className="message">
        <span className="message-username">{this.props.name}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
    );
  }
}
export default Message;
