import axios from 'axios'
import React, { useState, useEffect } from 'react'
import SingleContent from '../../components/SingleContent/SingleContent'
import CustomPagination from '../../components/Pagination/Pagination'
import './Angesagt.css'

const Angesagt = () => {
  const [seite, setSeite] = useState(1)
  const [inhalt, setInhalt] = useState([])

  const fetchAngesagt = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${seite}`)

    // console.log(data)
    // console.log(data.results)
    setInhalt(data.results)
  }

  useEffect(() => {
    window.scroll(0, 0)
    fetchAngesagt()
    // eslint-disable-next-line
  }, [seite])

  return (
    <div>
      <span className='pageTitle'>Der aktuelle 💩</span>
      <div className='angesagt'>
        {inhalt &&
          inhalt.map((i) => (
            <SingleContent
              key={i.id}
              id={i.id}
              poster={i.poster_path}
              title={i.title || i.name}
              date={i.first_air_date || i.release_date}
              media_type={i.media_type}
              vote_average={i.vote_average}
            />
          ))}
      </div>
      <CustomPagination setSeite={setSeite} />
    </div>
  )
}

export default Angesagt
