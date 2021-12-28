import React, { FC, useState } from 'react'
import { SetlistInterface, SetlistWithId } from './types'

interface SingleSetlistProps {
  setlist: SetlistWithId
  setlists: SetlistWithId[]
  updateSetlist: (updatedSetlist: SetlistWithId) => void
  deleteSetlist: (setlistid: number) => void
}

const stopPropagationAnd =
  (func: (event: React.SyntheticEvent) => void) =>
  (event: React.SyntheticEvent) => {
    event.stopPropagation()
    func(event)
  }

const stopPropagation = (event: React.SyntheticEvent) => {
  event.stopPropagation()
}

const SingleSetlist = ({
  setlist,
  setlists,
  updateSetlist,
  deleteSetlist,
}: SingleSetlistProps) => {
  const [updateSetlistForm, setUpdateSetlistForm] = useState<boolean>(false)
  const [updatedSetlist, setUpdatedSetlist] = useState<SetlistWithId>({
    id: setlist.id,
    title: setlist.title,
    date: setlist.date,
    user_id: setlist.user_id,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedSetlist({
      ...updatedSetlist,
      [event.target.name]: event.target.value,
    })
  }

  const handleUpdate = (event: React.SyntheticEvent) => {
    event.stopPropagation()
    updateSetlist(updatedSetlist)
    setUpdateSetlistForm(false)
  }

  if (updateSetlistForm) {
    return (
      <div className="table-row">
        <div>
          <input
            type="input"
            name="title"
            placeholder={setlist.title}
            onChange={handleChange}
            onClick={stopPropagation}
          />
        </div>
        <div>
          <input
            type="input"
            name="date"
            placeholder={setlist.date}
            onChange={handleChange}
            onClick={stopPropagation}
          />
        </div>
        <div>
          <button type="button" onClick={stopPropagationAnd(handleUpdate)}>
            Update
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={stopPropagationAnd(() => deleteSetlist(setlist.id))}
          >
            Delete
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="table-row">
        <div>{setlist.title}</div>
        <div>{setlist.date}</div>
        <div>
          <button
            type="button"
            onClick={stopPropagationAnd(() => setUpdateSetlistForm(true))}
          >
            Update
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={stopPropagationAnd(() => deleteSetlist(setlist.id))}
          >
            Delete
          </button>
        </div>
      </div>
    )
  }
}

export default SingleSetlist
