import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesList from './ShoesList';
import { useState, useEffect } from 'react';
import ShoeForm from './ShoeForm';
import DeleteShoe from './DeleteShoe';

function App(props) {


  const [ shoes, setShoes] = useState([]);
  const [ bins, setBins] = useState([]);

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
      console.log(data, "these are bins");
      setBins(data.bins);
    }
  }

  useEffect(() => {
    getShoes();
    getBins();
  }, [])

  if (shoes === undefined){
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
          <Route path="shoes/new" element={<ShoeForm bins={bins} getShoes={getShoes} />} />
          <Route path="shoes/delete" element={<DeleteShoe bins={bins} shoes={shoes} getShoes={getShoes}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}




export default App;
