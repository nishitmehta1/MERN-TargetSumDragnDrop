import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import EachOptionNumbers from './EachOptionNumbers';

const collectTarget = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem()
  };
};

class NumberOptions extends Component {
  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div>
        <div
          className='card container numberOptions'
          style={{ width: '26rem' }}
        >
          <ul className='list-group list-group-flush'>
            <li className='list-group-item options'>
              Your Options:
              <br />
              <div className=''>
                <EachOptionNumbers
                  {...this.props}
                  handleDrop={this.props.handleDrop}
                  optionNumbers={this.props.optionNumbers}
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default DropTarget('selectedNumber', {}, collectTarget)(NumberOptions);
