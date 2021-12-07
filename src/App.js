import React, { useState } from 'react';

import './App.css';

import CustomersList from "./components/Customerlist";
import TrainingList from "./components/Traininglist";
import Calendar from "./components/Calendar";
import ChartTraining from './components/ChartTraining';


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


function CustomerPage() {
  return (
    <Box sx={{ p: 3 }}>
      <CustomersList />
    </Box>
  )
}

function TrainingPage() {
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

function StatPages() {
  return (
    <Box sx={{ p: 3 }}>
      <ChartTraining/>
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
            <Tab label="Customers" to="/" component={Link} />
            <Tab label="Calendar" to="/calendar" component={Link} />
            <Tab label="Trainings" to="/tranings" component={Link} />
          </Tabs>
        </AppBar>
        <Routes>
          <Route path="/" element={<CustomerPage />} />
          <Route path="/tranings" element={<TrainingPage />}></Route>
          <Route path="/calendar" element={<CalendarPages/>} />
          <Route path="/stat" element={<StatPages/>} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
