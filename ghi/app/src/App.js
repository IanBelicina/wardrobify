import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesList from './ShoesList';
import { useState, useEffect } from 'react';
import ShoeForm from './ShoeForm';
import DeleteShoe from './DeleteShoe';
import HatsList from './HatsList';
import HatForm from './HatForm';
import HatCard from './HatCard';

function App(props) {
  const [ locations, setLocations] = useState([]);
  const [ hats, setHats] = useState([]);
  const [ shoes, setShoes] = useState([]);
  const [ bins, setBins] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');


  async function getShoes() {
    const response = await fetch('http://localhost:8080/api/shoes/');
    if (response.ok) {
      const { shoes } = await response.json();
      setShoes(shoes);
      // console.log(shoes);
    } else {
      console.error('An error occurred fetching the data')
    }
  }

  async function getBins(){
    const response = await fetch('http://localhost:8100/api/bins/');
    if (response.ok){

      const data = await response.json();
      // console.log(data, "these are bins");
      setBins(data.bins);
    }
  }
async function getHats() {
    const response = await fetch('http://localhost:8090/api/hats/');
    if (response.ok) {
        const { hats } = await response.json();
        setHats(hats);
        setDeleteMessage('Hat deleted');
        setTimeout(() => setDeleteMessage(''), 2000);
    } else {
        console.error('An error occurred fetching the data');
    }
}

  async function getLocations() {
    const response = await fetch('http://localhost:8100/api/locations/');
    if (response.ok) {
      const data = await response.json();
      setLocations(data.locations);
      console.log(data.locations);
    } else {
      console.error('An error occurred fetching the data');
    }
  }
  useEffect(() => {
    getShoes();
    getBins();
    getHats();
    getLocations();
  }, [])

  if (shoes === undefined){
    return null
  }
  if (props.hats === undefined){
    return null
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="shoes">
            <Route index element={<ShoesList shoes={shoes} />} />
          </Route>
          <Route path="hats/new" element={<HatForm locations={locations} getHats={getHats} />} />
          <Route path="hats" element={<HatsList hats={hats} deleteMessage={deleteMessage} />} />
          <Route path="hats/:id" element={<HatCard hats={hats} onDelete={getHats} />} />
          <Route path="shoes/new" element={<ShoeForm bins={bins} getShoes={getShoes} />} />
          <Route path="shoes/delete" element={<DeleteShoe bins={bins} shoes={shoes} getShoes={getShoes}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}




export default App;
