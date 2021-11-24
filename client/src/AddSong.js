import React from 'react'
import useInput from './useInput'

const AddSong = () => {
  const title = useInput("")
  const key = useInput("")
  const instrumentation = useInput("")
  const notes = useInput("")

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("title", title.value)
    console.log("key", key.value)
    console.log("instrumenation", instrumentation.value)
    console.log("notes", notes.value)
  }
  return(
      <form onSubmit={handleSubmit}>
      <h3>Add a song</h3>
        Title:<input type="text" name="title" {...title} />
        <br />
        Key: <input type="text" name="key" {...key} />
        <br />
        Instrumentation:<input type="text" name="instrumentation" {...instrumentation} />
        <br />
        Notes:<textarea type="text" name="notes" {...notes} />
        <br />
        <input type="submit" value="Submit" />
      </form>
  )

}

export default AddSong
