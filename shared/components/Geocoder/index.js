import React from 'react';
import GeocoderDropdown from './GeocoderDropdown';

export default class Geocoder extends React.Component {
    constructor() {
        super();

    }

    handleChange = (event) => {
        this.props.getCodes(event.target.value, event.target.dataset.type);
    };


    render() {
        return (
            <div id="address-form">

                <input type="text" placeholder="Pickup" data-type="pickup" onChange={this.handleChange} />
                <GeocoderDropdown addresses={this.props.addresses.pickupAddresses} />
                <input type="text" placeholder="Delivery" data-type="delivery" onChange={this.handleChange} />
                <GeocoderDropdown addresses={this.props.addresses.deliveryAddresses} />
            </div>
        );
    }
}


