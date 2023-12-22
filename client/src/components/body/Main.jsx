import { useTweetDataByAuthorId } from '../../api/tweetData';
import Card from './cards/Card';
import Retweeted from './cards/Retweeted';
import './main.css';
import SideNav from './SideNav';
const Main = () => {

  const { isPending, error, data } = useTweetDataByAuthorId(1)
  console.log(data)
  return (
    <main className='main'>
      <div className='main__container'>
        <SideNav />
        <div className=''>
          <Retweeted />
          {
            data && data.map((item) => <Card key={item?.id } {...item} />)
          }
          <Card />
          <Card />
          <Card/>
        </div>
      </div>
    </main>
  );
};

export default Main;
