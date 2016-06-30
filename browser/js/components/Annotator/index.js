'use strict';

import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';
const _ = require('lodash');
import {annotation, selection} from './actions';

/** fires "selection" event on mouseup */
class AnnotationHandler extends Component{
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
    };
  }
  handleMouseUp (e){
    let _selection = window.getSelection();
    let selectionString = _selection.toString();
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
        selectionString
      });
      this.props.dispatch(selection(_selection));
    }
  }
  handleMouseDown ( ){
    let annotationState = _.cloneDeep(this.state.annotationStyles);
    annotationState.opacity = 0;
    this.setState({
      annotationStyles: annotationState
    });
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      selectionString: nextProps.selectionString
    });
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
      </div>
    );
  }
}

/** fires 'annotation' event on click with selection detail information */
export class AnnotateContextMenu extends Component {
  constructor(props) {
    super(props);
    this.annotate = this.annotate.bind( this );
  }
  annotate( ) {
    this.props.dispatch(annotation(this.props.selection));
  }
  render() {
    return (
        <RaisedButton onClick={this.annotate}
          label='Annotate'
          icon={<FontIcon className='fa fa-plus' />}
        />
    );
  }
}

export default connect()(AnnotationHandler);
