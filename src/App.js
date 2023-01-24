import "./App.css";
import Navbar from "./components/Navbar";

import React, { Component } from "react";
import News from "./components/News";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  pageSize=20;
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News pageSize={this.pageSize} country="in" catagory="general" />} />
            <Route exact path="/sports" element={<News key="sports" pageSize={this.pageSize} country="in" catagory="sports" />} />
            <Route exact path="/business" element={<News key="business" pageSize={this.pageSize} country="in" catagory="business" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={this.pageSize} country="in" catagory="entertainment" />} />
            <Route exact path="/science" element={<News key="science" pageSize={this.pageSize} country="in" catagory="science" />} />
            <Route exact path="/health" element={<News key="health" pageSize={this.pageSize} country="in" catagory="health" />} />
            <Route exact path="/technology" element={<News key="technology" pageSize={this.pageSize} country="in" catagory="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
