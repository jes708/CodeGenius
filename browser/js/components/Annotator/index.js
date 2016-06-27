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

export function AnnotationHandler(props){
  const {onMouseUp, children} = props;
  onMouseUp = function(e){
    console.log( window.getSelection() );
    console.log( e );
    console.log( e.clientX, e.clientY );
  }
  return (
    <div onMouseUp={onMouseUp}>
      {children}
      <AnnotateContextMenu>
      </AnnotateContextMenu>
    </div>
  )
}

export default class AnnotateContextMenu extends Component {
  constructor() {
    super();
    this.annotate = this.annotate.bind( this );
  }
  annotate( e ) {
    console.log( e );
    console.log( 'view:', e.view );
    console.log( 'bubbles:', e.bubbles );
    console.log( 'selection:', window.getSelection() );
  }
  render() {
    return (
      <div>
        <button onClick = {this.annotate} >
          Annotate
          </button>
      </div>
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
