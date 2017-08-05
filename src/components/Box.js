'use strict';

import React, {Component} from 'react';
import injectSheet from 'react-jss';

const styles = {
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
    ':before': {
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
    ':before': {left: '9px'},
    ':after': {left: '10px'}
  },
  boxCenter: {
    ':before': {left: 'calc(50% - 6px)'},
    ':after': {left: 'calc(50% - 6px)'}
  },
  boxRight: {
    ':before': {right: '9px'},
    ':after': {right: '10px'}
  }
};

class Box extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      parentWidth: 0,
      parentHeight: 0,
      status: false
    };
  }

  componentDidUpdate() {
    let change = false;
    const {status} = this.state;
    const {isHovered, isClicked, click, hover} = this.props;
    const isHover = hover || (!click && !hover);
    const isClick = click;

    if (isClick && isClicked !== status) change = !change;
    if (isHover && isHovered !== status) change = !change;

    if (change) this.changeStatus();
  }

  changeStatus() {
    const {status} = this.state;

    const newState = {status: !status};

    if (newState.status) {
      Object.assign(newState, {
        width: this.refs.tooltip.offsetWidth,
        parentWidth: this.refs.tooltip.parentNode.offsetWidth,
        parentHeight: this.refs.tooltip.parentNode.offsetHeight
      });
    }

    if (this.props.onChange) this.props.onChange(newState.status);

    this.setState(newState);
  }

  render() {
    const {children, align, clickable, style, adjustHeight, classes, className} = this.props;
    const {width, parentWidth, parentHeight, status} = this.state;
    const inlineStyles = {
      top: parentHeight + (adjustHeight || 0),
      opacity: status ? 1 : 0
    };
    const classNames = [classes.box];
    if (className) classNames.push(className);

    if (status && clickable) inlineStyles.pointerEvents = 'auto';
    if (align === 'left') {
      inlineStyles.left = 0;
      classNames.push(classes.boxLeft);
    } else if (align === 'right') {
      inlineStyles.right = 0;
      classNames.push(classes.boxRight);
    } else { // default center
      inlineStyles.left = -1 * width / 2 + parentWidth / 2;
      classNames.push(classes.boxCenter);
    }

    if (style) Object.assign(inlineStyles, style);

    return (
      <span ref='tooltip' className={classNames.join(' ')} style={inlineStyles}>
        {children}
      </span>
    );
  }
}

export default injectSheet(styles)(Box);
