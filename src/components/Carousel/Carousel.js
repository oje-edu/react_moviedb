import axios from 'axios'
import React, { useState, useEffect } from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { img300, noPicture } from '../../config/config'
import './Carousel.css'

const handleDragStart = (e) => e.preventDefault()

const Carousel = ({ id, media_type }) => {
  const [credits, setCredits] = useState([])

  const items = credits?.map((c) => (
    <div className='carouselItem' key={c?.name}>
      <img
        src={c.profile_path ? `${img300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className='carouselItem__img'
      />
      <b className='carouselItem__txt'>{c?.name}</b>
    </div>
  ))

  const responsive = {
    0: {
      items: 3
    },
    512: {
      items: 5
    },
    1024: {
      items: 7
    }
  }

  const fetchCredits = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=de-DE`)

    setCredits(data.cast)
  }

  useEffect(() => {
    fetchCredits()
    // eslint-disable-next-line
  }, [])

  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
  )
}

export default Carousel
