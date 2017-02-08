import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.createMessage = this.createMessage.bind(this);
    this.createUsername = this.createUsername.bind(this);

    this.state = {
      currentUser: {name: "anonymous", colour: {}},
      messages: [],
      users: 0
    }
  }

componentDidMount() {
  this.socket = new WebSocket("ws://localhost:4000");

  this.socket.onmessage = (event) => {
    const incObj = JSON.parse(event.data);
    if (incObj.type === "userCountChange") {
      this.setState({users: incObj.userCount});
      return;
    }
    if (incObj.type === "userColour") {
      this.setState({currentUser: {name: this.state.currentUser.name, colour: {color: incObj.colour}}});
      return;
    }
    const userMess = this.state.messages.concat(incObj);
    this.setState({messages: userMess});
  }
}

createUsername (event) {
  if (event.keyCode === 13) {
    const newUser = {type: "postNotification", username: this.state.currentUser.name, currentUser: {name: event.target.value}};
    this.setState({currentUser: {name: event.target.value, colour: this.state.currentUser.colour}});
    this.socket.send(JSON.stringify(newUser));
  }
}

createMessage (event) {
  if (event.keyCode === 13) {
    const newMessage = {type: "postMessage", username: this.state.currentUser.name, content: event.target.value, colour: this.state.currentUser.colour};
    this.socket.send(JSON.stringify(newMessage));
    event.target.value = "";
  }
}

  render() {
    return (
      <div>
        <nav className="navbar">
         <a href="/" className="navbar-brand">Chatty</a>
         <span className="users">{this.state.users} Users online</span>
        </nav>
        <MessageList
          messages={this.state.messages}
          userInfo={this.state.currentUser}
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