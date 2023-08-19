import React, { Component } from 'react';
import './App.css';
import Messages from './components/Messages/Messages';
import Input from './components/Input/Input';
import randomUsername from 'random-username-generator';

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomUsername.generate(),
      color: randomColor(),
    },
    receivedMessagesBuffer: new Set(),
  };

  droneRef = null;

  componentDidMount() {
    this.initScaledrone();
  }

  componentWillUnmount() {
    if (this.droneRef) {
      this.droneRef.close();
    }
  }

  initScaledrone = () => {
    const { member } = this.state;

    this.droneRef = new window.Scaledrone("zezdxqa7wB7NCD8B", {
      data: member,
    });

    this.droneRef.on('open', (error) => {
      if (error) {
        console.error(error);
        return;
      }
      const newMember = { ...member };
      newMember.id = this.droneRef.clientId;
      this.setState({ member: newMember });
    });

    const room = this.droneRef.subscribe("observable-room");
    room.on('data', (data, member) => {
      this.handleReceivedMessage(data, member);
    });
  };

  handleReceivedMessage = (data, member) => {
    const { messages, receivedMessagesBuffer } = this.state;
    const newMessage = { member, text: data };

    if (!receivedMessagesBuffer.has(data)) {
      this.setState({
        messages: [...messages, newMessage],
        receivedMessagesBuffer: new Set(receivedMessagesBuffer).add(data),
      });
    }
  };

  onSendMessage = (message) => {
    if (this.droneRef) {
      this.droneRef.publish({
        room: "observable-room",
        message,
      });
    }
  };

  render() {
    const { messages, member } = this.state;

    return (
      <div className="app">
        <div className="app-header">
          <h1 className='header-text'>Random Chat</h1>
        </div>
        <Messages messages={messages} currentMember={member} />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

export default App;