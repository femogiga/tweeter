import React from 'react';
import { dateFormattter } from './../../../utils/dateFormatter';

const FullDate = ({ dateOfReply, createdAt }) => {
  return (
    <p className='card__date font-sm font-poppins' style={{ color: '#BDBDBD' }}>
      {dateFormattter(createdAt || dateOfReply) || '24 August at 20:43'}
    </p>
  );
};

export default FullDate;
