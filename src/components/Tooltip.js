'use strict';

import React, {Component, Children, cloneElement} from 'react';
import './../styles/tooltip.css';

export default class Tooltip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHovered: false,
      isClicked: false
    };
  }

  onClick = () => {
    this.setState({isClicked: !this.state.isClicked});
  }

  onMouseOver = () => {
    this.setState({isHovered: true});
  }

  onMouseOut = () => {
    this.setState({isHovered: false});
  }

  getChildren() {
    const {children} = this.props;
    const childProps = Object.assign({}, this.state);

    return Children.map(children, (child) => {
      return child && child.type && child.type.name === 'Box' ? cloneElement(child, childProps) : child;
    });
  }

  render() {
    const {onClick, onMouseOut, onMouseOver} = this;
    const {className} = this.props;
    const classes = ['UITooltip'];

    if (className) classes.push(className);

    return (
      <span className={classes.join(' ')} onClick={onClick} onMouseOut={onMouseOut} onMouseOver={onMouseOver}>
        {this.getChildren()}
      </span>
    );
  }
}
