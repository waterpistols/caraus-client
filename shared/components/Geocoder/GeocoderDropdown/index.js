import React from 'react';
import GeocoderAddress from './GeocoderAddress';

export default class GeocoderDropdown extends React.Component {

    render() {
        return (
            <ul>
                {
                    this.props.addresses.map((address, index) => {
                        return (<GeocoderAddress key={index} address={address}/>);
                    })
                }
            </ul>
        )
    }
}


