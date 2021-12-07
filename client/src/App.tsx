import React, { FC } from 'react'
import AddSong from "./AddSong"
import Song from "./Song"
import { useSong } from './useSong'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { SongWithId } from './types'

const App: FC = () => {

  const {songs, setSongs, addSong, updateSong, deleteSong} = useSong();

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const updatedSongs:SongWithId[] = Array.from(songs);
    const [reorderedSong]:SongWithId = updatedSongs.splice(result.source.index, 1);
    updatedSongs.splice(result.destination.index, 0, reorderedSong);
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
                return  <Song song={song} key={i} index={i} songs={songs} setSongs={setSongs} updateSong={updateSong} deleteSong={deleteSong} />
              })}
              {provided.placeholder}
              </div>
            )}
          </Droppable>
          <AddSong setSongs={setSongs} songs={songs} addSong={addSong}/>
        </div>
      </DragDropContext>

    </div>
  );
}

export default App;
