import React from 'react';
import ItineraryListItem from './itineraryListItem.jsx';

const ItineraryList = (props) => {
  let headerText = 'Itinerary';
  let saveButton = '';

  if (props.query.name) {
    headerText += ' for ' + props.query.name;
  }

  if (props.saveMessage.length === 0) {
    saveButton = <button className="itinerary-btn" onClick={props.saveItinerary}>Save Itinerary</button>;
  }

  if (props.reorderItinerary) {
    var reorderButton = <button className="itinerary-btn" onClick={props.reorderItinerary}>Reorder Itinerary</button>;
  }

  if (props.emailItinerary /*&& props.sendMail.length === 0*/) {
    var emailButton = <button className="itinerary-btn email-btn" onClick={props.emailItinerary}>Email Itinerary</button>;
  }

  return (
    <div id="itinerary">
      <div className="clearfix">
        <h3 className="itineraryHeader">{headerText}</h3>
        {reorderButton}
        {saveButton}
        <p className="save-itinerary save-text">{props.saveMessage}</p>
      </div>
      <ul>
        {props.list.map((key) => (
            <ItineraryListItem
              key={key.place_id}
              place={key}
              /* Binding list[key].id as the first argument when RemoveItem is called */
              removeItem={props.removeItem.bind(this, key.place_id)}
            />
          ))}
      </ul>
      {emailButton}
    </div>
  );
};

export default ItineraryList;
