import React, { useState } from 'react'
import { Song } from './types'

interface AddSongProps {
  addSong: (song: Song) => void
  setlistId: number
}

const AddSong = ({ setlistId, addSong }: AddSongProps) => {
  const [song, setSong] = useState<Song>({
    title: '',
    key: '',
    instrumentation: '',
    notes: '',
    setlist_id: setlistId,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSong({ ...song, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    addSong(song)
    setSong({
      ...song,
      title: '',
      key: '',
      instrumentation: '',
      notes: '',
      setlist_id: setlistId,
    })
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
            value={song.title}
          />
        </div>
        <div>
          <input
            type="input"
            name="key"
            placeholder="Key"
            onChange={handleChange}
            value={song.key}
          />
        </div>
        <div>
          <input
            type="input"
            name="instrumentation"
            placeholder="Instrumentation"
            onChange={handleChange}
            value={song.instrumentation}
          />
        </div>
        <div>
          <input
            type="input"
            name="notes"
            placeholder="Notes"
            onChange={handleChange}
            value={song.notes}
          />
        </div>
        <div>
          <button type="submit">Add Song</button>
        </div>
      </div>
    </form>
  )
}

export default AddSong
