import {useContext} from "react"
import {ContentContext, ContentDispatchContext} from "../../components/context/ContentContext"
import axios from "axios"

export const AddQuestion = (props) => {
	const dispatch = useContext(ContentDispatchContext)
	const content = useContext(ContentContext)
	return (<div className="add-question-buttons">
		<input id="add-question" type="text" placeholder="Uusi kysymys"/>
		<div>
			<button onClick={async () => {
				const question = document.getElementById("add-question").value
				let request = {question: question, exam_id: content.exam.id}
				try {
					let res = await axios({
						method: 'post',
						url:    content.server + '/exam/question',
						data:   request
					})
					dispatch({
						type: "ADD_QUESTION", payload: {
							id:       res.data,
							question: question,
							examId:   content.exam.id
						}
					})
				} catch (err) {
					console.log(err)
				}
				
				props.setAddQuestion(false)
			}}>Lisää kysymys
			</button>
			<button onClick={() =>
				props.setAddQuestion(false)
			}>Peruuta
			</button>
		</div>
	</div>)
}