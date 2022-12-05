import {useContext, useState} from "react"
import {updateUser, deleteUser} from "./userUtils"
import {ExamsList} from "./ExamsList"
import {ContentContext} from "../../components/context/ContentContext"

export const User = (props) => {
	const [addExam, setAddExam] = useState(false)
	const content = useContext(ContentContext)
	
	console.log(props)
	return (<div className="user-container">
		<p className="username">{props.user.username}</p>
		{props.id !== props.user.id ?
			<select id="role" defaultValue={props.user.role} onChange={(e) => {
				updateUser({server: props.server, id: props.user.id, role: e.target.value})
			}}>
				<option value="admin">Admin</option>
				<option value="user">User</option>
			</select>
			:
			<select id="role" defaultValue={props.user.role} disabled>
				<option value="admin">Admin</option>
			</select>
		}
		<button onClick={(e) => {
			deleteUser({server: props.server, id: props.user.id, setUsers: props.setUsers})
			props.setUsers((users) => users.filter((item) => item.id !== props.user.id))
		}}>Poista
		</button>
		<button onClick={() => setAddExam(current => !current)}>Lisää tentti</button>
		{addExam ? <ExamsList exams={content.exams} userId={props.user.id} setAddExam={setAddExam}/> : null}
	</div>)
}