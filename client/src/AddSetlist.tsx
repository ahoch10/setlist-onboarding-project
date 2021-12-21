import React, { useState } from 'react'
import { SetlistInterface } from './types'

interface AddSetlistProps {
  addSetlist: (setlist: SetlistInterface) => void
}

const AddSetlist = ({ addSetlist }: AddSetlistProps) => {
  const [setlist, setSetlist] = useState<SetlistInterface>({
    title: '',
    date: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSetlist({ ...setlist, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    addSetlist(setlist)
    setSetlist({ title: '', date: '' })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="table-row">
        <div>
          <input
            type="input"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={setlist.title}
          />
        </div>
        <div>
          <input
            type="input"
            name="date"
            placeholder="Date"
            onChange={handleChange}
            value={setlist.date}
          />
        </div>
        <div>
          <button type="submit">Add Setlist</button>
        </div>
      </div>
    </form>
  )
}

export default AddSetlist
