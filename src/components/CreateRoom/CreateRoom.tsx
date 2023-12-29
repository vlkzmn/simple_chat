import React, { useState, useRef } from 'react';

import './CreateRoom.scss';
import 'bulma/css/bulma.css';

import { socket } from '../../utils/webSocket';
import { getUser } from '../../utils/getUser';

type Props = {
  setLoading: (value: boolean) => void,
};

export const CreateRoom: React.FC<Props> = ({ setLoading }) => {
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCreateRoom = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitle('');
      inputRef.current?.focus();

      return;
    }

    const userId = getUser().id;
    const message = {
      action: 'createRoom',
      title,
      userId,
    };

    setLoading(true);

    socket.send(JSON.stringify(message));

    setTitle('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <form className="create" onSubmit={handleCreateRoom}>
      <input
        ref={inputRef}
        className="input"
        placeholder="Enter new room name"
        value={title}
        onChange={handleInputChange}
      />

      <button
        type="submit"
        className="button"
      >
        Create New Room
      </button>
    </form>
  );
};
