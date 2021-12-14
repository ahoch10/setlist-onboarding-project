import { useState, useEffect } from 'react'
import { SetlistInterface, SetlistWithId } from './types.tsx'

export const useSong = (songId) => {
  const [setlists, setSetlists] = useState<SetlistWithId[]>([])

  useEffect(()=> {
    fetchSetlists()
  }, []);

  const fetchSetlists = () => {
    fetch("/setlists").then(
      res => res.json()).then(data => {
        setSetlists(data.setlists)})
        .catch(err=> console.log("err", err));
  }

  const addSetlist = (setlist:SetlistInterface) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(setlist),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch('/setlists', options)
        .then(res=>{
            if (res.ok) {
              fetchSetlists()
              }
            })
        .catch(err=> console.log("err", err));
  }

  const updateSetlist = (setlist:SetlistWithId) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify(setlist),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(`setlist/${setlist.id}`, options)
        .then(res=>{
            if (res.ok) {
              fetchSetlists()
              }
            })
        .catch(err=> console.log("err", err));
  }

  const deleteSetlist = (setlistId:number) => {
    const options = {
      method: 'DELETE'
    }

    fetch(`setlists/${setlistId}`, options)
        .then(res=> {
            if (res.ok) {
              fetchSetlists()
            }
          })
        .catch(err=> console.log("err", err));
    }

  return { setlists, setSetlists, addSetlist, updateSetlist, deleteSetlist }
}

