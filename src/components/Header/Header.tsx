import React, {
  useEffect,
  useState,
  useRef,
} from 'react';

import './Header.scss';
import 'bulma/css/bulma.css';

import { Room } from '../../types/Room';
import { getUser } from '../../utils/getUser';
import { socket } from '../../utils/webSocket';

type Props = {
  room: Room | null,
  setLoading: (value: boolean) => void,
};

export const Header: React.FC<Props> = ({ room, setLoading }) => {
  const userId = getUser().id;
  const [isRename, setIsRename] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (room?.title) {
      setTitle(room?.title);
    }

    setIsDelete(false);
    setIsRename(false);
    setNewTitle('');
  }, [room]);

  const handlerDeleteRoom = () => {
    const message = {
      action: 'deleteRoom',
      roomId: room?.id,
    };

    setLoading(true);

    socket.send(JSON.stringify(message));

    setIsDelete(false);
  };

  const handlerRenameRoom = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTitle.trim()) {
      inputRef.current?.focus();
      setNewTitle('');

      return;
    }

    const message = {
      action: 'renameRoom',
      roomId: room?.id,
      newTitle,
    };

    setLoading(true);

    socket.send(JSON.stringify(message));

    setIsRename(false);
    setNewTitle('');
  };

  const handlerCancelRenameRoom = () => {
    setIsRename(false);
    setNewTitle('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleOpenRenameForm = async () => {
    await setIsRename(true);
    inputRef.current?.focus();
  };

  return (
    <div className="header">
      <h1 className="header__title">{title}</h1>

      {userId === room?.author && (
        <div className="header__buttons">

          {isRename && (
            <>
              <form className="header__form" onSubmit={handlerRenameRoom}>
                <input
                  ref={inputRef}
                  type="text"
                  className="input"
                  placeholder="Enter new name"
                  value={newTitle}
                  onChange={handleInputChange}
                />

                <button
                  type="submit"
                  className="button"
                >
                  Confirm
                </button>
              </form>

              <button
                type="button"
                className="button"
                onClick={handlerCancelRenameRoom}
              >
                Cancel
              </button>
            </>
          )}

          {isDelete && (
            <>
              <div className="header__buttons--danger">
                Are you sure?
              </div>

              <button
                type="button"
                className="button"
                onClick={handlerDeleteRoom}
              >
                Confirm Delete
              </button>

              <button
                type="button"
                className="button"
                onClick={() => setIsDelete(false)}
              >
                Cancel
              </button>
            </>
          )}

          {!isRename && !isDelete && (
            <>
              <button
                type="button"
                className="button"
                onClick={handleOpenRenameForm}
              >
                Rename Room
              </button>

              <button
                type="button"
                className="button"
                onClick={() => setIsDelete(true)}
              >
                Delete Room
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
