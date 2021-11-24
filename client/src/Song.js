import React from 'react'

const Song = (props) => {

  const song = props.song;

  const handleDelete = (event) => {
    const options = {
      method: 'DELETE'
    }

    fetch(`songs/${song.id}`, options)
  }

  return <tr key={song.id} className="table-row">
              <td>{song.title}</td>
              <td>{song.key}</td>
              <td>{song.instrumentation}</td>
              <td>{song.notes}</td>
              <td><button type="button" onClick={handleDelete}>Delete</button></td>
            </tr>

}

export default Song
