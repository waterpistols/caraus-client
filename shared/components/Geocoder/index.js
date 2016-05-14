import React from 'react';
import GeocoderDropdown from './GeocoderDropdown';

export default class Geocoder extends React.Component {
    constructor() {
        super();

    }

    handleSubmit(event) {
        this.props.search(this.props.addresses.pickupAddress, this.props.addresses.deliveryAddress);
    }

    handleChange(event) {
        this.props.getCodes(event.target.value, event.target.dataset.type);
    };

    setAddressHandle(type, address) {
        this.props.setAddress(address, type);
    }

    render() {
        return (
            <div id="address-form">

                <input type="text" placeholder="Pickup" data-type="pickup"
                       value={this.props.addresses.pickupAddress.formatted_address}
                       onChange={this.handleChange.bind(this)}/>
                <GeocoderDropdown addresses={this.props.addresses.pickupAddresses}
                                  setAddress={this.setAddressHandle.bind(this, 'pickup')}/>

                <input type="text" placeholder="Delivery" data-type="delivery"
                       value={this.props.addresses.deliveryAddress.formatted_address}
                       onChange={this.handleChange.bind(this)}/>
                <GeocoderDropdown addresses={this.props.addresses.deliveryAddresses}
                                  setAddress={this.setAddressHandle.bind(this, 'delivery')}/>

                <button type="submit" onClick={this.handleSubmit.bind(this)}>Search</button>
            </div>
        );
    }
}


