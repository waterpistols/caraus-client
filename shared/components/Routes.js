import React from 'react';
import Map from 'components/Map';
import Results from 'components/Results';

class Routes extends React.Component {

    render() {
        const wrapperStyle = {
           display: 'flex',
           flexFlow: 'row wrap'
        }

        const mapStyle = {
          flexBasis: '50%'
        }

        const resultsStyle = {
          flexBasis: '50%'
        }

        return (
            <div id="routes-wrapper" style={wrapperStyle}>
                <div id="routes" style={resultsStyle}>
                    <Results/>
                </div>
                <div id="map" style={mapStyle}>
                    <Map/>
                </div>

            </div>
        );
    }
}

export default Routes;
