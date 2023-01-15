import {useContext} from "react"
import {ContentContext} from "../../components/context/ContentContext"
import './home.css'

export const Home = () => {
	const content = useContext(ContentContext)
	console.log(content.user)
	
	return(<div className="homepage-container">
		Tervetuloa, <b>{content.user.name}</b>
	</div>)
}