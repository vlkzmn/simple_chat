/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';

import './App.scss';

import { Header } from './Header/Header';
import { CreateRoom } from './CreateRoom/CreateRoom';
import { RoomsList } from './RoomsList/RoomsList';
import { SendMessage } from './SendMessage/SendMessage';
import { Messages } from './Messages/Messages';
import { Modal } from './Modal/Modal';
import { socket } from '../utils/webSocket';
import { Room } from '../types/Room';
import { Message } from '../types/Message';
import { getUser } from '../utils/getUser';
import { Loader } from './Loader/Loader';
import { ErrorModal } from './ErrorModal/ErrorModal';

export const App: React.FC = () => {
  const [user, setUser] = useState(getUser());
  const [isModal, setIsModal] = useState(!user);
  const [roomsList, setRoomsList] = useState<Room[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (user) {
      setLoading(true);

      socket.onopen = () => {
        socket.send(JSON.stringify({ action: 'askRoomsList' }));
      };
    }

    socket.onmessage = (event) => {
      const resData = JSON.parse(event.data);

      switch (resData.action) {
        case 'confirmation': {
          setIsModal(false);

          const userData = {
            name: resData.name,
            id: resData.id,
          };

          setUser(userData);

          localStorage.setItem('vlkzmn_chat_user', JSON.stringify(userData));

          socket.send(JSON.stringify({ action: 'askRoomsList' }));

          break;
        }

        case 'roomsList': {
          setRoomsList(resData.rooms);
          setLoading(false);

          break;
        }

        case 'messages': {
          if (resData.messages) {
            setMessages(resData.messages);
          }

          setRoom(resData.room);
          setLoading(false);

          break;
        }

        case 'newMessage': {
          setMessages(current => [...current, resData.message]);

          break;
        }

        case 'error': {
          setErrorMessage(resData.message);
          console.error(resData.error);

          break;
        }

        default:
      }
    };

    socket.onclose = () => {
      setErrorMessage('Connection is break, try reload page');
    };

    socket.onerror = () => {
      setErrorMessage('Error conection, try reload page');
    };

    return () => socket.close();
  }, []);

  return (
    <div className="app">
      {loading && <Loader />}

      {errorMessage && <ErrorModal errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}

      <div className="app__sidebar">
        <CreateRoom setLoading={setLoading} />

        <RoomsList
          roomsList={roomsList}
          selectedRoom={room}
          setLoading={setLoading}
        />
      </div>

      <div className="app__main">
        {room && (
          <>
            <Header room={room} setLoading={setLoading} />
            <Messages messages={messages} user={user} />
            <SendMessage room={room} user={user} />
          </>
        )}
      </div>

      {isModal && <Modal setLoading={setLoading} />}
    </div>
  );
};
