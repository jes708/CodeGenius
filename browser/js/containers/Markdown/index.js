'use strict';

import {markdown} from 'markdown';
import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import TextField from 'material-ui/TextField';

export default class MarkdownWrapper extends Component {
  constructor(props){
    super(props);
    console.log(this.props.editable);
    this.state = {
      markdown: this.props.markdown,
      rendered: markdown.toHTML(this.props.markdown),
      editable: this.props.editable
    }
  }
  componentWillReceiveProps(nextProps){
    this.state = {
      markdown: nextProps.markdown,
      rendered: markdown.toHTML(nextProps.markdown),
      editable: nextProps.editable
    }
  }
  render(){
    if(this.state.editable){
      return (
          <TextField multiLine={true} floatingLabelText="Leave comments in Markdown." defaultValue={this.state.markdown} />
        )
    } else {
      return (
        <div dangerouslySetInnerHTML={ {__html: this.state.rendered} } />
      )
    }
  }
}
