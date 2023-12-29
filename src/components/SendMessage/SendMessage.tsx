import React, { useState, useEffect, useRef } from 'react';

import './SendMessage.scss';
import 'bulma/css/bulma.css';

import { socket } from '../../utils/webSocket';
import { Room } from '../../types/Room';
import { User } from '../../types/User';

type Props = {
  room: Room | null,
  user: User,
};

export const SendMessage: React.FC<Props> = ({ room, user }) => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [room]);

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!text.trim()) {
      inputRef.current?.focus();
      setText('');

      return;
    }

    const message = {
      action: 'newMessage',
      roomId: room?.id,
      author: user.name,
      date: Date.now(),
      text,
    };

    socket.send(JSON.stringify(message));

    setText('');
    inputRef.current?.focus();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <form className="send_message" onSubmit={handleSendMessage}>
      <input
        className="input"
        ref={inputRef}
        placeholder="Message"
        value={text}
        onChange={handleInputChange}
      />

      <button type="submit" className="button">
        Send
      </button>
    </form>
  );
};
