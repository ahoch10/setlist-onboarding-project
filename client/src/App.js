import React, { useState, useEffect } from 'react'

function App() {

  const [songs, setSongs] = useState([]);

  useEffect(()=> {
    fetch("/songs").then(
      res => res.json()).then(data => {
      console.log("data", data)
      setSongs(data.songs)})
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <h1>My Setlist</h1>
      <form onSubmit={handleSubmit}>
      <h3>Add a song</h3>
        Title:<input type="text" name="title" />
        <br />
        Key: <input type="text" name="key" />
        <br />
        Instrumentation:<input type="text" name="instrumentation" />
        <br />
        Notes:<textarea type="text" name="notes" />
        <br />
        <input type="submit" value="Submit" />
      </form>

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
