import React from 'react';

const SignatureButton = ({ toggleModal }) => (
  <div className="flex justify-center mt-4">
    <button onClick={toggleModal} className="sign-button">
      Sign Document
    </button>
  </div>
);

export default SignatureButton;