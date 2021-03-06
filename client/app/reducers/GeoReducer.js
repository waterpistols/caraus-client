import Immutable from 'immutable';
import {combineReducers} from 'redux';

const defaultState = {
    pickupAddress: {},
    deliveryAddress: {},
    pickupAddresses: [],
    deliveryAddresses: [],
    results: []
};

function pickupAddress(state = defaultState.pickupAddress, action) {
    switch(action.type) {
        case 'SET_PICKUP_ADDRESS':
            return action.data;

        default:
            return state;
    }
}
function pickupAddresses(state = defaultState.pickupAddresses, action) {
    switch(action.type) {
        case 'GET_PICKUP_ADDRESSES':
            return action.res.data.results;

        default:
            return state;
    }
}

function deliveryAddress(state = defaultState.deliveryAddress, action) {
    switch (action.type) {
        case 'SET_DELIVERY_ADDRESS':
            return action.data;

        default:
            return state;
    }
}
function deliveryAddresses(state = defaultState.deliveryAddresses, action) {
    switch(action.type) {
        case 'GET_DELIVERY_ADDRESSES':
            return action.res.data.results;

        default:
            return state;
    }
}

function results(state = defaultState.results, action) {
    switch(action.type) {
        case 'POST_SEARCH':
            return action.res.data.results;

        default:
            return state;
    }
}



const geoReducer = combineReducers({
    pickupAddress,
    deliveryAddress,
    pickupAddresses,
    deliveryAddresses,
    results
});

export default geoReducer;