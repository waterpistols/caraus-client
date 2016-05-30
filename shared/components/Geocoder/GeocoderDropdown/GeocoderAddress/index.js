import React from 'react';

export default class GeocoderAddress extends React.Component {

    clickHandle() {
        this.props.setAddress(this.props.address);
    }
    render() {
        return (
            <li onClick={this.clickHandle.bind(this)}>
                {this.props.address.formatted_address}
            </li>
        )
    }
}


