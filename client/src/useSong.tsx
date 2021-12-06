import { useState, useEffect } from 'react'
import { Song as SongInterface, SongWithId } from './types.tsx'

export const useSong = (songId) => {
  const [songs, setSongs] = useState<SongWithId[]>([])
  const [songData, setSongData] = useState<SongInterface>({ title: "", key: "", instrumentation: "", notes: "" })

  useEffect(()=> {
    fetchSongs()
  }, []);

  const fetchSongs = () => {
    fetch("/songs").then(
      res => res.json()).then(data => {
        console.log("in fetch songs function...")
        setSongs(data.songs)})
        .catch(err=> console.log("err", err));
  }

  const addSong = (song: SongInterface) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(song),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch('/songs', options)
        .then(res=>res.json())
        .then(res=>console.log("res", res))
        .catch(err=> console.log("err", err));
  }

  const updateSong = (song: SongInterface) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify(song),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(`songs/${song.id}`, options)
        .then(res=>res.json())
        .then(res=>console.log("res", res))
        .catch(err=> console.log("err", err));
  }

  const deleteSong = (songId) => {
    const options = {
      method: 'DELETE'
    }

    fetch(`songs/${songId}`, options)
        .then(res=> {
            console.log("res", res)
            if (res.ok) {
              console.log("fetching songs...")
              fetchSongs()
            }
          })
        .catch(err=> console.log("err", err));
    }

  const handleChange = (event) => {
    setSongData({...songData, [event.target.name]: event.target.value});
  }

  return { songs, setSongs, songData, setSongData, fetchSongs, addSong, updateSong, deleteSong, handleChange }
}

