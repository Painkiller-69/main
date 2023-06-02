import React, { useState } from 'react';

const playerData = [
  { name: 'Player1', team: 'Team1', credits: 10 },
  { name: 'Player2', team: 'Team1', credits: 9 },
  { name: 'Player3', team: 'Team2', credits: 8 },
  { name: 'Player4', team: 'Team1', credits: 9 },
  { name: 'Player5', team: 'Team2', credits: 10 },
];

const App = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [team1Count, setTeam1Count] = useState(0);
  const [team2Count, setTeam2Count] = useState(0);
  const [team1Credits, setTeam1Credits] = useState(0);
  const [team2Credits, setTeam2Credits] = useState(0);

  const handlePlayerSelection = (player) => {
    const isSelected = selectedPlayers.some((p) => p.name === player.name);
    if (isSelected) {
      // Remove player
      setSelectedPlayers(selectedPlayers.filter((p) => p.name !== player.name));
      if (player.team === 'Team1') {
        setTeam1Count(team1Count - 1);
        setTeam1Credits(team1Credits - player.credits);
      } else if (player.team === 'Team2') {
        setTeam2Count(team2Count - 1);
        setTeam2Credits(team2Credits - player.credits);
      }
    } else {
      // Add player
      setSelectedPlayers([...selectedPlayers, player]);
      if (player.team === 'Team1') {
        setTeam1Count(team1Count + 1);
        setTeam1Credits(team1Credits + player.credits);
      } else if (player.team === 'Team2') {
        setTeam2Count(team2Count + 1);
        setTeam2Credits(team2Credits + player.credits);
      }
    }
  };

  return (
    <div>
      <h1>Player List</h1>
      {playerData.map((player) => (
        <div key={player.name}>
          <p>{`Name: ${player.name}`}</p>
          <p>{`Team: ${player.team}`}</p>
          <p>{`Credits: ${player.credits}`}</p>
          <button onClick={() => handlePlayerSelection(player)}>
            {selectedPlayers.some((p) => p.name === player.name) ? 'Remove' : 'Add'}
          </button>
          <hr />
        </div>
      ))}
      <h2>Team Summary</h2>
      <p>{`Team1: ${team1Count}`}</p>
      <p>{`Team1 Credits: ${team1Credits}`}</p>
      <p>{`Team2: ${team2Count}`}</p>
      <p>{`Team2 Credits: ${team2Credits}`}</p>
    </div>
  );
};

export default App;
