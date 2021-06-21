import { useEffect } from 'react'
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
    setSelectedGenres([...selectedGenres, genre])
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
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=de-DE`
    )
    setGenres(data.genres)
  }

  useEffect(() => {
    fetchGenres()

    return () => {
      setGenres({}) // unmounting
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div style={{ padding: '6px 0' }}>
      {selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          color='primary'
          clickable
          size='small'
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          clickable
          size='small'
          onClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  )
}

export default Genres
