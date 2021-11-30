import React, {useState} from 'react'

type SongProps = {
  song: object;
  songs: array;
  setSongs: Function;
}

const Song: FC<SongProps> = ({song, songs, setSongs}) => {

  const [updateSong, setUpdateSong] = useState(false)
  const [updatedSong, setUpdatedSong] = useState({title: song.title, key: song.key, instrumentation: song.instrumentation, notes: song.notes});

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
    const songIndex = songs.findIndex(s=> song.id === s.id)
    let updatedSongs = [...songs]
    updatedSongs[songIndex] = updatedSong
    setSongs(updatedSongs)
  }

  if (updateSong) {
    return (<tr>
      <td><input type="input" name="title" placeholder={updatedSong.title} onChange={handleChange} /></td>
      <td><input type="input" name="key"placeholder={song.key} onChange={handleChange} /></td>
      <td><input type="input" name="instrumentation" placeholder={song.instrumentation} onChange={handleChange} /></td>
      <td><input type="input" name="notes" placeholder={song.notes}  onChange={handleChange}/></td>
      <td><button type="button" onClick={handleDelete}>Delete</button></td>
      <td><button type="button" onClick={handleUpdate}>Update</button></td>
    </tr>)
  } else {
  return (  <tr key={song.id} className="table-row">
              <td>{song.title}</td>
              <td>{song.key}</td>
              <td>{song.instrumentation}</td>
              <td>{song.notes}</td>
              <td><button type="button" onClick={handleDelete}>Delete</button></td>
              <td><button type="button" onClick={()=>setUpdateSong(true)}>Update</button></td>
            </tr>
  ) }

}

export default Song
