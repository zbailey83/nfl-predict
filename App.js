import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    schedule_season: '',
    schedule_week: '',
    schedule_playoff: false,
    team_home: '',
    team_away: '',
    team_favorite_id: '',
    spread_favorite: '',
    over_under_line: '',
    game_month: '',
    game_day_of_week: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/predict', formData);
      alert(`Prediction: ${response.data.prediction}, Probability: ${response.data.probability}`);
    } catch (error) {
      alert('An error occurred');
    }
  };

  return (
    <div>
      <input
        type="text"
        name="schedule_season"
        placeholder="Schedule Season"
        onChange={handleChange}
      />
      <input
        type="text"
        name="schedule_week"
        placeholder="Schedule Week"
        onChange={handleChange}
      />
      <input
        type="checkbox"
        name="schedule_playoff"
        onChange={(e) => setFormData({ ...formData, schedule_playoff: e.target.checked })}
      /> Schedule Playoff
      <input
        type="text"
        name="team_home"
        placeholder="Team Home"
        onChange={handleChange}
      />
      <input
        type="text"
        name="team_away"
        placeholder="Team Away"
        onChange={handleChange}
      />
      <input
        type="text"
        name="team_favorite_id"
        placeholder="Team Favorite ID"
        onChange={handleChange}
      />
      <input
        type="text"
        name="spread_favorite"
        placeholder="Spread Favorite"
        onChange={handleChange}
      />
      <input
        type="text"
        name="over_under_line"
        placeholder="Over Under Line"
        onChange={handleChange}
      />
      <input
        type="text"
        name="game_month"
        placeholder="Game Month"
        onChange={handleChange}
      />
      <input
        type="text"
        name="game_day_of_week"
        placeholder="Game Day of Week"
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Predict</button>
    </div>
  );
}

export default App;
