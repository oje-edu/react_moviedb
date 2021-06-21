import { TextField, createMuiTheme, ThemeProvider, Button, Tabs, Tab } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import CustomPagination from '../../components/Pagination/Pagination'
import SingleContent from '../../components/SingleContent/SingleContent'
import SearchIcon from '@material-ui/icons/Search'
import './Suche.css'

const Suche = () => {
  const [type, setType] = useState(0)
  const [seite, setSeite] = useState(1)
  const [suchText, setSuchText] = useState('')
  const [inhalt, setInhalt] = useState('')
  const [numOfPages, setNumOfPages] = useState()

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#fff'
      }
    }
  })

  const fetchSuche = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}?api_key=${process.env.REACT_APP_API_KEY}&language=de-DE&query=${suchText}&page=${seite}&include_adult=true`)

    setInhalt(data.results)
    setNumOfPages(data.total_pages)
  }

  useEffect(() => {
    window.scroll(0, 0)
    fetchSuche()
    // eslint-disable-next-line
  }, [type, seite])

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: 'flex', margin: '15px 0' }}>
          <TextField
            style={{ flex: 1 }}
            className='searchBox'
            label='Suche'
            variant='filled'
            onChange={(e) => setSuchText(e.target.value)}
          />

          <Button
            variant='contained'
            style={{ marginLeft: 10 }}
            onClick={fetchSuche}
          >
            <SearchIcon />
          </Button>
        </div>

        <Tabs
          value={type}
          indicatorColor='primary'
          textColor='primary'
          onChange={(event, newValue) => {
            setType(newValue)
            setSeite(1)
          }}
          style={{ paddingBottom: 5 }}
        >
          <Tab style={{ width: '50%' }} label='Filme suchen' />
          <Tab style={{ width: '50%' }} label='Serien suchen' />
        </Tabs>

      </ThemeProvider>
      <div className='angesagt'>
        {inhalt &&
          inhalt.map((i) => (
            <SingleContent
              key={i.id}
              id={i.id}
              poster={i.poster_path}
              title={i.title || i.name}
              date={i.first_air_date || i.release_date}
              mediaType={type ? 'tv' : 'movie'}
              voteAverage={i.vote_average}
            />
          ))}
        {suchText &&
          !inhalt &&
          (type ? <h2>Oops - Keine Serie gefunden</h2> : <h2>Oops - Keinen Filme gefunden</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setSeite={setSeite} />
      )}
    </div>

  )
}

export default Suche
