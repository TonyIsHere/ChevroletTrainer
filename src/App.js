import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';

import CustomersList from "./components/customerlist";
import TrainingList from "./components/traininglist";
import Calendar from "./components/Calendar";


import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";


function Home() {
  return (
    <Box sx={{ p: 3 }}>
      <CustomersList />
    </Box>
  )
}

function About() {
  return (<Box sx={{ p: 3 }}>
    <TrainingList />
  </Box>)
}

function CalendarPages() {
  return (
    <Box sx={{ p: 3 }}>
      <Calendar />
    </Box>
  )
}

function App() {

  const [value, setValue] = useState(0);
  const handleChangeTab = (event, value) => {
    setValue(value);
  };


  return (
    <Box>
      <Router>
        <AppBar position="static">
          <Tabs value={value}
            onChange={handleChangeTab}
            aria-label="nav tabs example"
            indicatorColor="secondary"
            textColor="inherit">
            <Tab label="Page One" to="/" component={Link} />
            <Tab label="Page Two" to="/calendar" component={Link} />
            <Tab label="Page Three" to="/about" component={Link} />
          </Tabs>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<h1>Contact address</h1>} />
          <Route path="/calendar" element={<CalendarPages/>} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
