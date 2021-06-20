import axios from 'axios'
import React, { useState, useEffect } from 'react'
import CustomPagination from '../../components/Pagination/Pagination'
import SingleContent from '../../components/SingleContent/SingleContent'
import './Angesagt.css'

const Angesagt = () => {
  const [inhalt, setInhalt] = useState([])
  const [seite, setSeite] = useState(1)
  const fetchAngesagt = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${seite}&language=de-DE`)

    // console.log(data)
    // console.log(data.results)
    setInhalt(data.results)
  }

  useEffect(() => {
    fetchAngesagt()
  }, [seite])

  return (
    <div>
      <span className='pageTitle'>Der Heisseste 💩</span>
      <div className='angesagt'>
        {inhalt && inhalt.map((i) => (
          <SingleContent
            key={i.id}
            id={i.id}
            poster={i.poster_path}
            title={i.title || i.name}
            date={i.first_air_date || i.release_date}
            mediaType={i.media_type}
            voteAverage={i.vote_average}
          />
        )
        )}
      </div>
      <CustomPagination setSeite={setSeite} />
    </div>
  )
}

export default Angesagt
