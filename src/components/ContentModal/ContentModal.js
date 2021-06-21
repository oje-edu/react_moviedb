import React, { useEffect, useState } from 'react'
import Carousel from '../Carousel/Carousel'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import YouTubeIcon from '@material-ui/icons/YouTube'

import './ContentModal.css'
import axios from 'axios'
import { img500, unavailable, unavailableLandscape } from '../../config/config'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    width: '90%',
    height: '80%',
    backgroundColor: 'darkgray',
    border: '1px solid #282c34',
    borderRadius: 10,
    color: 'whitesmoke',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3)
  }
}))

export default function ContentModal ({ children, media_type, id }) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [inhalt, setInhalt] = useState()
  const [trailer, setTrailer] = useState()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const fetchData = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=de-DE`)

    setInhalt(data)
  }
  const fetchTrailer = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=de-DE`)

    // console.log(data)
    setTrailer(data.results[0]?.key)
  }

  useEffect(() => {
    fetchData()
    fetchTrailer()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div
        className='media'
        style={{ cursor: 'pointer' }}
        color='inherit'
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          {inhalt && (
            <div className={classes.paper}>
              <div className='ContentModal'>
                <img className='ContentModal__portrait' alt={inhalt.name || inhalt.title} src={inhalt.poster_path ? `${img500}/${inhalt.poster_path}` : unavailable} />
                <img className='ContentModal__landscape' alt={inhalt.name || inhalt.title} src={inhalt.poster_path ? `${img500}/${inhalt.backdrop_path}` : unavailableLandscape} />
                <div className='ContentModal__about'>
                  <span className='ContentModal__title'>
                    {inhalt.name || inhalt.title} (
                    {(
                      inhalt.first_air_date ||
                      inhalt.release_date ||
                      '-----'
                    ).substring(0, 4)}
                    )
                  </span>
                  {inhalt.tagline && (
                    <i className='tagline'> {inhalt.tagline}</i>
                  )}
                  <span className='ContentModal__description'> {inhalt.overview}</span>
                  <div>
                    <Carousel media_type={media_type} id={id} />
                  </div>
                  <Button
                    variant='contained'
                    startIcon={<YouTubeIcon />}
                    color='secondary'
                    target='_blank'
                    href={`https://www.youtube.com/watch?v=${trailer}`}
                  >
                    Vorschau
                  </Button>
                </div>
              </div>
            </div>)}
        </Fade>
      </Modal>
    </>
  )
}
