import React, { Component } from 'react';

function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <span>{items}</span>;
}

class BlankSpaces extends Component {
  render() {
    return <Repeat numTimes={this.props.times}>
      {(index) => <span key={index}>&nbsp;</span>}
    </Repeat>
  }
}

export default BlankSpaces;