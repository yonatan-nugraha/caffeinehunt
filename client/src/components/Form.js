import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { addRestaurant, deleteRestaurant, getRestaurants } from '../actions/index';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	name: '',
    	image: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleCreateRestaurant = this.handleCreateRestaurant.bind(this);
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleImageChange(e) {
    this.setState({
      image: e.target.value
    });
  }

  handleCreateRestaurant(e) {
    this.props.addRestaurant({
      name: this.state.name,
      image: this.state.image,
    });
  }

 	componentDidMount() {
 		// this.props.addRestaurant({
    //   _id: 4,
    //   name: 'Goedkoop', 
    //   image: 'https://b.zmtcdn.com/data/pictures/chains/1/7403971/5ab2233afc4785e968390e60d0fd7868_featured_v2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
    // });
 	}

  render() {
  	return (
      <div class="row">
      	<form>
      		<div class="form-group">
            <label class="form-label">Name:</label>
            <input
              value={this.props.reason}
              onChange={this.handleNameChange}
              class="form-input"
              type="text"
              placeholder="Name" />
        	</div>
      		<div class="form-group">
            <label class="form-label">Image:</label>
            <input
              value={this.props.image}
              onChange={this.handleImageChange}
              class="form-input"
              type="text"
              placeholder="Image" />
          </div>
         	<button
         		onClick={this.handleCreateRestaurant}
            type="button"
            class="btn btn-primary">Save
          </button>
      	</form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {  
  return bindActionCreators({
    addRestaurant: addRestaurant
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Form);