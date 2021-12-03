import React, { FC, useState, useEffect } from 'react';
import AddSong from "./AddSong";
import Song from "./Song";
import { SongWithId } from './types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const App: FC = () => {

  const [songs, setSongs] = useState<SongWithId[]>([]);

  useEffect(()=> {
    fetch("/songs").then(
      res => res.json()).then(data => {
      setSongs(data.songs)})
        .catch(err=> console.log("err", err));
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    console.log("result", result)
    const updatedSongs = Array.from(songs);
    console.log("updatedSongs before splice", updatedSongs)
    const reorderedSong = updatedSongs.splice(result.source.index, 1);
    updatedSongs.splice(result.destination.index, 0, reorderedSong);
    console.log("updatedSongs after splice", updatedSongs)
    setSongs(updatedSongs)
  }

  return (
    <div>
      <h1>My Setlist</h1>
    <DragDropContext onDragEnd={handleDragEnd}>
        <div className="table">
          <div className="table-row headers">
            <div>Song</div>
            <div>Key</div>
            <div>Instrumentation</div>
            <div>Notes</div>
            <div></div>
            <div></div>
          </div>
        <Droppable droppableId="songs">
          {(provided) => (
            <div className="songs" {...provided.droppableProps} ref={provided.innerRef}>
              {songs.map((song, i)=>{
                return <Song key={song.id} song={song} songs={songs} setSongs={setSongs} index={i}/>
              })}
              {provided.placeholder}
            </div>)}
        </Droppable>
          <AddSong setSongs={setSongs} songs={songs} />
        </div>
    </DragDropContext>
    </div>
  );
}

export default App;
