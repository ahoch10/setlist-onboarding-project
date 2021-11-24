import React, { useState, useEffect } from 'react'
import AddSong from "./AddSong"

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
        </tr>
        {songs.map((song, i)=>{
          return <tr key={i} className="table-row">
              <td>{song.title}</td>
              <td>{song.key}</td>
              <td>{song.instrumentation}</td>
              <td>{song.notes}</td>
              <td>Delete</td>
            </tr>
        })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
