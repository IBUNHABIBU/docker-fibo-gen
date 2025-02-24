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
    const values = await axios.get('api/values/current')
    this.setState({
      values: values.data
    })
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('api/values/all');
    this.setState({
      seenIndexes: seenIndexes.data
    })
  }

  renderSeenIndexes(){
    
  }

  render() {
    return (
      <div>
        <form>
          <label htmlFor="">Inter your index: </label>
          <input type="text" />
          <button>Submit</button>
        </form>
        <h3>Indexes I have seen</h3>
        {this.renderSeenIndexes}
        <h3>Calculated values</h3>
      </div>
    )
  }
}
