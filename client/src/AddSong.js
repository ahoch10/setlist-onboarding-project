import React , {useState} from 'react'

const AddSong = () => {
  const [song, setSong] = useState({title: "", key: "", instrumentation: "", notes: ""});

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
        .then(res=>console.log("res", res));

    setSong({ title: "", key: "", instrumentation: "", notes: "" });
  }

  return(
      <form onSubmit={handleSubmit}>
      <h3>Add a song</h3>
        Title:<input type="text" name="title" value={song.title} onChange={handleChange} />
        <br />
        Key: <input type="text" name="key"  value={song.key} onChange={handleChange} />
        <br />
        Instrumentation:<input type="text"  value={song.instrumentation} name="instrumentation" onChange={handleChange} />
        <br />
        Notes:<textarea type="text" name="notes" value={song.notes} onChange={handleChange} />
        <br />
        <input type="submit" value="Submit" />
      </form>
  )

}

export default AddSong
