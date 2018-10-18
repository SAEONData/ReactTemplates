'use strict'

import React from 'react'
import {
  Map, TileLayer, Marker, Popup
} from 'react-leaflet'

//Import Leaflet CSS an fix icon issues
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


const DEFAULT_VIEWPORT = {
  center: [-30.5595, 22.9375],
  zoom: 6,
}

class ReactMap extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hasLocation: false,
      viewport: DEFAULT_VIEWPORT,
      marker: {
        lat: DEFAULT_VIEWPORT.center[0],
        lng: DEFAULT_VIEWPORT.center[1]
      }
    }

    this.mapRef = React.createRef();

    this.handleClick = this.handleClick.bind(this)
    this.onViewportChanged = this.onViewportChanged.bind(this)
    this.handleLocationFound = this.handleLocationFound.bind(this)
  }

  componentDidMount() {
    const map = this.mapRef.current
    if (map != null) {
      map.leafletElement.locate()
    }
  }

  handleLocationFound(e) {
    let { viewport } = this.state
    viewport.center = [e.latlng.lat, e.latlng.lng]
    this.setState({
      viewport,
      marker: e.latlng,
      hasLocation: true
    })
  }

  handleClick(e) {
    this.setState({ marker: e.latlng, hasLocation: true })
  }

  onViewportChanged(viewport) {
    this.setState({ viewport })
  }

  render() {

    let { viewport, marker, hasLocation } = this.state

    const markerJSX = hasLocation ? (
      <Marker position={marker}>
        <Popup>
          You clicked here
          <br />
          [{marker.lat}, {marker.lng}]
          </Popup>
      </Marker>
    ) : null

    return (
      <>
        <Map
          style={{ height: "550px" }}
          onClick={this.handleClick}
          onViewportChanged={this.onViewportChanged}
          onLocationfound={this.handleLocationFound}
          center={viewport.center}
          zoom={viewport.zoom}
          ref={this.mapRef}
        >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markerJSX}
        </Map>
      </>
    )
  }
}

export default ReactMap