import React, { useEffect } from 'react'
import { Chip } from '@material-ui/core'
import axios from 'axios'

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setSeite
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...setSelectedGenres, genre])
    setGenres(genres.filter((g) => g.id !== genre.id))
    setSeite(1)
  }
  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    )
    setGenres([...genres, genre])
    setSeite(1)
  }
  const fetchGenres = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REAP_APP_API_KEY}&language=de-DE`)
    setGenres(data.genres)
  }

  // console.log(genres)

  useEffect(() => {
    fetchGenres()

    return () => {
      setGenres({})
    } // eslint-disable-next-line
  }, [])

  return (
    <div style={{ padding: '6px 0' }}>
      {selectedGenres && selectedGenres.map((genre) => (
        <Chip
          key={genre.id}
          style={{ margin: 2 }}
          label={genre.name}
          size='small'
          color='primary'
          clickable
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres.map((genre) => (
        <Chip
          key={genre.id}
          style={{ margin: 2 }}
          label={genre.name}
          size='small'
          clickable
          onClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  )
}

export default Genres
