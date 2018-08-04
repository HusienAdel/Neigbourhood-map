import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as FoursquareAPI from './FoursquareAPI';
import styles from './Styles';
import fetchImges from '../src/FoursquareAPI.js'

export default class MapWrapper extends Component {

  //state ,Location array 
  state = {
    locations: [
      {name: "Marroush Restaurant", location: {lat: 25.337269, lng: 49.593224}, id:"537d032a498e10c89475df42" },
      {name: "Topaz restaurant", location: {lat: 25.353672, lng: 49.595706}, id:"4f9313f0e4b0c03d2a3a75a2"},
      {name: "Al Othaim Mall", location: {lat: 25.400506, lng: 49.577937}, id:"4f9313f0e4b0c03d2a3a75a2"},
      {name: "Al Ahsa Mall", location: {lat: 25.328897, lng: 49.549602}, id:"4f9313f0e4b0c03d2a3a75a2"},
      {name: "King Abdullah Park", location: {lat: 25.320119, lng: 49.556643}, id:"4e6146f8aeb736031469ef4a"}
         ],




    query: '',
    markers: [],
    infowindow: new this.props.google.maps.InfoWindow(),
    highlightedIcon: null,

 
    

  }

  fetchImg = (marker,infowindow,location) => {
    

    fetchImges(location.id)
        // .then(resp => this.mounntImage(resp))
        .then(resp => {
          console.log(this.MakinginfoWindow)
          this.MakinginfoWindow(marker, infowindow,resp.src)
        })
        
  }
  
  mounntImage = (imageData) => {
  this.setState({imgData: imageData})
  }

  componentDidMount() {
    this.loadMap()
    // Createhighlighted location
    this.setState({highlightedIcon: this.changeMarkerIcon('dba63d')})
  


  }

  loadMap() {
    if (this.props && this.props.google) {
      const {google} = this.props
      const maps = google.maps
      const mapRef = this.refs.map
      const node = ReactDOM.findDOMNode(mapRef)
      const mapsetting = Object.assign({}, {
        center: {lat: 25.380026, lng: 49.5887652},
        zoom: 10,
        mapTypeId: 'roadmap',
        styles:styles
      })
      this.map = new maps.Map(node, mapsetting)
      this.addMarkers()
    }

 // error handling
 window.gm_authFailure = () => {
     alert('google maps failedto load')
};


  }





  // onclickLocation = () => {
  //   const that = this
  //   const {infowindow} = this.state

  //   const displayInfowindow = (e) => {
  //     const {markers} = this.state
  //     const markerInd =null;
  //       markers.findIndex(m => m.title.toLowerCase() === e.target.innerText.toLowerCase())
  //     that.MakinginfoWindow(markers[markerInd], infowindow)
  //   }
    
  //   document.querySelector('.locations-list').addEventListener('click', function (e) {
  //     if (e.target && e.target.nodeName === "BUTTON") {
  //       displayInfowindow(e)
  //     }
  //   })
  // }

  triggerInfoWindow = (e,marker) =>{
    const activeLocaiton = this.state.locations.filter(location =>{
      return location.name === marker.title;
    });
 this.fetchImg(marker,this.state.infowindow,activeLocaiton[0]);
  }

  handleValueChange = (e) => {
    this.setState({query: e.target.value})
  }

  addMarkers = () => {
    const self =this;
    const {google} = this.props
    let {infowindow} = this.state
    const bounds = new google.maps.LatLngBounds()

    this.state.locations.forEach((location, ind) => {
      const marker = new google.maps.Marker({
        position: {lat: location.location.lat, lng: location.location.lng},
        map: this.map,
        title: location.name
      })
     
      marker.addListener('click',function () {
      
   
     const activeLocaiton = self.state.locations.filter(location =>{
        return location.name === this.title;
      });
      // console.log(activeLocaiton)
    console.log(infowindow)
      self.fetchImg(marker,infowindow,activeLocaiton[0])
      })
      this.setState((state) => ({
        markers: [...state.markers, marker]
      }))
      bounds.extend(marker.position)
    })
    this.map.fitBounds(bounds)
  }

  MakinginfoWindow = (marker, infowindow,src) => {
    const defaultIcon = marker ? marker.getIcon() : null;
    const {highlightedIcon, markers } = this.state
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
      // reset the color of previous marker
      if (infowindow.marker) {
        const ind = markers.findIndex(m => m.title === infowindow.marker.title)
        markers[ind].setIcon(defaultIcon)
      }

 
      // change marker icon color of clicked marker
      marker.setIcon(highlightedIcon)
      infowindow.marker = marker
      infowindow.setContent(`<h3>${marker.title}</h3><h4>
      </h4>
      <img src="${src}"/>`)
      infowindow.open(this.map, marker)
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function () {
        infowindow.marker = null
      })
    }
  }


  changeMarkerIcon = (colorOfMarker) => {
    const {google} = this.props
    let markerImage = new google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + colorOfMarker +
      '|40|_|%E2%80%A2',
      new google.maps.Size(21, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34),
      new google.maps.Size(21, 34));
    return markerImage;
  }

  render() {
    const {locations, query, markers, infowindow} = this.state
    if (query) {
      locations.forEach((l, i) => {
        if (l.name.toLowerCase().includes(query.toLowerCase())) {
          markers[i].setVisible(true)
        } else {
          if (infowindow.marker === markers[i]) {
            // close the info window model when marker removed
            infowindow.close()
          }
          markers[i].setVisible(false)
        }
      })
    } else {
      locations.forEach((l, i) => {
        if (markers.length && markers[i]) {
          markers[i].setVisible(true)
        }
      })
    }
    return (
      <div>
        <div className="container">
          <div className="menu-side">
            <input role="search" type='text'placeholder='search for place' aria-label="search for places"
                   value={this.state.value}
                   onChange={this.handleValueChange}/>
                   <nav>
            <ul className="locations-list" role="locations-list">{
              markers.filter(m => m.getVisible()).map((m, i) =>
                (<li tabIndex="0" className='menuItem' key={i}><button onClick={(e)=>{this.triggerInfoWindow(e,m)}} aria-label={m.title}>{m.title}</button></li>))
            }</ul>
            </nav>
          </div>
          <div role="application" className="map" ref="map">
            loading content of page ...
          </div>
        </div>
        <div className="footer">
        All rights are reserved to husien Adel - project use - 
        <a rel="noopener noreferrer" href='https://developers.google.com/maps/'>google map API</a>
   
        </div>
      </div>
    )
  }
}