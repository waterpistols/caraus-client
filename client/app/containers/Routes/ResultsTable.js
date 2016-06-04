import React from 'react';
import ResultsRow from 'containers/Routes/ResultsRow';

class ResultsTable extends React.Component {
    render() {
      let rows = [];
      this.props.routes.forEach((product) => {
        rows.push(<ResultsRow product={product} key={product.name} />);
      });

      return (
        <table>
          <thead>
            <tr>
              <th>Nume</th>
              <th>Pret</th>
              <th>Rating</th>
              <th>Curse</th>
              <th>Telefon</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      )
    }
}

export default ResultsTable;
