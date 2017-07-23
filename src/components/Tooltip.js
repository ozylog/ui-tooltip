'use strict';

import React, {Component, Children, cloneElement} from 'react';
import {StyleSheet, css} from 'aphrodite';

export default class Tooltip extends Component {
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
    const {children} = this.props;
    const childProps = Object.assign({}, this.state);

    return Children.map(children, (child) => {
      return child && child.type && child.type.name === 'Box' ? cloneElement(child, childProps) : child;
    });
  }

  render() {
    const {onClick, onMouseOut, onMouseOver} = this;

    return (
      <span style={css(styles.tooltip)} onClick={onClick} onMouseOut={onMouseOut} onMouseOver={onMouseOver}>
        {this.getChildren()}
      </span>
    );
  }
}

const styles = StyleSheet.create({
  tooltip: {
    display: 'inline-block',
    position: 'relative'
  }
});
