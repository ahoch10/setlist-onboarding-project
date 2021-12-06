import React, { FC } from 'react'
import AddSong from "./AddSong"
import Song from "./Song"
import { useSong } from './useSong'

const App: FC = () => {

  const {songs, setSongs, addSong, updateSong, deleteSong} = useSong();

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
          <div></div>
        </div>
        {songs.map((song, i)=>{
          return  <Song song={song} key={i} songs={songs} setSongs={setSongs} updateSong={updateSong} deleteSong={deleteSong} />
        })}
        <AddSong setSongs={setSongs} songs={songs} addSong={addSong}/>
      </div>

    </div>
  );
}

export default App;
