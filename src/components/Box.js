'use strict';

import React, {Component} from 'react';
import './../styles/box.css';

export default class Box extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      parentWidth: 0,
      parentHeight: 0,
      align: 'center',
      status: false,
      clickable: false,
      trigger: 'hover',
      style: {}
    };
  }

  componentWillMount() {
    const {align, clickable, style, click} = this.props;
    const newState = {};

    if (align) newState.align = align;
    if (style) newState.style = style;
    if (click) {
      newState.trigger = 'click';
      if (clickable) newState.clickable = clickable;
    }
    if (Object.keys(newState).length) this.setState(newState);
  }

  componentDidUpdate() {
    const {trigger, status} = this.state;
    const {isHovered, isClicked} = this.props;
    const hoverStatusChange = trigger === 'hover' && isHovered !== status;
    const clickStatusChange = trigger === 'click' && isClicked !== status;

    if (hoverStatusChange || clickStatusChange) this.changeStatus();
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
    const {className, children} = this.props;
    const {width, parentWidth, parentHeight, align, status, clickable, style = {}} = this.state;
    const classes = ['UITooltip-box', `UITooltip-${align}`];

    if (className) classes.push(className);
    if (status) classes.push('UITooltip-show');

    style.top = parentHeight + 5;
    if (status && clickable) style.pointerEvents = 'auto';

    if (align === 'left') {
      style.left = 0;
    } else if (align === 'center') {
      style.left = -1 * width / 2 + parentWidth / 2;
    } else if (align === 'right') {
      style.right = 0;
    }

    return (
      <span className={classes.join(' ')} ref='tooltip' style={style}>
        {children}
      </span>
    );
  }
}
