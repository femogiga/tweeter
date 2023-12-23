import React from 'react'
import Card from './Card';
import Retweeted from './Retweeted';

const CardContainer = () => {
  return (
    <div className='card-parent'>
      <Retweeted />
      {/* {data && data.map((item) => <Card key={item?.id} {...item} />)} */}
      <Card />
      <Card />
      <Card />
    </div>
  );
}

export default CardContainer
