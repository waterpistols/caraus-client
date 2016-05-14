import React from 'react';

export default class GeocoderAddress extends React.Component {
    handleClick = (event) => {
        
    };

    render() {
        return (
            <li data-lat={this.props.address.geometry.location.lat} data-lng={this.props.address.geometry.location.long}>
                {this.props.address.formatted_address}
            </li>
        )
    }
}


