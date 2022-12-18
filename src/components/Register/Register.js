import axios from "axios"
import '../styles.css'
import {useContext, useEffect} from "react"
import {ContentContext, ContentDispatchContext} from "../context/ContentContext"
import {validateEmail} from "./validateEmail"
import './register.css'

const Register = (props) => {
	const content = useContext(ContentContext)
	const dispatch = useContext(ContentDispatchContext)
	
	useEffect(() => {
		const closeRegister = (e) => {
			if (e.target.id !== "register" && !e.target.classList.contains("register-popup")) {
				props.setRegisterState(false)
			}
		}
		document.body.addEventListener("click", closeRegister)
		return () => {document.body.removeEventListener("click", closeRegister)}
	}, [])
	
	const register = async (username, password, email) => {
		console.log(password)
		let res
		try {
			res = await axios({
				method: 'post',
				url:    content.server + '/register',
				data:   {
					username: username,
					password: password,
					email:    email
				}
			})
			if (res.data === true) {
				dispatch({type: "SET_ALERT", payload: "Tili luotu onnistuneesti"})
				let timeOutId
				timeOutId = setTimeout(() => {
					dispatch({type: "SET_ALERT", payload: ""})
					clearTimeout(timeOutId)
				}, 3000)
			} else {
				dispatch({type: "SET_ALERT", payload: res.data})
				let timeOutId
				timeOutId = setTimeout(() => {
					dispatch({type: "SET_ALERT", payload: ""})
					clearTimeout(timeOutId)
				}, 3000)
			}
		} catch (err) {
			dispatch({type: "SET_ALERT", payload: err.response.data})
		}
	}
	
	const handleRegisterClick = async () => {
		if (document.getElementById("reg-pass1").value !== document.getElementById("reg-pass2").value) {
			dispatch({type: "SET_ALERT", payload: "Salasanat eivät täsmää"})
		} else {
			register(document.getElementById("reg-user").value, document.getElementById("reg-pass1").value, document.getElementById("reg-email").value)
		}
	}
	
	let testi
	
	return (<div className="register-window register-popup">
		<button className="close-window" onClick={() => {
			props.setRegisterState(false)
		}}>X
		</button>
		<form className="register-form register-popup">
			<input id="reg-user" className="register-input register-popup" type="text" placeholder="Käyttäjätunnus"/><br/>
			<input id="reg-pass1" className="register-input register-popup" type="password" placeholder="Salasana"/><br/>
			<input id="reg-pass2" className="register-input register-popup" type="password"
			       placeholder="Vahvista salasana"/><br/>
			<input id="reg-email" className="register-input register-popup" type="email" placeholder="Sähköposti"
			       onChange={(e) => {
				       if (validateEmail(e.target.value)) {
					       e.target.className = "register-input register-popup valid-email"
					       document.getElementById("submit-register").disabled = false
				       } else {
					       e.target.className = "register-input register-popup invalid-email"
					       document.getElementById("submit-register").disabled = true
				       }
			       }}/><br/>
			<button className="register-submit register-popup" id="submit-register" onClick={handleRegisterClick} disabled={true}>Luo käyttäjä</button>
		</form>
		<div className="register-window-text register-popup">
			Onko sinulla tunnus? <a id="login" className="login-button" onClick={(e) => {
				e.preventDefault()
				props.setLoginState(true)
			}}>Kirjaudu tästä
			</a>
		</div>
	</div>)
}

export default Register