import React, { FC, useState } from 'react';

interface Props {
  title: string;
}

export const Test: FC<Props> = ({ title }) => {
  const [wasClicked, setWasClicked] = useState<boolean>(false);

  const handleToggleClick = () => {
    setWasClicked(!wasClicked);
  };

  return (
    <div>
      <h1>{title}</h1>
      <button id='test' type='button' onClick={handleToggleClick}>button</button>
      <div id='test-label' style={{ color: wasClicked ? 'red' : 'blue' }}>
        {wasClicked ? 'Clicked' : 'Not Clicked'}
      </div>
    </div>
  );
};
