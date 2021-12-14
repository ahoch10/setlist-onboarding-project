import React, { FC } from 'react'
import AddSong from './AddSong'
import Song from './Song'
import { useSong } from './useSong'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { SongWithId } from './types'

const App: FC = () => {

  return (
    <div>
    <h1 className="welcome">Welcome</h1>
    <button type="button">Login with Spotify</button>
    </div>
  )

}

export default App
