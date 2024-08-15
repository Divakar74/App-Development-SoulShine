import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import '../../App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';

// Define the localizer for the calendar
const localizer = momentLocalizer(moment);

// Set the app element for accessibility
Modal.setAppElement('#root');

const CustomCalendar = ({ moodEntries }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Log moodEntries when they change
  React.useEffect(() => {
    console.log('Mood Entries Updated:', moodEntries);
  }, [moodEntries]);

  // Process and format the entries
  const formattedEntries = moodEntries.map(entry => {
    // Parse the createdAt timestamp using moment and convert it to a JavaScript Date object
    const start = moment(entry.createdAt).toDate();

    // For this example, we'll assume the end time is one hour later
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    // Log the parsed times for debugging
    console.log(`Parsed start: ${entry.createdAt} => ${start}`);
    console.log(`Calculated end: ${end}`);

    // Ensure the fields are arrays or convert them to arrays
    const moodArray = Array.isArray(entry.selectedMood) ? entry.selectedMood : (typeof entry.selectedMood === 'string' ? [entry.selectedMood] : []);
    const weatherArray = Array.isArray(entry.selectedWeather) ? entry.selectedWeather : (typeof entry.selectedWeather === 'string' ? [entry.selectedWeather] : []);
    const miscellaneousArray = Array.isArray(entry.selectedMiscellaneous) ? entry.selectedMiscellaneous : (typeof entry.selectedMiscellaneous === 'string' ? [entry.selectedMiscellaneous] : []);

    // Construct the title with the formatted strings
    const title = `
      Mood: ${moodArray.join(', ')}
      Weather: ${weatherArray.join(', ')}
      Miscellaneous: ${miscellaneousArray.join(', ')}
    `.trim();

    console.log('Processing Entry:', entry);
    console.log('Title:', title);
    console.log('Start:', start);
    console.log('End:', end);

    return {
      title: title || 'No Title',
      start: start,  // Use the parsed start time
      end: end,      // Use the calculated end time
      description: entry.journal || '',
      id: entry.id   // Include the id to identify the entry
    };
  });

  // Function to handle event click
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div style={{ height: '80vh' }}>
      <Calendar
        localizer={localizer}
        events={formattedEntries}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        components={{
          event: ({ event }) => (
            <div style={{ fontFamily: 'Poppins, sans-serif', whiteSpace: 'pre-line' }}>
              <strong>{event.title}</strong>
              <br />
              <small>{event.description}</small>
            </div>
          )
        }}
        onSelectEvent={handleSelectEvent} // Add the event handler here
      />

      {/* Modal for displaying event details */}
      <Modal
        isOpen={!!selectedEvent}
        onRequestClose={closeModal}
        contentLabel="Event Details"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '500px'
          }
        }}
      >
        {selectedEvent && (
          <div>
            <h2>{selectedEvent.title}</h2>
            <p><strong>Start:</strong> {moment(selectedEvent.start).format('MMMM D, YYYY h:mm A')}</p>
            <p><strong>End:</strong> {moment(selectedEvent.end).format('MMMM D, YYYY h:mm A')}</p>
            <p><strong>Description:</strong> {selectedEvent.description}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CustomCalendar;
