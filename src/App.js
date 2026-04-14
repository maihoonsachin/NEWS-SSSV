import './App.css';

import React, {Component} from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

import {
  BrowserRouter,
  Routes,
  Route,
  Link 
} from "react-router-dom";

// let router = createBrowserRouter([
//   {
//     path: "/",
//     Component: Root,
//     loader: loadRootData,
//   },
// ]);


export default class App extends Component{
  pageSize=20;
  render(){
    return (
      <div>
        <BrowserRouter> 
          <NavBar/>
          <Routes>
            <Route path="/" element={<News key="general" pageSize={this.pageSize} country="us" category="general"/>}/>
            <Route path="/business" element={<News key="business" pageSize={this.pageSize} country="us" category="business"/>}/>
            <Route path="/entertainment" element={<News key="entertainment" pageSize={this.pageSize} country="us" category="entertainment"/>}/>
            {/* <Route path="/general" element={<News key="general" pageSize={this.pageSize} country="us" category="general"/>}/> */}
            <Route path="/health" element={<News key="health" pageSize={this.pageSize} country="us" category="health"/>}/>
            <Route path="/science" element={<News key="science" pageSize={this.pageSize} country="us" category="science"/>}/>
            <Route path="/sports" element={<News key="sports" pageSize={this.pageSize} country="us" category="sports"/>}/>
            <Route path="/technology" element={<News key="technology" pageSize={this.pageSize} country="us" category="technology"/>}/> 

          </Routes> 
        </BrowserRouter>
        
      </div>
    )
  }

}