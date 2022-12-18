import {ContentContext, ContentDispatchContext} from "./context/ContentContext"
import Navigation from "./Navigation"
import Content from "./Content"
import React, {useEffect, useReducer, useState} from "react"
import {reducer} from "./reducer/app"
import Login from "./Login/Login"
import Register from "./Register/Register"
import axios from "axios"

const initialState = {
	server:       "https://localhost:8080",
	user:         {id: 0, isAdmin: false, token: "", loggedIn: false},
	editQuestion: false,
	initialized:  false,
	exams:        [],
	getData:      false,
	alert:        "",
	loggedIn:     false,
	examId:       0,
	exam:         {name: "", questions: []},
	changes:      [],
	isAdmin:      null
}

export const App = () => {
	const [loginState, setLoginState] = useState(false)
	const [registerState, setRegisterState] = useState(false)
	const [content, dispatch] = useReducer(reducer, initialState)
	
	useEffect(() => {
		console.log("USE EFFECT")
		
		const getUserData = async () => {
			const token = localStorage.getItem('access_token')
			if (token) {
				try {
					axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
					console.log("AXIOS")
					const userData = await axios({
						method: 'get', url: content.server + '/RequestAccess'
					})
					console.log("HMM")
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
		console.log(content.user)
	}, [content.user.loggedIn])
	
	return (<div className="app">
		<ContentContext.Provider value={content}>
			<ContentDispatchContext.Provider value={dispatch}>
				<Navigation setLoginState={setLoginState} setRegisterState={setRegisterState}/>
				<Content/>
				{loginState && <Login setLoginState={setLoginState} setRegisterState={setRegisterState}/>}
				{registerState && <Register setRegisterState={setRegisterState} setLoginState={setLoginState}/>}
			</ContentDispatchContext.Provider>
		</ContentContext.Provider>
	</div>)
}
