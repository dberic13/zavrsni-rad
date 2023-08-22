import React, { useRef, useEffect } from "react";
import './Messages.css'

function Messages({ messages, currentMember }) {
  const messagesRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ul className="messages-list" ref={messagesRef}>
      {messages.map((msg) => renderMessage(msg, currentMember))}
    </ul>
  );
}

function renderMessage(message, currentMember) {
  const { member, text } = message;

  if (!member) {
    return null;
  }

  const { clientData } = member;
  const messageFromMe = member.id === currentMember.id;
  const className = messageFromMe
    ? "messages-message current-member"
    : "messages-message";
  return (
    <li className={className} key={message.id}>
      <span
        className="avatar"
        style={{ backgroundColor: clientData.color }}
      />
      <div className="message-content">
        <div className="username">{clientData.username}</div>
        <div className="text">{text}</div>
      </div>
    </li>
  );
}

export default Messages;