import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import CandidateRegistration from './components/Candidate/CandidateRegistration.jsx'
import Instructions from './components/Candidate/Instructions.jsx'
import Assessment from './components/Candidate/Assessment.jsx'
import QuestionPage from './components/Candidate/QuestionPage.jsx'
import QuestionPagePP from './components/Candidate/QuestionPagePP.jsx'
import MQuestionPagePP from './components/Candidate/MQuestionPage.jsx'
import At1 from './components/Candidate/At1.jsx'
import At2 from './components/Candidate/At2.jsx'
import At3 from './components/Candidate/At3.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      {/* <Route path='header' element = {<Header/>}/>
      <Route path='footer' element = {<Footer/>}/> */}
      <Route path='candidateRegister' element = {<CandidateRegistration/>}/>
      <Route path='instructions' element = {<Instructions/>}/>
      <Route path='assessment' element = {<Assessment/>}/>
      <Route path='questionpage' element = {<QuestionPage/>}/>
      <Route path='questionpagepp' element = {<QuestionPagePP/>}/>
      <Route path='mquestionpage' element = {<MQuestionPagePP/>}/>
      <Route path='at1' element = {<At1/>}/>
      <Route path='at2' element = {<At2/>}/>
      <Route path='at3' element = {<At3/>}/>
      <Route index element = {<Assessment/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
