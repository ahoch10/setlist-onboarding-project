import React from 'react'

const AddSong = () => {

  return(
      <form>
      <h3>Add a song</h3>
        Title:<input type="text" name="title" />
        <br />
        Key: <input type="text" name="key" />
        <br />
        Instrumentation:<input type="text" name="instrumentation" />
        <br />
        Notes:<textarea type="text" name="notes" />
        <br />
        <input type="submit" value="Submit" />
      </form>
  )

}

export default AddSong
