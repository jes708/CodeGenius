'use strict';
import React, { Component } from 'react'
import io from 'socket.io-client'

var client = io('http://localhost:1337');

export default class Socket extends Component{
  constructor(){
    super();
  }
  render(){
    let that = this;
    client.on('success', function(data){
        that.setState({socketId: this.id})
    });
    return(
      <span />
    )
  }
}
