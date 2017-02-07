import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
      this.createMessage = this.createMessage.bind(this);
      this.state = {
      currentUser: {name: "Bob"},
      messages: []
    }
  }

componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
  this.socket = new WebSocket("ws://localhost:4000");

}

createMessage (event) {
  if (event.keyCode === 13) {
    console.log(event.target.value);
    const newMessage = {id: 4 , username: this.state.currentUser.name, content: event.target.value}
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
    this.socket.send(JSON.stringify(newMessage));
    event.target.value = "";
  }
}

  render() {
    console.log("Rendering <App/>");
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
        />
      </div>
    );
  }
}
export default App;
