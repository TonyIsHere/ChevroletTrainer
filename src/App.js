import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';

import CustomersList from "./components/customerlist";


import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";


function Home() {
  return (<div>Hello


  </div>)
}

function About() {
  return (<div>About</div>)
}

function App() {

  const [value, setValue] = useState(0);
  const handleChangeTab = (event, value) => {
    setValue(value);
  };


  return (
    <div className="App">
      <Router>
        <AppBar position="static">
          <Tabs value={value}
            onChange={handleChangeTab}
            aria-label="nav tabs example"
            indicatorColor="secondary"
            textColor="inherit">
            <Tab label="Page One" to="/" component={Link} />
            <Tab label="Page Two" to="/JRM" component={Link} />
            <Tab label="Page Three" to="/about" component={Link} />
          </Tabs>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<CustomersList />}></Route>
          <Route path="/contact" element={<h1>Contact address</h1>} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
