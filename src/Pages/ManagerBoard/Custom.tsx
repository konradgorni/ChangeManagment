import React from 'react';

const Custom = ({ setShowConfirmDeleteModal, props }: any) => {
  const x = props[0];
  const handleClick = () => {
    setShowConfirmDeleteModal(true);
  };

  return (
    <div>
      {/* <h1>{title}</h1> */}
      <button onClick={handleClick} type="submit">
        delete
      </button>
    </div>
  );
};
export default Custom;
