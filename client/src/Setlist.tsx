import React, { FC, useState } from 'react'
import AddSong from './AddSong'
import Song from './Song'
import { useSong } from './useSong'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { SongWithId } from './types'
import AllSetlists from './AllSetlists'

type View = "single-setlist" | "all-setlists"

const Setlist: FC = ({setlistId, setlistTitle, setlistDate}) => {
  const { songs, setSongs, addSong, updateSong, deleteSong, reorderSongs } =
    useSong(setlistId)
  const [view, setView] = useState<View>("single-setlist")

  const changeView = () => {
    setView("all-setlists")
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return
    const updatedSongs: SongWithId[] = Array.from(songs)
    const [reorderedSong]: SongWithId = updatedSongs.splice(
      result.source.index,
      1
    )
    updatedSongs.splice(result.destination.index, 0, reorderedSong)
    setSongs(updatedSongs)

    const reorderedSongs: SongWithId[] = updatedSongs.map((song, index) => {
      song.order_index = index
      return song
    })

    reorderSongs(reorderedSongs)
  }

  const createPlaylist = () => {
    const playlistData = {
        "playlist_title": `${setlistTitle} ${setlistDate}`,
        "song_names": songs}

    const options = {
      method: 'POST',
      body: JSON.stringify(playlistData),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch("/playlist", options)
      .then(res=> {
        if (res.ok) {
          window.alert("playlist created")
        }
      })
  }

  if (view === "single-setlist") {
  return (
    <div>
      <h2>{setlistTitle} {setlistDate}</h2>
      <button onClick={changeView}>Back to all shows</button>
      <button onClick={createPlaylist}>Create Spotify playlist</button>
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
              <div
                className="songs"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {songs.map((song, i) => {
                  return (
                    <Song
                      song={song}
                      key={i}
                      index={i}
                      songs={songs}
                      setSongs={setSongs}
                      updateSong={updateSong}
                      deleteSong={deleteSong}
                    />
                  )
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <AddSong setlistId={setlistId} setSongs={setSongs} songs={songs} addSong={addSong} />
        </div>
      </DragDropContext>
    </div>
  )} else return <AllSetlists />
}

export default Setlist
