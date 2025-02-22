import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Fib extends Component {
 
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  }

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues(){
    
  }

  render() {
    return (
      <div>Fib</div>
    )
  }
}
