import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Menu from './components/Menu';
import {Login} from './components/Login';
import {Signup} from './components/Signup';

class App extends Component {
  render() {
    return (
        <div>
        <Header />
        <Menu />
        <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
        </Switch>
        <Footer />
        </div>
    );
  }
}

export default App;
