import Rooms from './Rooms'


const Home = (props) => {

  const {showAlert} = props

  return (
    <div>
       <Rooms showAlert={showAlert}/>
    </div>
  );
};

export default Home;
