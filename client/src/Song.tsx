import React, { useState } from 'react'
import { SongWithId } from './types'
import { Draggable } from 'react-beautiful-dnd'

interface SongProps {
  song: SongWithId
  songs: SongWithId[]
  updateSong: (song: SongWithId) => void
  deleteSong: (songId: number) => void
  index: number
}

const Song = ({
  song,
  songs,
  updateSong,
  deleteSong,
  index,
}: SongProps) => {
  const [updateSongForm, setUpdateSongForm] = useState<boolean>(false)
  const [updatedSong, setUpdatedSong] = useState<SongWithId>({
    id: song.id,
    title: song.title,
    key: song.key,
    instrumentation: song.instrumentation,
    notes: song.notes,
    order_index: song.order_index,
    setlist_id: song.setlist_id
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedSong({ ...updatedSong, [event.target.name]: event.target.value })
  }

  const handleUpdate = (event: React.SyntheticEvent) => {
    event.preventDefault()
    updateSong(updatedSong)
    setUpdateSongForm(false)
  }

  if (updateSongForm) {
    return (
      <div className="table-row">
        <div>
          <input
            type="input"
            name="title"
            placeholder={song.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="input"
            name="key"
            placeholder={song.key}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="input"
            name="instrumentation"
            placeholder={song.instrumentation}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="input"
            name="notes"
            placeholder={song.notes}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="button" onClick={handleUpdate}>
            Update
          </button>
        </div>
        <div>
          <button type="button" onClick={() => deleteSong(song.id)}>
            Delete
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <Draggable draggableId={String(index)} index={index}>
        {(provided) => (
          <div
            key={song.id}
            className="table-row"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>{song.title}</div>
            <div>{song.key}</div>
            <div>{song.instrumentation}</div>
            <div>{song.notes}</div>
            <div>
              <button type="button" onClick={() => setUpdateSongForm(true)}>
                Update
              </button>
            </div>
            <div>
              <button type="button" onClick={() => deleteSong(song.id)}>
                Delete
              </button>
            </div>
          </div>
        )}
      </Draggable>
    )
  }
}

export default Song
