import React, { Component } from 'react';
import EachSelectedNumber from './EachSelectedNumber';
import { DropTarget } from 'react-dnd';
import _ from 'lodash';

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem()
  };
};

class TargetSum extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const selectedNumbers = this.props.selectedNumbers.map((number, id) => {
      return <EachSelectedNumber {...this.props} key={id} number={number} />;
    });

    const { connectDropTarget } = this.props;
    // console.log('Hovered: ', hovered, item);
    return connectDropTarget(
      <div className='card container targetSum' style={{ width: '26rem' }}>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item target'>
            Target Sum:
            <br />
            <span className='number'>{this.props.target}</span>
          </li>
          <li className='list-group-item current'>
            Current Sum:
            <br />
            <span
              className={`number ${
                this.props.currentTargetIsEqual === 'MORE'
                  ? 'red'
                  : this.props.currentTargetIsEqual === 'LESS'
                  ? 'grey'
                  : ''
              }`}
            >
              {this.props.currentSum}
            </span>
          </li>
          <li className='list-group-item selected'>
            Selected:
            <br />
            {this.props.selectedNumbers.length ? (
              <div className=''>
                <div className='listSelected'>{selectedNumbers}</div>
              </div>
            ) : (
              <div className='grey'>Drag the numbers here</div>
            )}
          </li>
        </ul>
      </div>
    );
  }
}

export default _.flow([DropTarget('optionNumber', {}, collect)])(TargetSum);
