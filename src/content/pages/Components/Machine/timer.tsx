import { Button, Typography, Box, Grid, Card } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { v4 as uuidv4 } from 'uuid';

const Cronometro = () => {
  const [running, setRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const savedElapsedTime = parseFloat(localStorage.getItem('elapsedTime')) || 0;
    setElapsedTime(savedElapsedTime);

    // Recuperar el estado del cronómetro (iniciar o detener) al cargar la página
    const isRunning = localStorage.getItem('isRunning') === 'true';

    if (isRunning) {
      setRunning(true);
      setStartTime(Date.now() - savedElapsedTime);
    } else {
      setRunning(false);
      setStartTime(0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('elapsedTime', elapsedTime.toString());
    localStorage.setItem('isRunning', running.toString());
  }, [elapsedTime, running]);

  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000); // Actualiza el tiempo cada segundo

      return () => clearInterval(interval);
    }
  }, [running, startTime]);
  
  const startStop = () => {
    if (running) {
      setRunning(false);
      // No necesitas sumar el tiempo aquí, simplemente detén el cronómetro.
    } else {
      setRunning(true);
      setStartTime(Date.now() - elapsedTime); // Restablece el tiempo de inicio al tiempo actual menos el tiempo transcurrido.
    }
  };

  const reset = () => {
    setRunning(false);
    setElapsedTime(0);
    setStartTime(0);
  };

  return (
    <>
      <Box p={1} display="flex" alignItems="center">
        <Typography sx={{ margin: 1}} variant="h3" gutterBottom>
          Tiempo transcurrido
        </Typography>
      </Box>
      <Box p={1} display="flex" alignItems="center">
        <Typography sx={{ margin: 1}} variant="h2" gutterBottom>
          {formatTime(elapsedTime)}
        </Typography>
      </Box>
      <Box p={1} display="flex" alignItems="center">
        <Button sx={{ margin: 1}} variant='contained' onClick={startStop}>
          {running ? 'Detener' : 'Iniciar'}
        </Button>
        <Button sx={{ margin: 1}} variant='contained' onClick={reset}>
          Reiniciar
        </Button>
      </Box>
    </>
  );
};

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${pad(minutes)}:${pad(seconds)}`;
}

function pad(value) {
  return value < 10 ? `0${value}` : value;
}

export default Cronometro;
