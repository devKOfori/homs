import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import { Provider } from './components/ui/provider'
import './App.css'
import Home from './pages/Home'
import ReportIssue from './components/ReportIssue'

function App() {

  return (
    <Provider>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/report-issue' element={<ReportIssue />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
