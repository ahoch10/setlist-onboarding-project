import React, { useState, useEffect } from 'react'
import AddSong from "./AddSong"
import Song from "./Song"

function App() {

  const [songs, setSongs] = useState([]);

  useEffect(()=> {
    fetch("/songs").then(
      res => res.json()).then(data => {
      setSongs(data.songs)})
  }, []);

  return (
    <div>
      <h1>My Setlist</h1>

      <AddSong />

      <table>
        <tbody>
        <tr className="table-row">
          <th>Song</th>
          <th>Key</th>
          <th>Instrumentation</th>
          <th>Notes</th>
          <th></th>
          <th></th>
        </tr>
        {songs.map((song)=>{
          return  <Song song={song} />
        })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
