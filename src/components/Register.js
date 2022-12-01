import axios from "axios"
import './styles.css'
import {useContext} from "react"
import {ContentContext, ContentDispatchContext} from "./context/ContentContext"

const Register = (props) => {
	const content = useContext(ContentContext)
	const dispatch = useContext(ContentDispatchContext)
	
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
	
	return (<div className="register-container">
		<button className="close-window" onClick={() => {
			props.setRegisterState(false)
		}}>X
		</button>
		<br/>
		<input id="reg-user" type="text" placeholder="Käyttäjätunnus"/><br/>
		<input id="reg-pass1" type="password" placeholder="Salasana"/><br/>
		<input id="reg-pass2" type="password" placeholder="Vahvista salasana"/><br/>
		<input id="reg-email" type="email" placeholder="Sähköposti"/><br/>
		<button onClick={handleRegisterClick}>Luo käyttäjä</button>
	</div>)
}

export default Register