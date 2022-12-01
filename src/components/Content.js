import {Outlet, Route, Routes} from "react-router-dom"
import AdminExams from "../admin/AdminExams"
import {useContext, useEffect} from "react"
import {ContentContext, ContentDispatchContext} from "./context/ContentContext"
import axios from "axios"
import {Home} from "../client/Home"
import {Exams} from "../client/Exams"
import {NotFound} from "./NotFound"
import {AccessDenied} from "../client/AccessDenied"
import Exam from "../client/Exam"

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
		const getUserData = async () => {
			const token = localStorage.getItem('access_token')
			if (token) {
				try {
					axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
					let userData = await axios({
						method: 'get', url: content.server + '/RequestAccess'
					})
					console.log(userData.data)
					dispatch({
						type: "SET_USER", payload: {id: userData.data.id, role: userData.data.role, name: userData.data.username}
					})
				} catch (err) {
					if (err.response.data.message === 'Token expired') {
						localStorage.removeItem('access_token')
					}
				}
			}
		}
		getUserData()
	}, [content.user.loggedIn])
	
	return (<div>
		<Routes>
			<Route path="*" element={<NotFound/>}/>
			<Route path="/" element={<Home/>}/>
			<Route element={<UserRoute isLoggedIn={content.user.loggedIn}/>}>
				<Route path="exams" element={<Exams/>}/>
				<Route path="exam" element={<Exam/>}/>
			</Route>
			<Route path="admin" element={<ProtectedRoute isAdmin={content.user.isAdmin}/>}>
				<Route path="exams" element={<AdminExams/>}/>
			</Route>
		</Routes>
	</div>)
}

export default Content