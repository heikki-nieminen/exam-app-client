import {Link} from "react-router-dom"
import AdminExams from "../admin/AdminExams"

export const Home = () => {
  return(<div>
	  <h1>Etusivu</h1>
	  <Link to={"admin/exams"}>TESTI</Link>
  </div>)
}