import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Home, Drawers, PhotoLibrary, Catalog, Telescope, Camera, Upcoming, Planning, Settings } from './Components'
import './App.css';

const App = () => {

  return (
    <React.Fragment>
      <header>
        <Drawers />
      </header>
      <main>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/telescope" Component={Telescope} />
          <Route path="/camera" Component={Camera} />
          <Route path="/photos" Component={PhotoLibrary} />
          <Route path="/catalog" Component={Catalog} />
          <Route path="/upcoming" Component={Upcoming} />
          <Route path="/planning" Component={Planning} />
          <Route path="/settings" Component={Settings} />
        </Routes>
      </main>
      <footer>

      </footer>
    </React.Fragment>
  );
}

export default App;
