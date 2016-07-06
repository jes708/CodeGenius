'use strict';

import {markdown} from 'markdown';
import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import TextField from 'material-ui/TextField';

export default class MarkdownWrapper extends Component {
  constructor(props){
    super(props);

    this.state = {
      markdown: this.props.markdown ? this.props.markdown : null,
      rendered: this.props.markdown ? markdown.toHTML(this.props.markdown) : null,
      editable: this.props.editable
    }
  }
  componentWillReceiveProps(nextProps){
      this.setState({
        markdown: nextProps.markdown ? nextProps.markdown : null,
        rendered: nextProps.markdown ? markdown.toHTML(nextProps.markdown) : null,
        editable: nextProps.editable
      })
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
