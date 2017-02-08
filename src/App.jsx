import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
const uuid = require('node-uuid');

class App extends Component {

  constructor(props) {
    super(props);
    this.createMessage = this.createMessage.bind(this);
    this.createUsername = this.createUsername.bind(this);
    this.state = {
      currentUser: {name: "anonymous"},
      messages: []
    }
  }

componentDidMount() {
  this.socket = new WebSocket("ws://localhost:4000");

  this.socket.onmessage = (event) => {
    const incObj = JSON.parse(event.data);
    const userMess = this.state.messages.concat(incObj);

    this.setState({messages: userMess});
  }
}

createUsername (event) {
  if (event.keyCode === 13) {
    const newUser = {type: "postNotification", currentUser: {name: event.target.value}}
    this.setState({currentUser: {name: event.target.value}});
    this.socket.send(JSON.stringify(newUser));
  }
}

createMessage (event) {
  if (event.keyCode === 13) {
    const newMessage = {type: "postMessage", id: uuid.v4(), username: this.state.currentUser.name, content: event.target.value}
    this.socket.send(JSON.stringify(newMessage));
    event.target.value = "";
  }
}

  render() {
    return (
      <div>
        <nav className="navbar">
         <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList
          messages={this.state.messages}
        />
        <ChatBar
          currentUser={this.state.currentUser.name}
          createMessage={this.createMessage}
          createUsername={this.createUsername}
        />
      </div>
    );
  }
}
export default App;