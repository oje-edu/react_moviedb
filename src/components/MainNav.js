import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import SearchIcon from '@material-ui/icons/Search'
import MovieIcon from '@material-ui/icons/Movie'
import TvIcon from '@material-ui/icons/Tv'

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: 'gray',
    zIndex: 100
  }
})

export default function MainNav () {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const history = useHistory()

  useEffect(() => {
    if (value === 0) history.push('/')
    else if (value === 1) history.push('/filme')
    else if (value === 2) history.push('/serien')
    else if (value === 3) history.push('/suche')
  }, [value, history])

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        style={{ color: 'whitesmoke' }}
        label='Angesagt'
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        style={{ color: 'whitesmoke' }}
        label='Filme'
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        style={{ color: 'whitesmoke' }}
        label='Serien'
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        style={{ color: 'whitesmoke' }}
        label='Suchen'
        icon={<SearchIcon />}
      />
    </BottomNavigation>
  )
}
