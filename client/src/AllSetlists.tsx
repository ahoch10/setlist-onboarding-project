import React, { FC, useState } from 'react'
import { useSetlist } from './useSetlist'
import SingleSetlist from './SingleSetlist'
import AddSetlist from './AddSetlist'
import Setlist from './Setlist'

const AllSetlists: FC = () => {

  const { setlists, setSetlists, addSetlist, updateSetlist, deleteSetlist} =
    useSetlist()
  const [setlistId, setSetlistId] = useState(null)
  const [setlistTitle, setSetlistTitle] = useState<string>("")
  const [setlistDate, setSetlistDate] = useState<string>("")


  const selectSetlist = (id, title, date) => {
    setSetlistId(id)
    setSetlistTitle(title)
    setSetlistDate(date)
  }

  if (!setlistId) {
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
                  <div key={setlist.id} onClick={()=>selectSetlist(setlist.id, setlist.title, setlist.date)}>
                    <SingleSetlist
                      setlist={setlist}
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
    <Setlist setlistId={setlistId} setlistTitle={setlistTitle} setlistDate={setlistDate} />
  )
}

export default AllSetlists
