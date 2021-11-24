import React, {useState} from 'react'

const Song = (props) => {
  const [updateSong, setUpdateSong] = useState(false)
  const [updatedSong, setUpdatedSong] = useState ({ title: "", key: "", instrumentation: "", notes: "" });

  const song = props.song;

  const handleDelete = (event) => {
    const options = {
      method: 'DELETE'
    }

    fetch(`songs/${song.id}`, options)
  }

  const handleUpdate = (event) => {
    const options = {
      method: 'PUT',
      body: updatedSong
    }

    fetch(`songs/${song.id}`, options)
  }

  if (updateSong) {
    return (<tr>
      <td><input type="input" placeholder={song.title} /></td>
      <td><input type="input" placeholder={song.key} /></td>
      <td><input type="input" placeholder={song.instrumentation} /></td>
      <td><input type="input" placeholder={song.notes} /></td>
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
