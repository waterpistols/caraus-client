import request from 'axios';
import querystring from 'querystring';

const GOOGLE_API = 'https://maps.googleapis.com/maps/api/geocode/json?';
const BACKEND_API = 'http://api.caraus-server.dev';

let getActions = {
    pickup: 'GET_PICKUP_ADDRESSES',
    delivery: 'GET_DELIVERY_ADDRESSES'
};

let setActions = {
    pickup: 'SET_PICKUP_ADDRES',
    delivery: 'SET_DELIVERY_ADDRES'
};

export function getCodes(address, type) {
    var payload = {
        address: address,
        key: 'AIzaSyDQVppArNbKzVNe3TRn7f94kJj17ktGmWI'
    };
    
    return {
        type: getActions[type],
        promise: request.get(GOOGLE_API + querystring.stringify(payload))
    };
}

export function setAddress(address, type) {
    return {
        type: setActions[type],
        data: address
    };
}