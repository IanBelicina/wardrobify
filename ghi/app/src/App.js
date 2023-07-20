import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesList from './ShoesList';
import { useState, useEffect } from 'react';

function App(props) {


  const [ shoes, setShoes] = useState([]);

  async function getShoes() {
    const response = await fetch('http://localhost:8080/api/shoes/');
    if (response.ok) {
      const { shoes } = await response.json();
      setShoes(shoes);
      console.log(shoes);
    } else {
      console.error('An error occurred fetching the data')
    }
  }

  useEffect(() => {
    getShoes();
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
            {/* <Route path="new" element={<AttendConferenceForm conferences={conferences} getAttendees={getAttendees} />} /> */}
        </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}




export default App;
