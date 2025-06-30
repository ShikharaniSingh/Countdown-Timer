import React, { useState } from 'react';
import CountdownTimer from './CountdownTimer';

function formatAMPM(dateStr) {
  const date = new Date(dateStr);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours || 12;
  const mins = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}:${mins} ${ampm}`;
}

function App() {
  const [timers, setTimers] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const addTimer = () => {
    if (!date || !time) return alert("Please select both date and time");

    const target = new Date(`${date}T${time}`);
    if (target <= new Date()) return alert("Please select a future time");

    setTimers([...timers, target.toString()]);
    setDate('');
    setTime('');
  };

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <h1>🕒 Countdown Timer</h1>

        <div className="input-area">
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
          <button onClick={addTimer}>Add Countdown</button>
        </div>

        <label className="toggle">
          <input type="checkbox" onChange={() => setDarkMode(!darkMode)} />
          Toggle Dark Mode
        </label>

        <div className="timers">
          {timers.map((time, i) => (
            <div key={i} className="timer-box">
              <p className="target-info">Target: {formatAMPM(time)}</p>
              <CountdownTimer targetTime={time} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
