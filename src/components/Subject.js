import React, { Component } from 'react';

class Subject extends Component {
  render() {
    return (
      // 안에 쓸때 최상위 태그를 하나만 쓸 수 있음
      <header>
        <h1><a href="/">{this.props.title}</a></h1>
        {this.props.sub}
      </header>
    );
  }
}

export default Subject;