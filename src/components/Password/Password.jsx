import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { sendPassword } from './SendPassword.js';

export default function Password() {
  let { mail } = useParams()
  const navigate = useNavigate();

  function checkPassword(e) {
    if (document.getElementById("password").value !== document.getElementById("password1").value) {
      alert("No match passwords, please check");
      return;
    }
    let newPass = (document.getElementById("password").value)
    sendPassword(mail, newPass);
  }


  return (
    <div className="grid justify-items-center">
    <div className='grid justify-items-center border-solid border-2 border-accent p-2 w-[300px] rounded-lg ml-16 mb-2'>
      <div className="tooltip tooltip-right tooltip-warning w-full max-w-xs" data-tip="required">
        <input className="input input-bordered input-secondary w-full max-w-xs mt-4"
          type="password" placeholder='New password' id="password"
        />
      </div>
      <div className="tooltip tooltip-right tooltip-warning w-full max-w-xs" data-tip="required">
        <input className="input input-bordered input-secondary w-full max-w-xs mt-4"
          type="password" placeholder='Repeat new password' id="password1"
        />
      </div>
      <br />
      <button className="btn btn-secondary w-3/3 mb-1 mt-4" onClick={checkPassword}>
        Change Password
      </button>
    </div>
    </div>
  );
};