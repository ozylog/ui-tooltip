'use strict';

import React, {Component, Children, cloneElement} from 'react';
import injectSheet from 'react-jss';

const styles = {
  tooltip: {
    display: 'inline-block',
    position: 'relative'
  },
  box: {
    background: 'rgba(51, 51, 51, 0.7)',
    borderRadius: 3,
    color: '#f5f5f5',
    fontSize: '0.9em',
    opacity: 0,
    padding: '2px 8px',
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 1,
    '&:before': {
      borderBottom: '6px solid rgba(51, 51, 51, 0.7)',
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      content: '""',
      display: 'inline-block',
      position: 'absolute',
      top: '-6px'
    }
  },
  boxLeft: {
    '&:before': {left: '9px'},
    '&:after': {left: '10px'}
  },
  boxCenter: {
    '&:before': {left: 'calc(50% - 6px)'},
    '&:after': {left: 'calc(50% - 6px)'}
  },
  boxRight: {
    '&:before': {right: '9px'},
    '&:after': {right: '10px'}
  }
};

class Tooltip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHovered: false,
      isClicked: false
    };
  }

  onClick = () => {
    const isClicked = !this.state.isClicked;

    this.setState({
      isClicked: !this.state.isClicked,
      isHovered: isClicked ? false : true
    });
  }

  onMouseOver = () => {
    if (!this.state.isClicked) {
      this.setState({isHovered: true});
    }
  }

  onMouseOut = () => {
    this.setState({isHovered: false});
  }

  getChildren() {
    const {children, classes} = this.props;
    const childProps = Object.assign({classes}, this.state);

    return Children.map(children, (child) => {
      return child && child.type && child.type.name === 'Box' ? cloneElement(child, childProps) : child;
    });
  }

  render() {
    const {classes} = this.props;
    const {onClick, onMouseOut, onMouseOver} = this;

    return (
      <span className={classes.tooltip} onClick={onClick} onMouseOut={onMouseOut} onMouseOver={onMouseOver}>
        {this.getChildren()}
      </span>
    );
  }
}

export default injectSheet(styles)(Tooltip);
