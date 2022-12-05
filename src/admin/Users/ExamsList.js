import {useContext, useEffect} from "react"
import {ContentContext, ContentDispatchContext} from "../../components/context/ContentContext"
import {addExamToUser, getExams} from "./examUtils"

export const ExamsList = (props) => {
	
	const content = useContext(ContentContext)
	const dispatch = useContext(ContentDispatchContext)
	
	useEffect(() => {
		getExams(content, dispatch)
	}, [])
	
	return (<ul className="user-add-exam">
		{props.exams.map((item, index) => {
			return (<>
				<li key={index} onClick={() => {
					addExamToUser({
						examId:     item.id,
						userId:     props.userId,
						server:     content.server,
						name:       item.name,
						setAddExam: props.setAddExam
					})
				}}>{item.name}
					<button>Lisää</button>
					<button>Poista</button>
				
				</li>
			</>)
		})}
	
	
	</ul>)
}