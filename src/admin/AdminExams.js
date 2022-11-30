import {Link} from "react-router-dom"
import {useContext, useEffect, useState} from "react"
import axios from "axios"
import {ContentContext, ContentDispatchContext} from "../components/context/ContentContext"
const server = "https://localhost:8080"

const AdminExams = (props) => {
	const [addExam, setAddExam] = useState(false)
	const content = useContext(ContentContext)
	const dispatch = useContext(ContentDispatchContext)
	
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
			let res = await axios({
				method: 'delete',
				url:    server + '/exam',
				data:   {id: id}
			})
		} catch (err) {
			console.log(err)
		}
	}
	
	return (
		<div>
			<ul>{content.exams.map((item, index) => {
				return (<li key={index}><Link key={index} to={`/exam?id=${item.id}`} onClick={() => {
					dispatch({type: "INITIALIZE_DATA", payload: false})
					dispatch({
						type:    "SET_EXAM_ID",
						payload: {id: item.id, initialized: !content.initialized}
					})
				}}>{item.name}</Link>
					<button onClick={async () => {
						await deleteExam(item.id)
						dispatch({type: "REMOVE_EXAM", payload: index})
					}}>Poista tentti
					</button>
				</li>)
			})}</ul>
			
			{!addExam ? <button onClick={() => {
					setAddExam(true)
				}}>Uusi tentti</button>
				:
				<AddExam setAddExam={setAddExam} server={server} dispatch={dispatch}/>
			}
		</div>
	)
}

const AddExam = (props) => {
	return (<div>
		<input id="add-exam" type="text" placeholder="Tentin nimi"/>
		<button onClick={async () => {
			let exam = document.getElementById("add-exam").value
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