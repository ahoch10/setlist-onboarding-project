import { React, useState, useEffect } from 'react'
import { Song as SongInterface, SongWithId } from './types.tsx'

function useSongs() {
  const songs, setSongs = useState<SongWithId[]>([])
  const song, setSong = useState<SongInterface>({ title: "", key: "", instrumentation: "", notes: "" })

  const fetchSongs = () => {
    fetch("/songs").then(
      res => res.json()).then(data => {
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

  const updateSong = (song: songInterface) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify(updatedSong),
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
        .catch(err=> console.log("err", err));
    }

  const handleChange = (event) => {
    setUpdatedSong({...updatedSong, [event.target.name]: event.target.value});
  }

}

export default useSong
