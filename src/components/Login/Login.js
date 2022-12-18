import axios from "axios"
import {useContext, useEffect} from "react"
import {ContentContext, ContentDispatchContext} from "../context/ContentContext"
import '../styles.css'
import './login.css'

const Login = (props) => {
	const content = useContext(ContentContext)
	const dispatch = useContext(ContentDispatchContext)
	
	useEffect(()=>{
		const closeLogin = e =>{
			console.log(e)
			if(e.target.id !== "login" && !e.target.classList.contains("login-popup")){
			props.setLoginState(false)
			}
		}
		document.body.addEventListener("click", closeLogin)
		return ()=>document.body.removeEventListener("click", closeLogin)
	},[])
	
	const login = async (username, password) => {
		try {
			let res = await axios({
				method: 'post', url: content.server + '/login', data: {
					username: username, password: password
				}
			})
			console.log("AXIOS PYYNTÖ MENI LÄPI")
			if (res.data.correct === true) {
				console.log(res.data)
				
				localStorage.setItem('access_token', res.data.token)
				axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
				
				dispatch({type: "LOGIN", payload: {id: res.data.id, role: res.data.role, token: res.data.token, name: res.data.name}})
				//props.dispatch({type: "SET_USER", payload: {role: res.data.role, id: res.data.id}})
				props.setLoginState(false)
			}
		} catch (err) {
			console.log(err)
			if (err.response.data.message === 'Wrong username or password') {
				dispatch({type: "SET_ALERT", payload: "Käyttäjätunnus tai salasana väärin"})
				let timeOutId
				timeOutId = setTimeout(() => {
					dispatch({type: "SET_ALERT", payload: ""})
					clearTimeout(timeOutId)
				}, 3000)
			} else {
				console.log(err)
				dispatch({type: "SET_ALERT", payload: "Ei yhteyttä palvelimeen"})
			}
		}
	}
	
	return (<div className="login-window login-popup" id="login-window">
		<button className="close-window" onClick={() => {
			props.setLoginState(false)
		}}>X
		</button>
		<form id="login-form" className="login-form login-popup">
			<input id="user" className="login-input login-popup" name="username" placeholder="Käyttäjätunnus" required/><br/>
			<input id="pass" className="login-input login-popup" name="password" placeholder="Salasana" type="password" required onKeyPress={(e) => {
				if (e.key === "Enter") {
					e.preventDefault()
					document.getElementById("login-submit").click()
				}
			}}/>
			<button id="login-submit" className="login-popup" onClick={(e) => {
				e.preventDefault()
				login(document.getElementById("user").value, document.getElementById("pass").value)
			}}>Kirjaudu
			</button>
		</form>
		<div className="login-window-text login-popup">Ei tunnusta? <a id="register" className="register-button" onClick={(e) => {
			e.preventDefault()
			props.setRegisterState(true)
		}}>Rekisteröidy tästä</a></div>
	</div>)
}

export default Login