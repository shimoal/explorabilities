import React from 'react';
import axios from 'axios';
import MapContainer from './MapContainer.jsx';
import Place from './Place.jsx';
import ItineraryList from './itineraryList.jsx';

export default class Explore extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      place: {},
      query: '',
      itinerary: [],
      saveMessage: ''
    };
  }

  render() {
    return (
      <div id="exploreContainer">
        <MapContainer updatePlace={this.updatePlace.bind(this)} updateQuery={this.updateQuery.bind(this)}/>
        <div id="exploreContent" className="clearfix">
          <Place place={this.state.place} addItem={this.addItem.bind(this)}/>
          <ItineraryList
            list={this.state.itinerary}
            query={this.state.query}
            saveMessage={this.state.saveMessage}
            removeItem={this.removeItem.bind(this)}
            saveItinerary={this.saveItinerary.bind(this)}
          />
        </div>
      </div>
    );
  }

  updatePlace(place) {
    this.setState({
      place: place
    });
  }

  updateQuery(query) {
    this.setState({
      place: {},
      query: query,
      itinerary: [],
      saveMessage: ''
    });
  }

  addItem() {
    this.state.itinerary.push(this.state.place);
    this.setState({
      itinerary: this.state.itinerary
    });
  }

  removeItem(key) {
    var places = this.state.currentItinerary.places;

    for (var i = 0; i < places.length; i++) {
      if (places[i].place_id === key) {
        places.splice(i, 1);
      }
    }

    this.setState({
      currentItinerary: this.state.currentItinerary,
      saveMessage: ''
    });
  }

  saveItinerary() {
    const context = this;
    console.log(this.state.query, 'query');

    var placeIds = this.state.itinerary.map(function (place) {
      return place.place_id;
    })

    axios.post('/itinerary', {
      token: localStorage.token,
      itineraryID: this.state.query.place_id,
      itineraryName: this.state.query.name,
      placeIDs: placeIds
    })
    .then(function(res) {
      if (res.status === 200) {
        context.setState({
          saveMessage: 'Saved'
        });
        console.log(context.state.saveMessage);
      }
    })
    .catch(function(error) {
      console.log(error, 'error saving itinerary');
    });
  }
}
