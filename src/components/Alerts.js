import {useContext} from "react"
import {ContentContext} from "./context/ContentContext"

export const Alerts = () =>{
	const content = useContext(ContentContext)
	return(<div>
		{content.alert}
	</div>)
}