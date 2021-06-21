import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SingleContent from '../../components/SingleContent/SingleContent'
import Genres from '../../components/Genres/Genres'
import useGenre from '../../hooks/useGenre'
import CustomPagination from '../../components/Pagination/Pagination'

const Serien = () => {
  const [genres, setGenres] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])
  const [seite, setSeite] = useState(1)
  const [inhalt, setInhalt] = useState([])
  const [numOfPages, setNumOfPages] = useState()
  const genreforURL = useGenre(selectedGenres)

  const fetchSerien = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=de-DE&sort_by=popularity.desc&include_adult=false&include_video=false&page=${seite}&with_genres=${genreforURL}`)

    // console.log(data)
    setInhalt(data.results)
    setNumOfPages(data.total_pages)
  }

  useEffect(() => {
    window.scroll(0, 0)
    fetchSerien()
    // eslint-disable-next-line
  }, [seite ,genreforURL]);

  return (
    <div>
      <span className='pageTitle'>Serien durchstöbern</span>
      <Genres
        type='tv'
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setSeite={setSeite}
      />
      <div className='angesagt'>
        {inhalt &&
          inhalt.map((i) => (
            <SingleContent
              key={i.id}
              id={i.id}
              poster={i.poster_path}
              title={i.title || i.name}
              date={i.first_air_date || i.release_date}
              // mediaType={i.media_type}
              media_type='tv'
              vote_average={i.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setSeite={setSeite} numOfPages={numOfPages} />
      )}
    </div>
  )
}

export default Serien
