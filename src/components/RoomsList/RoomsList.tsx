import React from 'react';
import classNames from 'classnames';

import './RoomsList.scss';
import 'bulma/css/bulma.css';

import { Room } from '../../types/Room';
import { socket } from '../../utils/webSocket';

type Props = {
  roomsList: Room[],
  selectedRoom: Room | null,
  setLoading: (value: boolean) => void,
};

export const RoomsList: React.FC<Props> = ({ roomsList, selectedRoom, setLoading }) => {
  const handlerSetRoom = (room: Room) => {
    const message = {
      action: 'chooseRoom',
      id: room.id,
    };

    setLoading(true);

    socket.send(JSON.stringify(message));
  };

  return (
    <div className="rooms_list">
      {roomsList.map(room => {
        return (
          <button
            key={room.id}
            type="button"
            className={classNames(
              'button is-white rooms_list__button',
              { 'is-info': room.id === selectedRoom?.id },
            )}
            onClick={() => handlerSetRoom(room)}
          >
            {room.title}
          </button>
        );
      })}
    </div>
  );
};
