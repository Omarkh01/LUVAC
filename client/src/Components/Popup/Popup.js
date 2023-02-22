import React from 'react';
import './popup.css';

function Popup(props) {
  return (
    <div className={`popup ${props.isOpen ? 'open' : ''}`} onClick={props.onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>{props.title}</h2>
        <p>{props.message}</p><br/>
        <a href='/login' className='loginLink'>Login</a>
      </div>
    </div>
  );
}

export default Popup;
