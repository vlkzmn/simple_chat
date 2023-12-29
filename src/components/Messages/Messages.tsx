import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { format } from 'date-fns';

import './Messages.scss';
import 'bulma/css/bulma.css';

import { Message } from '../../types/Message';
import { User } from '../../types/User';

type Props = {
  messages: Message[],
  user: User,
};

export const Messages: React.FC<Props> = ({ messages, user }) => {
  const scrollableBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollableBlockRef.current) {
      scrollableBlockRef.current.scrollIntoView({ block: 'end' });
    }
  }, [messages]);

  return (
    <div className="messages">
      <div className="messages__content">
        {messages.map(message => {
          const dateData = new Date(message.date);
          const date = format(dateData, 'dd-MM-yyyy HH:mm');

          return (
            <div
              key={message.date}
              className={
                classNames(
                  'box messages__box',
                  { messages__client: message.author === user.name },
                )
              }
            >
              <div className="messages__name">
                {message.author}
              </div>

              {message.text}

              <div className="messages__time">
                {date}
              </div>
            </div>
          );
        })}
      </div>

      <div id="box" ref={scrollableBlockRef} />
    </div>
  );
};
