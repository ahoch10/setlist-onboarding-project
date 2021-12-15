import React, { FC } from 'react'
import { useSetlist } from './useSetlist'
import SingleSetlist from './SingleSetlist'
import AddSetlist from './AddSetlist'

const AllSetlists: FC = () => {

  const { setlists, setSetlists, addSetlist, updateSetlist, deleteSetlist} =
    useSetlist()

  return (
    <div>
      <h1>My Setlists</h1>
        <div className="table">
          <div className="table-row headers">
            <div>Setlist</div>
            <div>Date</div>
          </div>
                {setlists.map((setlist, i) => {
                  return (
                    <SingleSetlist
                      setlist={setlist}
                      key={i}
                      setlists={setlists}
                      setSetlists={setSetlists}
                      updateSetlist={updateSetlist}
                      deleteSetlist={deleteSetlist}
                     />)})}
          <AddSetlist setSetlists={setSetlists} setlists={setlists} addSetlist={addSetlist} />
    </div>
    </div>
  )
}

export default AllSetlists
