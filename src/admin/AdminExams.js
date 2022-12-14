import {Link, Navigate} from "react-router-dom"
import {useContext, useEffect, useState} from "react"
import axios from "axios"
import {ContentContext, ContentDispatchContext} from "../components/context/ContentContext"
import {AccessDenied} from "../user/AccessDenied"

const server = "https://localhost:8080"

const AdminExams = (props) => {
	const [addExam, setAddExam] = useState(false)
	const content = useContext(ContentContext)
	const dispatch = useContext(ContentDispatchContext)
	
	console.log("ADMIN EXAMS")
	
	const getExams = async () => {
		try {
			let res = await axios({
				method: 'get',
				url:    server + '/exams',
			})
			console.log(res.data)
			dispatch({type: "SET_EXAMS", payload: res.data})
		} catch (err) {
			console.log("Ei toimi ", err)
		}
	}
	
	useEffect(() => {
		getExams()
	}, [content.user.loggedIn])
	
	const deleteExam = async (id) => {
		try {
			const res = await axios({
				method: 'delete',
				url:    server + '/exam',
				data:   {id: id}
			})
		} catch (err) {
			console.log(err)
		}
	}
	if (content.user.isAdmin) {
		return (<div>
			<ul>{content.exams.map((item, index) => {
				return (<li key={index}><Link id={item.name} key={index} to={`/admin/exam?id=${item.id}`} onClick={() => {
					dispatch({type: "INITIALIZE_DATA", payload: false})
					dispatch({
						type:    "SET_EXAM_ID",
						payload: {id: item.id, initialized: !content.initialized}
					})
				}}>{item.name}</Link>
					<button id={`delete-${item.name}`} onClick={async () => {
						await deleteExam(item.id)
						dispatch({type: "REMOVE_EXAM", payload: index})
					}}>Poista tentti
					</button>
				</li>)
			})}</ul>
			
			{!addExam ? <button id="add-exam-button" onClick={() => {
					setAddExam(true)
				}}>Uusi tentti</button>
				:
				<AddExam setAddExam={setAddExam} server={server} dispatch={dispatch}/>
			}
		</div>)
	}
	return <AccessDenied/>
}

const AddExam = (props) => {
	return (<div>
		<input id="add-exam-input" type="text" placeholder="Tentin nimi"/>
		<button id="submit-add-exam" onClick={async () => {
			let exam = document.getElementById("add-exam-input").value
			try {
				let res = await axios({
					method: 'post',
					url:    props.server + '/exam',
					data:   {examName: exam}
				})
				props.dispatch({type: "ADD_EXAM", payload: {id: res.data, examName: exam}})
			} catch (err) {
			
			}
			props.setAddExam(false)
		}}>Lisää tentti
		</button>
	</div>)
}

export default AdminExams
