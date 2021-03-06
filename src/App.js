import React, { Component } from 'react';
import TOC from "./components/TOC"
import Subject from "./components/Subject"
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent"
import UpdateContent from "./components/UpdateContent"
import Control from "./components/Control"
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.max_content_id = 3;
		this.state = {
			mode: "welcome",
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
	getReadContent() {
		var i = 0;
		while (i < this.state.contents.length) {
			var data = this.state.contents[i];
			if (data.id === this.state.selected_content_id) {
				return data;
			}
			i = i + 1;
		}
	}
	getContent() {
		var _title, _desc, _article = null;
		if (this.state.mode === 'welcome') {
			_title = this.state.welcome.title;
			_desc = this.state.welcome.desc;
			_article = <ReadContent title={_title} desc={_desc}></ReadContent>
		} else if (this.state.mode === 'read') {
			var _content = this.getReadContent();
			_article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>

		} else if (this.state.mode === 'create') {
			_article = <CreateContent onSubmit={function (title, desc) {
				// add content
				this.max_content_id = this.max_content_id + 1;
				// push -> 원본 배열을 바꿈
				// concat -> 바꾼 배열값을 리턴해 새로운 변수에 담아서 씀
				var _contents = this.state.contents.concat(
					{ id: this.max_content_id, title: title, desc: desc }
				)

				// 배열복제
				// var _contents = Array.from(this.state.contents);
				// _contents.push . . .
				// 변수 복제 --> var b = Object.assign({}, a);

				this.setState({
					contents: _contents,
					mode: 'read',
					selected_content_id: this.max_content_id
				})
			}.bind(this)}></CreateContent>
		} else if (this.state.mode === 'update') {
			_content = this.getReadContent();
			_article = <UpdateContent data={_content} onSubmit={
				function (_id, _title, _desc) {
					var _contents = Array.from(this.state.contents);
					var i = 0;
					while (i < _contents.length) {
						if (_contents[i].id === _id) {
							_contents[i] = { id: _id, title: _title, desc: _desc };
							break;
						}
						i++;
					}
					this.setState({
						contents: _contents
					})
				}.bind(this)}></UpdateContent>
		}
		return _article;
	}

	render() {
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
					if (mode === 'delete') {
						if (window.confirm('ㄹㅇ??')) {
							var _contents = Array.from(this.state.contents);
							var i = 0;
							// for (i = 0; i < this.state.contents.length; i++) {
							//   if (_content[i].id === this.state.selected_content_id) {
							//     _content.splice(i, 1);
							//     break;
							//   }
							// }
							while (i < _contents.length) {
								console.log("d");
								if (_contents[i].id === this.state.selected_content_id) {
									console.log(_contents[i].id);
									console.log(this.state.selected_content_id);
									_contents.splice(i, 1);
									break;
								}
								i = i + 1;
							}
							this.setState({
								mode: 'welcome',
								contents: _contents
							});
						}
					} else {
						this.setState({
							mode: mode
						});
					}
				}.bind(this)}></Control>
				{this.getContent()}
			</div>
		);
	}
}

export default App;