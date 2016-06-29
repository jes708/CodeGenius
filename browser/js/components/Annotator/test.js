'use strict'

import React, {
  Component,
  PropTypes
} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { connect } from 'react-redux';
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
import Grade from '../../containers/Grade'
const _ = require('lodash');
import {annotation, selection, stopSelection, startSelection} from './actions';
// import store here //


/** fires "selection" event on mouseup */
export class AnnotationHandler extends Component{
  constructor(props){
    super(props);
    console.log(this.props);
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
    let _selection = window.getSelection()
    let selectionString = _selection.toString();
    console.log('this is the selected string:', selectionString);
    if(_selection.type == 'Range'){
      this.setState({
        annotationStyles: {
          left: e.clientX - 25,
          top: e.clientY - 55,
          position: 'absolute',
          transition: 'opacity 500ms ease-in',
          opacity: 1
        },
        selection: _selection,
        selectionString: _selection.toString()
      });
      this.props.dispatch(selection(_selection));
    }
  }
  handleMouseDown (e){
    let annotationState = _.cloneDeep(this.state.annotationStyles);
    annotationState.opacity = 0;
    this.setState({
      annotationStyles: annotationState
    });
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      selectionString: nextProps.selectionString
    })
  }
  render (){
    return (
      <div>
        <div onMouseUp={this.handleMouseUp} onMouseDown={this.handleMouseDown}>
          {this.props.children}
        </div>
          <div style={this.state.annotationStyles} >
            <AnnotateContextMenu {...this.props} selection={this.state.selection}>
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
export class AnnotateContextMenu extends Component {
  constructor(props) {
    super(props);
    this.annotate = this.annotate.bind( this );
  }
  annotate( e ) {
    this.props.dispatch(annotation(this.props.selection))
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
  constructor(props) {
    super(props);
    console.log(this.props)
  }
  render() {
    return (
      <div class="container">
        <div class="row">
          <AnnotationHandler {...this.props} >
            <AnnotationWrapperTest/>
          </AnnotationHandler>
         </div>
       </div>
    )
  }
}

export class AnnotationWrapperTest extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Grade>
      </Grade>
    )
  }
}

function getStyle(state) {
  console.log('called from getStyle', state);
  return state;
}

function getSelectionString(state) {
  console.log('called get selection string');
  return state
}

export default connect()(TestAnnotate)
