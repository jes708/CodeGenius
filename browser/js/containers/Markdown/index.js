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
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);

  }
  handleOnChange(event, setState){
    this.setState({
      markdown: event.target.value
    });
    if(this.props.handleOnChange) this.props.handleOnChange(event);
  }
  handleOnBlur(event, setState){
    if(this.props.handleOnBlur) this.props.handleOnBlur(event);
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
          <TextField multiLine={true} floatingLabelText="Leave comments in Markdown." defaultValue={this.state.markdown} onBlur={this.handleOnBlur} onChange={this.handleOnChange} rows={3} />
        )
    } else {
      return (
        <div dangerouslySetInnerHTML={ {__html: this.state.rendered} } />
      )
    }
  }
}
