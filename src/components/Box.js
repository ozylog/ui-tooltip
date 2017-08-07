'use strict';

import React, {Component} from 'react';

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
