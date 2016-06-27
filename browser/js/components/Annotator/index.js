'use strict'

import React, {
  Component,
  PropTypes
} from 'react'
import {
  PrismCode
} from 'react-prism'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import {
  Card,
  CardActions,
  CardHeader,
  CardText
} from 'material-ui/Card'
import {
  RadioButton,
  RadioButtonGroup
} from 'material-ui/RadioButton'
let faker = require( 'faker' );
// import GraderPanel from './GraderPanel'

const uiState = {
  display: false
}

export class AnnotationHandler extends Component{
  constructor(){
    super();
    // let {onMouseUp, onMouseDown, children} = this.props;
    // this.children = children;
    this.annotationStyles = {visibility: 'hidden'};
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.state = {
      annotationStyles: {
        visibility: 'hidden'
      }
    }
  }
  handleMouseUp (e){
    console.log( window.getSelection() );
    console.log( e );
    console.log( e.clientX, e.clientY );
    this.setState({annotationStyles: {visibility: 'visible'}});
  }
  handleMouseDown (e){
    console.log('mousedown');
    this.setState({annotationStyles: {visibility: 'hidden'}});
  }
  render (){
    return (
      <div>
        <div onMouseUp={this.handleMouseUp} onMouseDown={this.handleMouseDown}>
        {this.props.children}
        </div>
        <div style={this.state.annotationStyles} >
          <AnnotateContextMenu >
          </AnnotateContextMenu>
        </div>
      </div>
    )
  }
}

export default class AnnotateContextMenu extends Component {
  constructor() {
    super();
    this.annotate = this.annotate.bind( this );
    // this.buttonStyle = {visibility: 'collapse'}
  }
  annotate( e ) {
    console.log( e );
    console.log( 'view:', e.view );
    console.log( 'bubbles:', e.bubbles );
    console.log( 'selection:', window.getSelection() );
  }
  render() {
    return (
        <button onClick={this.annotate} >
          Annotate
        </button>
    )
  }
}

export class TestAnnotate extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div class="container">
        <div class="row">
          <AnnotationHandler>
            <AnnotationWrapperTest/>
          </AnnotationHandler>
         </div>
       </div>
    )
  }
}

export class AnnotationWrapperTest extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <p> hey hey hey hey hey  </p>
      </div>
    )
  }
}
