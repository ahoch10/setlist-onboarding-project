import React, { FC, useState } from 'react'
import { SetlistWithId } from './types'

const SingleSetlist: FC = ({setlist, setlists, updateSetlist, deleteSetlist}) => {
  const [updateSetlistForm, setUpdateSetlistForm] = useState<boolean>(false)
  const [updatedSetlist, setUpdatedSetlist] = useState<SetlistWithId>({id: setlist.id, title: setlist.title, date: setlist.date})

  const handleChange = (event) => {
    setUpdatedSetlist({...updatedSetlist, [event.target.name]: event.target.value});
  }

  const handleUpdate = (event) => {
    event.preventDefault()
    updateSetlist(updatedSetlist)
    setUpdateSetlistForm(false)
  }

  if (updateSetlistForm) {
    return (
      <div className="table-row">
        <div><input type="input" name="title" placeholder={setlist.title} onChange={handleChange} /></div>
        <div><input type="input" name="date" placeholder={setlist.date} onChange={handleChange} /></div>
        <div><button type="button" onClick={handleUpdate}>Update</button></div>
        <div><button type="button" onClick={() => deleteSong(setlist.id)}>Delete</button></div>
      </div>
    )
  } else {
    return (
      <div className="table-row">
        <div>{setlist.title}</div>
        <div>{setlist.date}</div>
        <div><button type="button" onClick={()=>setUpdateSetlistForm(true)}>Update</button></div>
        <div><button type="button" onClick={() => deleteSong(setlist.id)}>Delete</button></div>
      </div>
    )
  }

}

export default SingleSetlist
