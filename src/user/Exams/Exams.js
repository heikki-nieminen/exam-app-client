import {Link} from "react-router-dom"
import {useContext, useEffect, useState} from "react"
import axios from "axios"
import {ContentContext, ContentDispatchContext} from "../../components/context/ContentContext"
import {AccessDenied} from "../AccessDenied"
import './exams.css'

const server = "https://localhost:8080"


export const Exams = (props) => {
  const content = useContext(ContentContext)
  const dispatch = useContext(ContentDispatchContext)
  
  const getExams = async () => {
    try {
      let res = await axios({
        method: 'get',
        url:    server + '/exams',
      })
      console.log(res.data)
      dispatch({type: "SET_EXAMS", payload: res.data})
    } catch (err) {
      console.log("Ei toimi ", err)
    }
  }
  
  useEffect(() => {
    getExams()
  }, [content.user.loggedIn])
  
  return (
    <div>
      {content.user.loggedIn ?
        <>
          <ul className="exams-list">{content.exams.map((item, index) => {
            return (<li key={index}><Link className="exam-link" key={index} to={`/exam?id=${item.id}`} onClick={() => {
              dispatch({type: "INITIALIZE_DATA", payload: false})
              dispatch({
                type:    "SET_EXAM_ID",
                payload: {id: item.id, initialized: !content.initialized}
              })
            }}>{item.name}</Link>
            </li>)
          })}</ul>
        </>
        :
        <AccessDenied/>
      }
    </div>
  )
}
