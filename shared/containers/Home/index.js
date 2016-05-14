import React                  from 'react';
import TodosView              from 'components/TodosView';
import TodosForm              from 'components/TodosForm';
import Geocoder              from 'components/Geocoder';
import {bindActionCreators} from 'redux';
import * as TodoActions       from 'actions/TodoActions';
import * as GeoActions       from 'actions/GeoActions';
import {connect}            from 'react-redux';

@connect(state => ({geos: state.geos}))
export default class Home extends React.Component {
    render() {
        const {dispatch} = this.props;
        const {pickupAddresses, deliveryAddresses} = this.props.geos;

        return (
            <div>
                <Geocoder
                    addresses={{pickupAddresses, deliveryAddresses}} {...bindActionCreators(GeoActions, dispatch)}/>
            </div>
        );
    }
}