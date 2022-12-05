import axios from "axios"
import {useContext} from "react"
import {ContentContext, ContentDispatchContext} from "../../components/context/ContentContext"

export const AddAnswer = (props) => {
	const content = useContext(ContentContext)
	const dispatch = useContext(ContentDispatchContext)
	
	return (<div>
		<input id="add-answer" type="text" placeholder="Uusi vastaus"/>
		<input id="correct-answer" type="checkbox"/> Oikea vastaus?<br/>
		<button onClick={async () => {
			const answer = document.getElementById("add-answer").value
			const correct = document.getElementById("correct-answer").checked
			let request = {answer: answer, question_id: props.question.id, correct_answer: correct}
			try {
				let res = await axios({
					method: 'post',
					url:    content.server + '/exam/question/answer',
					data:   request
				})
				dispatch({
					type:    "ADD_ANSWER",
					payload: {
						id:             res.data,
						realQuestionId: props.question.id,
						questionId:     props.questionId,
						answer:         answer,
						correct:        correct
					}
				})
			} catch (err) {
				console.log(err)
			}
			props.setAddAnswer(false)
		}}>Add
		</button>
		<button onClick={() => {
			props.setAddAnswer(false)
		}}>Cancel
		</button>
	</div>)
}