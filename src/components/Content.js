import {Navigate, Outlet, Route, Routes} from "react-router-dom"
import AdminExams from "../admin/AdminExams"
import {reducer} from "./reducer/app"
import {useContext, useEffect} from "react"
import {ContentContext, ContentDispatchContext} from "./context/ContentContext"
import axios from "axios"
import {Home} from "../client/Home"
const server = "https://localhost:8080"


const ProtectedRoute = ({isAdmin}) =>{
	if(isAdmin){
		return <Outlet/>
	}
	return <Navigate to="/"/>
}

const Content = () => {
	const content = useContext(ContentContext)
	const dispatch = useContext(ContentDispatchContext)
	
	useEffect(() => {
		console.log("USE EFFECT")
		
		const getUserData = async () => {
			const token = localStorage.getItem('access_token')
			if (token) {
				try {
					axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
					let userData = await axios({
						method: 'get', url: server + '/RequestAccess'
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
	
	return(<div>
		<Routes>
			<Route path="/" element={<Home/>}/>
			<Route path="admin" element={<ProtectedRoute isAdmin={content.user.isAdmin}/>}>
				<Route path="exams" element={<AdminExams/>}/>
			</Route>
		</Routes>
	</div>)
}

export default Content