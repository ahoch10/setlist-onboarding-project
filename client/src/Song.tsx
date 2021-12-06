import React, { useState } from 'react'
import { Song as SongInterface} from './types'

interface SongProps {
  song: object,
  songs: array,
  setSongs: Function
}

const Song: FC<SongProps> = ({song, songs, updateSong, deleteSong}) => {
  const [updateSongForm, setUpdateSongForm] = useState<boolean>(false)
  const [updatedSong, setUpdatedSong] = useState<SongInterface>({id: song.id, title: song.title, key: song.key, instrumentation: song.instrumentation, notes: song.notes});

  const handleChange = (event) => {
    setUpdatedSong({...updatedSong, [event.target.name]: event.target.value});
  }

  //const handleDelete = (event) => {
  //  const options = {
  //    method: 'DELETE'
  //  }

  //  fetch(`songs/${song.id}`, options)
  //      .catch(err=> console.log("err", err));

  //  //deletes song in the front end
  //  setSongs(songs => songs.filter(s=> s.id !== song.id))
  //}

  const handleUpdate = (event) => {
    event.preventDefault()
    updateSong(updatedSong)

    setUpdateSongForm(false)

    ////updates song in the front end optimistically
    //const songIndex: number = songs.findIndex(s=> song.id === s.id)
    //let updatedSongs: SongInterface[] = [...songs]
    //updatedSongs[songIndex] = updatedSong
    //setSongs(updatedSongs)
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
  return (  <div key={song.id} className="table-row">
              <div>{song.title}</div>
              <div>{song.key}</div>
              <div>{song.instrumentation}</div>
              <div>{song.notes}</div>
              <div><button type="button" onClick={()=>setUpdateSongForm(true)}>Update</button></div>
              <div><button type="button" onClick={() => deleteSong(song.id)}>Delete</button></div>
            </div>
  ) }

}

export default Song
