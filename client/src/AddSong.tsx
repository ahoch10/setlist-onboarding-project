import React , { FC, useState } from 'react'
import { Song } from './types'

interface AddSongProps {
  songs: array,
  setSongs: Function
}

const AddSong: FC<AddSongProps> = ({setSongs, songs}) => {
  const [song, setSong] = useState<Song>({title: "", key: "", instrumentation: "", notes: ""});

  const handleChange = (event) => {
    setSong({...song, [event.target.name]: event.target.value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(song);

    const options = {
      method: 'POST',
      body: JSON.stringify(song),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch('/songs', options)
        .then(res=>res.json())
        .then(res=>console.log("res", res))
        .catch(err=> console.log("err", err));

    //updates UI
    setSongs([...songs, song])

    //resets form
    setSong({ title: "", key: "", instrumentation: "", notes: "" });
  }

  return(
      <form onSubmit={handleSubmit}>
        <div className="table-row">
          <div><input type="input" name="title" placeholder="Title" onChange={handleChange} /></div>
          <div><input type="input" name="key" placeholder="Key" onChange={handleChange} /></div>
          <div><input type="input" name="instrumentation" placeholder="Instrumentation" onChange={handleChange} /></div>
          <div><input type="input" name="notes" placeholder="Notes"  onChange={handleChange}/></div>
          <div><button  type="submit">Add Song</button></div>
        </div>
      </form>
  )

}

export default AddSong
