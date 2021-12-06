import React , { FC, useState } from 'react'
import { Song } from './types'

interface AddSongProps {
  songs: array,
  setSongs: Function
}

const AddSong: FC<AddSongProps> = ({setSongs, songs, addSong}) => {
  const [song, setSong] = useState<Song>({title: "", key: "", instrumentation: "", notes: ""});

  const handleChange = (event) => {
    setSong({...song, [event.target.name]: event.target.value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addSong(song)
    setSong({...song, title: "", key: "", instrumentation: "", notes: ""});
  }

  return(
      <form onSubmit={handleSubmit}>
        <div className="table-row">
          <div><input type="input" name="title" placeholder="Title" onChange={handleChange} value={song.title} /></div>
          <div><input type="input" name="key" placeholder="Key" onChange={handleChange} value={song.key} /></div>
          <div><input type="input" name="instrumentation" placeholder="Instrumentation" onChange={handleChange} value={song.instrumentation} /></div>
          <div><input type="input" name="notes" placeholder="Notes"  onChange={handleChange} value={song.notes} /></div>
          <div><button  type="submit">Add Song</button></div>
        </div>
      </form>
  )

}

export default AddSong
