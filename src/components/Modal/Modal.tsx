import React, { useState, useRef, useEffect } from 'react';

import './Modal.scss';
import 'bulma/css/bulma.css';

import { socket } from '../../utils/webSocket';

type Props = {
  setLoading: (value: boolean) => void,
};

export const Modal: React.FC<Props> = ({ setLoading }) => {
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      inputRef.current?.focus();
      setName('');

      return;
    }

    const message = {
      action: 'registration',
      name: name.trim(),
    };

    setLoading(true);
    socket.send(JSON.stringify(message));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" />

      <div className="modal-content">
        <div className="box box-modal">
          <h1 className="box-title">
            Welcome to Chat!
          </h1>

          <p className="box-text">
            For join enter yor name
          </p>

          <form className="field box-field" onSubmit={handleSubmit}>
            <div className="control">
              <input
                ref={inputRef}
                className="input"
                typeof="text"
                placeholder="Your name"
                value={name}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="button is-success">
              Join
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
