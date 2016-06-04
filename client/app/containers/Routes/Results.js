import React from 'react';
import ResultsTable from 'containers/Routes/ResultsTable';

class Results extends React.Component {
    constructor() {
        super();

        this.ROUTES = [
          { name: 'Andrei Demian', price: '1', paid: true, transports: 4, status: 1, rating: 4, phone: '0745705282' },
          { name: 'Sporting Goods', price: '2', paid: false, transports: 4, status: 1, rating: 4, phone: '0745705282' },
          { name: 'Electronics', price: '4', paid: true, transports: 4, status: 1, rating: 4, phone: '0745705282' }
        ];
    }

    render() {
        return (
            <ResultsTable routes={this.ROUTES} />
        )
    }
}

export default Results;
