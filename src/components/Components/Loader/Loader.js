import React from 'react';
import s from './Loader.module.css';
import { Audio } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={s.loaderWrap}>
      <Audio color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;
