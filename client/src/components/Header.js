import Btn from './Btn.js';  
import Connect from './BtnConnect.js';

const navigation = [
  { name: 'New Game', href:'', img:'', classes:' ml-4 ' ,current: false },
  { name: 'Join', href:'', img:'', classes:' ml-4 ' ,current: false },
  { name: 'Tournament', href:'', img:'', classes:' ml-4 ' ,current: false },
]
const connect = { names: ['Connect', 'Logout'], img:'', classes:' absolute right-0 ml-4 ' ,current: true }

export default function Header() {
  return (
    <div className="Header-Child bg-red-200">
      { 
        navigation.map((btn)=>{ 
          return(
            <Btn key={btn.name.toLowerCase()} name={btn.name} href={btn.href} img={btn.img} classes={btn.classes} current={btn.current} />
          );
        })
      }
      <Connect names={connect.names} img={connect.img} classes={connect.classes}/>
    </div>
  );
}