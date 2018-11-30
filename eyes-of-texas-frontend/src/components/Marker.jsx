import React, { Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import {markerStyle, markerStyleHover} from './hover_styles.js';

export default class Marker extends Component {
//   static propTypes = {
//     // GoogleMap pass $hover props to hovered components
//     // to detect hover it uses internal mechanism, explained in x_distance_hover example
//     $hover: PropTypes.bool,
//     text: PropTypes.string
//   };

  static defaultProps = {
      $hover: false,
      text: "N/A"
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  showAlert() {
    alert("Clicked")
  }

  render() {
    const style = this.props.$hover ? markerStyleHover : markerStyle;

    {
      if (this.props.$hover)
        this.props.eventFunc(this.props.text);
    }

    return (
       <div style={style} onClick={this.showAlert}>
          {this.props.text}
       </div>
    );
  }
}