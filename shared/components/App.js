import React from 'react';

class App extends React.Component {
    render() {
        return (
            <div id="app-view">
                {this.props.children}
            </div>
        );
    }
}

export default App;