import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
const Fib = () => {
  [seenIndexes, setSeenIndexes] = useState([]);
  [values, setValues] = useState();
  [index, setIndex] = useState('');

  useEffect(
    () => {

    }, []
  );


  return (
    <> 

    </>
  )
}

export default Fib;

// export default class Fib extends Component {
 
//   state = {
//     seenIndexes: [],
//     values: {},
//     index: ''
//   }

//   componentDidMount() {
//     this.fetchValues();
//     this.fetchIndexes();
//   }

//   async fetchValues(){
//     const values = await axios.get('api/values/current')
//     this.setState({
//       values: values.data
//     })
//   }

//   async fetchIndexes() {
//     const seenIndexes = await axios.get('api/values/all');
//     this.setState({
//       seenIndexes: seenIndexes.data
//     })
//   }

//   renderSeenIndexes(){
//     return this.state.seenIndexes.map(({number}) => {
//       number.join(", ")
//     })
//   }

//   renderValues() {
//     const entries = [];
    
//     for(let key in this.state.values) {
//       entries.push(
//         <div key={key}>
//           for index {key} I calculated {this.state.values[key]}
//         </div>
//       )
//     }
//     return entries;
//   }

//   handleSubmit = async (event) => {
//     event.preventDefault();
//     await axios.post('/api/values', {
//       index: this.state.index

//     })
//   }

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <label htmlFor="">Inter your index: </label>
//           <input type="text"
//             value={this.state.index}
//             onChange={(event) => this.setState({ index: event.target.value })}
//           />
//           <button>Submit</button>
//         </form>
//         <h3>Indexes I have seen</h3>
//         {this.renderSeenIndexes()}
//         <h3>Calculated values</h3>
//         {this.renderValues()}
//       </div>
//     )
//   }
// }
