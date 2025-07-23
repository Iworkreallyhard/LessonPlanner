import { useEffect, useState } from 'react';
import axios from 'axios';
import LoginRegister from './pages/LoginRegister';

function App() {
  const [events, setEvents] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loadEvents = async () => {
    try {
      const res = await axios.get('/api/events');
      setEvents(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  const addEvent = async () => {
    await axios.post('/api/events', { title: 'New Event', date: new Date() });
    loadEvents();
  };

  useEffect(() => {
    loadEvents();
  }, []);

  if (!isAuthenticated) {
    return <LoginRegister />;
  }

  return (
    <div>
      <h1>Your Calendar</h1>
      <button onClick={addEvent}>Add Event</button>
      <ul>
        {events.map(e => (
          <li key={e._id}>{e.title} - {new Date(e.date).toLocaleDateString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
