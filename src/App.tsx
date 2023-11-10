import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import { Home, Drawers, PhotoLibrary, Catalog, Telescope, Camera, Upcoming, Planning, Settings } from './Components'
import './App.css';
import { useRecoilState } from 'recoil';
import weatherState from './State/weather';
import { Chip, Typography } from '@mui/material';
import cameraState from './State/camera';
import BatteryChargingFullOutlinedIcon from '@mui/icons-material/BatteryChargingFullOutlined';
import { CameraLcdItem } from './Components/Camera/Inputs';

const App = () => {
  const [camera, setCamera] = useRecoilState(cameraState);
  const { configuration } = camera;

  const [weather, setWeather] = useRecoilState(weatherState);

  useEffect(() => {
    if (weather.temperature) return;
    const getWeather = async () => {
      // if (weather.temperature) return weather;
      const response = await fetch('http://wttr.in?format=%t+%w+%m+%M+%P+%z+%h+%C');
      const data = await response.text();
      const [temperature, wind, moonPhase, moonday, precipitation, zenith, humidity, condition] = data.split(' ');
      setWeather({ temperature, wind, moonPhase, moonday, precipitation, zenith, humidity, condition });
    }

    getWeather();
  }, []);

  return (
    <React.Fragment>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', padding: 4, borderBottom: 'solid 1px #d4d4d4' }}>
        <Drawers />
        <div style={{ display: 'flex', flex: 2 }} />
        <Chip variant="outlined" color="primary" label={weather.temperature + ' ' + weather.condition + ' ' + weather.moonPhase} />
        <CameraLcdItem>
          <BatteryChargingFullOutlinedIcon fontSize="large" sx={{ rotate: '-90deg', mr: 1 }} />
          <Typography variant='h5' style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>[ 9999 ]</Typography>
        </CameraLcdItem>
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
