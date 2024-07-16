import React from 'react';
import './App.css';
import { Grid } from '@mui/material';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Navbar />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
