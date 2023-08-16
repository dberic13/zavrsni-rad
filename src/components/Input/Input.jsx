import React, { Component } from "react";

class Input extends Component {
  state = {
    messageText: "",
  };

  handleTextChange = (e) => {
    this.setState({ messageText: e.target.value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { messageText } = this.state;

    if (messageText.trim() !== "") {
      this.props.onSendMessage(messageText);
      this.setState({ messageText: "" });
    }
  };

  render() {
    const { messageText } = this.state;

    return (
      <div className="Input">
        <form onSubmit={this.handleFormSubmit}>
          <input
            onChange={this.handleTextChange}
            value={messageText}
            type="text"
            placeholder="Enter message and press ENTER or click SEND"
            autoFocus
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default Input;
