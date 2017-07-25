'use strict';

import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';

export default class Box extends Component {
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
    const {children, align, clickable, style, adjustHeight} = this.props;
    const {width, parentWidth, parentHeight, status} = this.state;
    const additionalStyle = {
      top: parentHeight + (adjustHeight || 0),
      opacity: status ? 1 : 0
    };

    if (status && clickable) additionalStyle.pointerEvents = 'auto';
    if (align === 'left') {
      Object.assign(additionalStyle, {
        left: 0,
        ':before': {left: '9px'},
        ':after': {left: '10px'}
      });
    } else if (align === 'right') {
      Object.assign(additionalStyle, {
        right: 0,
        ':before': {right: '9px'},
        ':after': {right: '10px'}
      });
    } else { // default center
      Object.assign(additionalStyle, {
        left: -1 * width / 2 + parentWidth / 2,
        ':before': {left: 'calc(50% - 6px)'},
        ':after': {left: 'calc(50% - 6px)'}
      });
    }

    if (style) Object.assign(additionalStyle, style);

    const boxStyle = StyleSheet.create({box: additionalStyle});

    return (
      <span ref='tooltip' className={css(styles.box, boxStyle.box)}>
        {children}
      </span>
    );
  }
}

const styles = StyleSheet.create({
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
  }
});
