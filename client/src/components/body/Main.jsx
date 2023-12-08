import Card from './cards/Card';
import Retweeted from './cards/Retweeted';
import './main.css';
import SideNav from './SideNav';
const Main = () => {
  return (
    <main className='main'>
      <div className='main__container'>
        <SideNav />
        <div className=''>
          <Retweeted />
          <Card />
          <Card />
          <Card/>
        </div>
      </div>
    </main>
  );
};

export default Main;
