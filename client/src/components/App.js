import React from 'react';
import List from './List';
import Form from './Form';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Form />
        <List />
      </div>
    );
  }
};

export default App;