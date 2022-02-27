import React, { Component } from 'react';

class TOC extends Component {
  render() {
    var list = [];
    var data = this.props.data;
    var i = 0;
    for (i; i < data.length; i++) {
      list.push(
        <li key={data[i].id}>
          <a href={"/content/" + data[i].id}
            data-id={data[i].id}
            onClick={function (e) {
              e.preventDefault();
              this.props.onChangePage(e.target.dataset.id);
            }.bind(this)}

          // 두번째 방법
          // onClick={function (id, e) {
          //   e.preventDefault();
          //   this.props.onChangePage(id);
          // }.bind(this, data[i].id)}
          >{data[i].title}
          </a>
        </li>)
    }
    return (
      <nav>
        <ul>
          {list}
        </ul>
      </nav>
    );
  }
}

export default TOC;