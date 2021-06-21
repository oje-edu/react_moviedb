import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SingleContent from '../../components/SingleContent/SingleContent'
import Genres from '../../components/Genres/Genres'
import './Filme.css'
import useGenre from '../../hooks/useGenre'
import CustomPagination from '../../components/Pagination/Pagination'

const Filme = () => {
  const [genres, setGenres] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])
  const [seite, setSeite] = useState(1)
  const [inhalt, setInhalt] = useState([])
  const [numOfSeiten, setNumOfSeiten] = useState()
  const genreforURL = useGenre(selectedGenres)

  const fetchFilme = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=de-DE&sort_by=popularity.desc&include_adult=true&include_video=false&page=${seite}&with_genres=${genreforURL}`)
    // const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REAP_APP_API_KEY}&language=de-DE&sort_by=popularity.desc&include_adult=true&include_video=false=${seite}`)

    // console.log(data)
    setInhalt(data.results)
    setNumOfSeiten(data.total_pages)
  }

  useEffect(() => {
    window.scroll(0, 0)
    fetchFilme()
    // eslint-disable-next-line
  }, [seite, genreforURL]);

  return (
    <div>
      <span className='pageTitle'>Filme</span>
      <Genres
        type='movie'
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setSeite={setSeite}
      />
      <div className='angesagt'>
        {inhalt && inhalt.map((i) => (
          <SingleContent
            key={i.id}
            id={i.id}
            poster={i.poster_path}
            title={i.title || i.name}
            date={i.first_air_date || i.release_date}
            mediaType='movie'
            voteAverage={i.vote_average}
          />
        )
        )}
      </div>
      {numOfSeiten > 1 && (
        <CustomPagination setSeite={setSeite} numOfSeiten={numOfSeiten} />
      )}
    </div>
  )
}

export default Filme
