import React, { Component } from 'react';
import TOC from "./components/TOC"
import Subject from "./components/Subject"
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent"
import Control from "./components/Control"
import './App.css';

// const content = {
//   welcome: {
//     title: "Welcome",
//     desc: "Welcome React!"
//   },
//   subject: {
//     title: "WEB",
//     sub: "world wide web"
//   }
// }

// const mode = {
//   welcome: "welcome",
//   read: "read",
//   create: "create",
//   read: "read",
//   update: "update"
// }

// function App() {
//   return
//   <Subject></Subject>,
//     <TOC></TOC>
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: "create",
      selected_content_id: 2,
      subject: { title: "WEB", sub: "World Wide Web!" },
      welcome: { title: 'Welcome', desc: "Hello React!!" },
      contents: [
        { id: 1, title: "HTML", desc: "Html is HyperText ..." },
        { id: 2, title: "CSS", desc: "CSS is for design ..." },
        { id: 3, title: "Naver", desc: "naver is good ..." }
      ]
    }
  }

  render() {
    var _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'read') {
      var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function (title, desc) {
        // add content
        this.max_content_id = this.max_content_id + 1;
        // push -> 원본 배열을 바꿈
        // concat -> 바꾼 배열값을 리턴해 새로운 변수에 담아서 씀
        var _contents = this.state.contents.concat(
          { id: this.max_content_id, title: title, desc: desc }
        )
        this.setState({
          contents: _contents
        })
      }.bind(this)}></CreateContent>
    }

    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: 'welcome' });
          }.bind(this)}></Subject>

        <TOC onChangePage={function (id) {
          this.setState({
            mode: 'read',
            selected_content_id: Number(id)
          });
        }.bind(this)} data={this.state.contents}></TOC>
        <Control onChangeMode={function (mode) {
          this.setState({
            mode: mode
          });
        }.bind(this)}></Control>
        {_article}
      </div>
    );
  }
}

export default App;