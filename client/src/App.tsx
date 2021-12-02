import React, { FC, useState, useEffect } from 'react'
import AddSong from "./AddSong"
import Song from "./Song"
import { SongWithId } from './types'

const App: FC = () => {

  const [songs, setSongs] = useState<SongWithId[]>([]);

  useEffect(()=> {
    fetch("/songs").then(
      res => res.json()).then(data => {
      setSongs(data.songs)})
        .catch(err=> console.log("err", err));
  }, []);

  return (
    <div>
      <h1>My Setlist</h1>

      <div className="table">
        <div className="table-row headers">
          <div>Song</div>
          <div>Key</div>
          <div>Instrumentation</div>
          <div>Notes</div>
          <div></div>
          <th></th>
        </div>
        {songs.map((song, i)=>{
          return  <Song song={song} key={i} songs={songs} setSongs={setSongs} />
        })}
        <AddSong setSongs={setSongs} songs={songs} />
      </div>

    </div>
  );
}

export default App;
