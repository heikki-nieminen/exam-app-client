import {useContext, useEffect, useState} from "react"
import axios from "axios"
import '../styles.css'
import {ContentContext} from "../../components/context/ContentContext"
import {User} from "./User"
import {AccessDenied} from "../../user/AccessDenied"

export const Users = (props) => {
	const [users, setUsers] = useState([])
	const content = useContext(ContentContext)
	
	useEffect(() => {
		
		const getUsers = async () => {
			try {
				const result = await axios({
					method: "get",
					url:    content.server + '/users'
				})
				console.log(result.data)
				console.log("Pyyntö onnistui")
				setUsers(result.data.users)
			} catch (err) {
				console.log("Pyyntö epäonnistui")
				console.log(err)
			}
		}
		getUsers()
	}, [])
	
	return (<div>
		{content.user.isAdmin ?
			<>
				{users.map((item, index) => {
					return <User user={item} key={index} server={content.server} setUsers={setUsers} users={users}
					             exams={content.exams} id={content.user.id}/>
				})}
			</>
			:
				<AccessDenied />
		}
	</div>)
}