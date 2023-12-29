import React from 'react'

const Fullname = ({fullName}) => {
  return <p className='card__fullname bold-6 '>{fullName ||'Peyton Lyons'}</p>;
}

export default Fullname
