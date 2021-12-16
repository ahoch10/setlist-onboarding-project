import { useState, useEffect } from 'react'
import { Song as SongInterface, SongWithId } from './types.tsx'

export const useSong = (setlistId) => {
  const [songs, setSongs] = useState<SongWithId[]>([])

  useEffect(()=> {
    fetchSongs()
  }, []);

  const fetchSongs = () => {
    fetch(`/setlists/${setlistId}/songs`).then(
      res => res.json()).then(data => {
        setSongs(data.songs)})
        .catch(err=> console.log("err fetching songs", err));
  }

  const addSong = (song:SongInterface) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(song),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch('/songs', options)
        .then(res=>{
            if (res.ok) {
              fetchSongs(setlistId)
              }
            })
        .catch(err=> console.log("err", err));
  }

  const updateSong = (song:SongWithId) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify(song),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(`songs/${song.id}`, options)
        .then(res=>{
            if (res.ok) {
              fetchSongs(setlistId)
              }
            })
        .catch(err=> console.log("err", err));
  }

  const deleteSong = (songId:number) => {
    const options = {
      method: 'DELETE'
    }

    fetch(`songs/${songId}`, options)
        .then(res=> {
            if (res.ok) {
              fetchSongs(setlistId)
            }
          })
        .catch(err=> console.log("err", err));
    }

  const reorderSongs = (songs:SongWithId[]) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify(songs),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch('/songs', options)
      .then(res=> {
        console.log(res)
        })
      .catch(err=> console.log("err", err))
  }


  return { songs, setSongs, addSong, updateSong, deleteSong, reorderSongs }
}

