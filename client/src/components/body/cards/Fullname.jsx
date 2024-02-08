import React from 'react'

const Fullname = ({fullName}) => {
  return <p className='card__fullname bold-6 font-poppins '>{fullName ||'Peyton Lyons'}</p>;
}

export default Fullname
