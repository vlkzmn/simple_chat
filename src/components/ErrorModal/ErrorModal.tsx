import React from 'react';

import './ErrorModal.scss';
import 'bulma/css/bulma.css';

type Props = {
  setErrorMessage: (value: string) => void,
  errorMessage: string,
};

export const ErrorModal: React.FC<Props> = ({ setErrorMessage, errorMessage }) => {
  // const [name, setName] = useState('');
  // const inputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   inputRef.current?.focus();
  // }, []);

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   if (!name.trim()) {
  //     inputRef.current?.focus();
  //     setName('');

  //     return;
  //   }

  //   const message = {
  //     action: 'registration',
  //     name: name.trim(),
  //   };

  //   setLoading(true);
  //   socket.send(JSON.stringify(message));
  // };

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setName(event.target.value);
  // };

  return (
    <div className="modal is-active">
      <div className="modal-background" />

      <div className="modal-content">
        <div className="box box-modal">
          <h1 className="box-title">
            Error!
          </h1>

          <p className="box-text">
            {errorMessage}
          </p>

          <button
            type="button"
            className="button is-danger"
            onClick={() => setErrorMessage('')}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
