import React, { useState } from 'react'
import { Song as SongInterface} from './types'
import { Draggable } from 'react-beautiful-dnd'

interface SongProps {
  song: object,
  songs: array,
  setSongs: Function
}

const Song: FC<SongProps> = ({song, songs, setSongs, index}) => {

  const [updateSong, setUpdateSong] = useState<boolean>(false)
  const [updatedSong, setUpdatedSong] = useState<SongInterface>({title: song.title, key: song.key, instrumentation: song.instrumentation, notes: song.notes});

  const handleChange = (event) => {
    setUpdatedSong({...updatedSong, [event.target.name]: event.target.value});
  }

  const handleDelete = (event) => {
    const options = {
      method: 'DELETE'
    }

    fetch(`songs/${song.id}`, options)
        .catch(err=> console.log("err", err));

    //deletes song in the front end
    setSongs(songs => songs.filter(s=> s.id !== song.id))
  }

  const handleUpdate = (event) => {
    event.preventDefault()

    const options = {
      method: 'PUT',
      body: JSON.stringify(updatedSong),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(`songs/${song.id}`, options)
        .then(res=>res.json())
        .then(res=>console.log("res", res))
        .catch(err=> console.log("err", err));

    setUpdateSong(false)

    //updates song in the front end optimistically
    const songIndex: number = songs.findIndex(s=> song.id === s.id)
    let updatedSongs: SongInterface[] = [...songs]
    updatedSongs[songIndex] = updatedSong
    setSongs(updatedSongs)
  }

  if (updateSong) {
    return (<div className="table-row">
      <div><input type="input" name="title" placeholder={updatedSong.title} onChange={handleChange} /></div>
      <div><input type="input" name="key"placeholder={song.key} onChange={handleChange} /></div>
      <div><input type="input" name="instrumentation" placeholder={song.instrumentation} onChange={handleChange} /></div>
      <div><input type="input" name="notes" placeholder={song.notes}  onChange={handleChange}/></div>
      <div><button type="button" onClick={handleUpdate}>Update</button></div>
      <div><button type="button" onClick={handleDelete}>Delete</button></div>
    </div>)
  } else {
  return (  <Draggable draggableId={song.title} index={index}>
              {(provided) => (
                <div key={song.id} className="table-row" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                  <div>{song.title}</div>
                  <div>{song.key}</div>
                  <div>{song.instrumentation}</div>
                  <div>{song.notes}</div>
                  <div><button type="button" onClick={()=>setUpdateSong(true)}>Update</button></div>
                  <div><button type="button" onClick={handleDelete}>Delete</button></div>
                </div>
              )}
            </Draggable>
  ) }

}

export default Song
