import React from 'react';

class ResultsRow extends React.Component {
    render() {
      return (
        <tr>
          <td>{this.props.product.name}</td>
          <td>{this.props.product.price}</td>
          <td>{this.props.product.rating}</td>
          <td>{this.props.product.transports}</td>
          <td>{this.props.product.phone}</td>
        </tr>
      )
    }
}

export default ResultsRow;
