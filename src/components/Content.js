import {Outlet, Route, Routes} from "react-router-dom"
import AdminExams from "../admin/AdminExams"
import {useContext, useEffect} from "react"
import {ContentContext, ContentDispatchContext} from "./context/ContentContext"
import axios from "axios"
import {About} from "./pages/About/About"
import {Exams} from "../user/Exams"
import {NotFound} from "./NotFound"
import {AccessDenied} from "../user/AccessDenied"
import Exam from "../user/Exam"
import {Users} from "../admin/Users/Users"
import {AdminExam} from "../admin/AdminExam/AdminExam"
import {Home} from "./pages/Home/Home"

const ProtectedRoute = ({isAdmin}) => {
	if (isAdmin === true) {
		return <Outlet/>
	}
	return <AccessDenied/>
}

const UserRoute = ({isLoggedIn}) => {
	if (isLoggedIn) {
		return <Outlet/>
	}
	return <AccessDenied/>
}

const Content = () => {
	const content = useContext(ContentContext)
	const dispatch = useContext(ContentDispatchContext)
	
	useEffect(() => {
	}, [])
	
	return (<div>
		<Routes>
			<Route path="*" element={<NotFound/>}/>
			<Route path="/" element={content.user.loggedIn ? <Home/> :<About/>}/>
			<Route element={<UserRoute isLoggedIn={content.user.loggedIn}/>}>
				<Route path="exams" element={<Exams/>}/>
				<Route path="exam" element={<Exam/>}/>
			</Route>
			<Route path="admin" element={<ProtectedRoute isAdmin={content.user.isAdmin}/>}>
				<Route path="exams" element={<AdminExams/>}/>
				<Route path="exam" element={<AdminExam/>} />
				<Route path="users" element={<Users/>}/>
			</Route>
		</Routes>
	</div>)
}

export default Content