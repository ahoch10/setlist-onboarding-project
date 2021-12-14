import React, { FC, useState } from 'react'
import { SetlistInterface } from './types'

const AddSetlist: FC = ({setSetlists, setlists, addSetlist}) => {
  const [setlist, setSetlist] = useState<SetlistInterface>({title: "", date: ""})

  const handleChange = (event) => {
    setSetlist({...setlist, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addSetlist(setlist)
    setSetlist({title: "", date: ""})
  }

  return(
    <form onSubmit={handleSubmit}>
      <div className="table-row">
          <div><input type="input" name="title" placeholder="Title" onChange={handleChange} value={setlist.title} /></div>
          <div><input type="input" name="date" placeholder="Date" onChange={handleChange} value={setlist.key} /></div>
      </div>
    </form>
  )

}

export default AddSetlist
