import Card from './cards/Card';
import './main.css'
import SideNav from "./SideNav";
const Main = () => {
  return (
    <main className='main'>
      <div>
        <SideNav />
        <Card/>
      </div>


    </main>
  );
};

export default Main;
