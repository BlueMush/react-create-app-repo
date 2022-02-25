import React, { Component } from 'react';
import TOC from "./components/TOC"
import Subject from "./components/Subject"
import Content from "./components/Content"
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode:"welcome",
      subject:{title:"WEB", sub:"World Wide Web!"},
      welcome:{title:'Welcome', desc:"Hello React!!"},
      contents:[
        {id:1, title:"HTML", desc:"Html is HyperText ..."},
        {id:2, title:"CSS", desc:"CSS is for design ..."},
        {id:3, title:"Naver", desc:"naver is good ..."}
      ]
    }
  }

  render() {
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}></Subject>
        <TOC data={this.state.contents}></TOC>
        <Content title="HTML" desc={this.state.contents.desc}></Content>
      </div>
    );
  }
}

export default App;