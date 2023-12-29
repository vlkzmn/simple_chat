import React from 'react';

import './Loader.scss';
import 'bulma/css/bulma.css';

export const Loader: React.FC = () => {
  return (
    <div className="modal is-active">
      <div className="loader" />
    </div>
  );
};
