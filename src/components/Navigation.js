import './styles.css'
import {Link} from "react-router-dom"
import {useContext, useState} from "react"
import {ContentContext, ContentDispatchContext} from "./context/ContentContext"



const Navigation = (props) => {
	const content = useContext(ContentContext)
	const dispatch = useContext(ContentDispatchContext)
	let adminPrefix = ""
	if(content.user.isAdmin){
		adminPrefix = "admin"
	}
	
	return (
		<div className="nav-bar">
			<ul className="nav">
				<li><Link to={'/'}>Etusivu</Link></li>
				{content.user.loggedIn &&
					<>
						<li><Link id="exams-link" to={adminPrefix+'/exams'}>Tentit</Link></li>
						
						{content.user.isAdmin &&
							<li><Link to={adminPrefix+'/users'}>Käyttäjät</Link></li>
						}
					</>
				}
			</ul>
			<ul className="nav right">
				{content.user.loggedIn ?
					<li>
						<Link to='/' id="logout-button" onClick={() => {dispatch({type: "LOGOUT"})}}>Kirjaudu ulos</Link>
					</li>
					:
					<>
						<li>
							<a id="login" className="login-button" onClick={(e) => {
								e.preventDefault()
								props.setLoginState(true)
							}}>Kirjaudu
							</a>
						</li>
						<li><a className="register-button" onClick={(e) => {
							e.preventDefault()
							props.setRegisterState(true)
						}}>Rekisteröidy</a></li>
					</>
				}
			</ul>
		</div>
	)
	
}
export default Navigation