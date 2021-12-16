import React, { FC, useState } from 'react'
import { useSetlist } from './useSetlist'
import SingleSetlist from './SingleSetlist'
import AddSetlist from './AddSetlist'
import Setlist from './Setlist'

const AllSetlists: FC = () => {

  const { setlists, setSetlists, addSetlist, updateSetlist, deleteSetlist} =
    useSetlist()
  const [setlistSelected, setSetlistSelected] = useState<number>(null)

  const selectSetlist = (id) => {
    setSetlistSelected(id)
  }

  if (!setlistSelected) {
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
                  <div onClick={()=>selectSetlist(setlist.id)}>
                    <SingleSetlist
                      setlist={setlist}
                      key={i}
                      setlists={setlists}
                      setSetlists={setSetlists}
                      updateSetlist={updateSetlist}
                      deleteSetlist={deleteSetlist}
                     />
                    </div>
                     )})}
          <AddSetlist setSetlists={setSetlists} setlists={setlists} addSetlist={addSetlist} />
    </div>
    </div>
  )} else return (
    <Setlist id={setlistSelected} />
  )
}

export default AllSetlists
