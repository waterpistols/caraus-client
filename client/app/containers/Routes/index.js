import React from 'react';
import Map from 'containers/Routes/Map';
import Results from 'containers/Routes/Results';

class Routes extends React.Component {

    render() {
        return (
            <div id="routes-wrapper">
                <div id="routes">
                    <Results/>
                </div>
                <div id="map-wrapper">
                    <Map/>
                </div>
            </div>
        );
    }
}

export default Routes;
