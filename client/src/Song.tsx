import React, { useState } from 'react'
import { Song as SongInterface} from './types'
import { Draggable } from 'react-beautiful-dnd'

interface SongProps {
  song: object,
  songs: array,
  setSongs: Function
}

const Song: FC<SongProps> = ({song, songs, updateSong, deleteSong, index}) => {
  const [updateSongForm, setUpdateSongForm] = useState<boolean>(false)
  const [updatedSong, setUpdatedSong] = useState<SongInterface>({id: song.id, title: song.title, key: song.key, instrumentation: song.instrumentation, notes: song.notes});

  const handleChange = (event) => {
    setUpdatedSong({...updatedSong, [event.target.name]: event.target.value});
  }

  const handleUpdate = (event) => {
    event.preventDefault()
    updateSong(updatedSong)
    setUpdateSongForm(false)
  }

  if (updateSongForm) {
    return (<div className="table-row">
      <div><input type="input" name="title" placeholder={song.title} onChange={handleChange} /></div>
      <div><input type="input" name="key"placeholder={song.key} onChange={handleChange} /></div>
      <div><input type="input" name="instrumentation" placeholder={song.instrumentation} onChange={handleChange} /></div>
      <div><input type="input" name="notes" placeholder={song.notes}  onChange={handleChange}/></div>
      <div><button type="button" onClick={handleUpdate}>Update</button></div>
      <div><button type="button" onClick={() => deleteSong(song.id)}>Delete</button></div>
    </div>)
  } else {
  return (<Draggable draggableId={String(song.id)} index={index}>
            {provided =>  (
              <div key={song.id} className="table-row" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <div>{song.title}</div>
                <div>{song.key}</div>
                <div>{song.instrumentation}</div>
                <div>{song.notes}</div>
                <div><button type="button" onClick={()=>setUpdateSongForm(true)}>Update</button></div>
                <div><button type="button" onClick={() => deleteSong(song.id)}>Delete</button></div>
              </div>
            )}
          </Draggable>
  ) }

}

export default Song
