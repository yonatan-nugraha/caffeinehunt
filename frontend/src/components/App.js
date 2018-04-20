import React from 'react';
import List from './List';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <List />
      </div>
    );
  }
};

export default App;