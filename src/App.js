import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react'
import './App.css';
import MapWrapper from './Map';



class Mapapp extends Component {
   render() {
    return (
      <div className='header'>
                <h1 className="heading"> my Fav Hofuf Places - KSA </h1>
        <MapWrapper google={this.props.google} />
      </div>
    );
  }
}
// my google API KEY
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBEE0tp__NcK5KBP9aP3r-ZhGeU2M_Lu-M'
})(Mapapp)