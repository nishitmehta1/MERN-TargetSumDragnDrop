import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import _ from 'lodash';

const SelectedNumberSource = {
  beginDrag(props) {
    console.log('Dragging Selected');
    const draggedNumber = { number: props.number };
    return draggedNumber;
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    const draggedNumber = props.number;
    return props.handleSelectedRemove(draggedNumber);
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
};

class EachSelectedNumber extends Component {
  render() {
    const { isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0 : 1;
    return connectDragSource(
      <div className='selectedNumber' style={{ opacity }}>
        {this.props.number}
      </div>
    );
  }
}

export default _.flow([
  DragSource('selectedNumber', SelectedNumberSource, collect)
])(EachSelectedNumber);
