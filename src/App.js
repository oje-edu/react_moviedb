import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import { Container } from '@material-ui/core'
import MainNav from './components/MainNav'
import Filme from './Pages/Filme/Filme'
import Serien from './Pages/Serien/Serien'
import Suche from './Pages/Suche/Suche'
import Angesagt from './Pages/Angesagt/Angesagt'

function App () {
  return (
    <Router>
      <Header />
      <div className='app'>
        <Container>
          <Switch>
            <Route path='/filme' component={Filme} />
            <Route path='/serien' component={Serien} />
            <Route path='/suche' component={Suche} />
            <Route path='/' component={Angesagt} exact />
          </Switch>
        </Container>
      </div>

      <MainNav />
    </Router>
  )
}

export default App
