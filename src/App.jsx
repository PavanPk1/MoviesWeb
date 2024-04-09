import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Home from './components/Home'
import Upcoming from './components/Upcoming'
import Toprated from './components/Toprated'
import MovieDetailsSection from './components/MovieDetailsSection'
import UserSearch from './components/UserSearch'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/upcoming" exact element={<Upcoming />} />
        <Route path="/top-rated" exact element={<Toprated />} />
        <Route path="/movie/:id" exact element={<MovieDetailsSection />} />
        <Route path="/user-search" exact element={<UserSearch />} />
      </Routes>
    </Router>
  )
}


export default App