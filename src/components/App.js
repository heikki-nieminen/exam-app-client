import {ContentContext, ContentDispatchContext} from "./context/ContentContext"
import Navigation from "./Navigation"
import Content from "./Content"
import React, {useEffect, useReducer, useState} from "react"
import {reducer} from "./reducer/app"
import Login from "./Login"
import Register from "./Register"

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
		console.log("EFFECT TESTI")
	}, [])
	
	return (<div>
		<ContentContext.Provider value={content}>
			<ContentDispatchContext.Provider value={dispatch}>
				<Navigation setLoginState={setLoginState} setRegisterState={setRegisterState}/>
				<Content/>
				{loginState && <Login setLoginState={setLoginState}/>}
				{registerState && <Register setRegisterState={setRegisterState}/>}
			</ContentDispatchContext.Provider>
		</ContentContext.Provider>
	</div>)
}
