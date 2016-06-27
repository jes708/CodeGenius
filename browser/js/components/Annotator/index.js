'use strict'

import React, {
  Component,
  PropTypes
} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
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
import {GradeRepl as GradeRepl} from '../../containers/Grade'
const _ = require('lodash');

/** fires "selection" event on mouseup */
export class AnnotationHandler extends Component{
  constructor(){
    super();
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.state = {
      annotationStyles: {
        position: 'absolute',
        left: -50,
        top: -50,
        opacity: 0
      }
    }
  }
  handleMouseUp (e){
    let selection = window.getSelection()
    if(selection.type == 'Range'){
      this.setState({
        annotationStyles: {
          left: e.clientX - 25,
          top: e.clientY - 55,
          position: 'absolute',
          transition: 'opacity 500ms ease-in',
          opacity: 1
        },
        selection: selection,
        selectionString: selection.toString()
      });
      window.dispatchEvent(new CustomEvent( 'selection', {detail: selection.toString()} ))
    }
  }
  handleMouseDown (e){
    let annotationState = _.cloneDeep(this.state.annotationStyles);
    annotationState.opacity = 0;
    this.setState({
      annotationStyles: annotationState
    });
  }
  render (){
    return (
      <div>
        <div onMouseUp={this.handleMouseUp} onMouseDown={this.handleMouseDown}>
          {this.props.children}
        </div>
          <div style={this.state.annotationStyles} >
            <AnnotateContextMenu selection={this.state.selection}>
            </AnnotateContextMenu>
          </div>
        <pre>
          { this.state.selectionString || 'no selection to speak of...'}
        </pre>
      </div>
    )
  }
}

/** fires 'annotation' event on click with selection detail information */
export default class AnnotateContextMenu extends Component {
  constructor() {
    super();
    this.annotate = this.annotate.bind( this );
  }
  annotate( e ) {
    window.dispatchEvent(new CustomEvent( 'annotation', {detail: this.props.selection} ))
  }
  render() {
    return (
        <RaisedButton onClick={this.annotate}
          label='Annotate'
          icon={<FontIcon className='fa fa-plus' />}
        />
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
    window.addEventListener('annotation', e=>console.log('annotation happened\n', e.detail))
    window.addEventListener('selection', e=>console.log('selection happened\n', e.detail))
  }
  render() {
    return (
      <GradeRepl>
      </GradeRepl>
    )
  }
}
