import Card from './cards/Card';
import Retweeted from './cards/Retweeted';
import './main.css';
import SideNav from './SideNav';
const Main = () => {
  return (
    <main className='main'>
      <div>
        <SideNav />
        <Retweeted />
        <Card />
      </div>
    </main>
  );
};

export default Main;
