import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

const CustomPagination = ({ setSeite, numDerSeiten = 10 }) => {
  const handlePageChange = (seite) => {
    setSeite(seite)
    window.scroll(0, 0)
  }
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginTop: 10
    }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination count={numDerSeiten} onChange={(e) => handlePageChange(e.target.textContent)} />
      </ThemeProvider>
    </div>
  )
}

export default CustomPagination
