import edit from '../img/edit.png'
import remove from '../img/remove.png'
import axios from "axios"
import {useContext, useEffect, useState} from "react"
import {ContentContext, ContentDispatchContext} from "../../components/context/ContentContext"


export const AdminAnswer = (props) => {
	const [editAnswer, setEditAnswer] = useState(false)
	const [initializeData, setInitializeData] = useState(false)
	const content = useContext(ContentContext)
	const dispatch = useContext(ContentDispatchContext)
	
	const saveAnswer = async () => {
		let answer = document.getElementById("edit-answer").value
		let isCorrect = document.getElementById("edit-answer-correct").checked
		try {
			let res = await axios({
				method: 'put',
				url:    content.server + '/exam/question/answer',
				data:   {id: props.answer.id, answer: answer, isCorrect: isCorrect}
			})
			dispatch({
				type:    "EDIT_ANSWER",
				payload: {questionId: props.questionId, answerId: props.id, answer: answer, isCorrect: isCorrect}
			})
			setEditAnswer(false)
		} catch (err) {
			console.log(err)
		}
	}
	
	const removeAnswer = async () => {
		let request = {id: props.answer.id}
		try {
			let res = await axios({
				method: 'delete',
				url:    content.server + '/exam/question/answer',
				data:   request
			})
			dispatch({
				type:    "REMOVE_ANSWER",
				payload: {questionId: props.questionId, answerId: props.id}
			})
		} catch (err) {
			console.log(err)
		}
	}
	
	useEffect(() => {
	
	}, [])
	
	return (<div className="answer">
		{!editAnswer ?
			<div>
				<input type="checkbox" value={props.answer.answer}/>
				{props.answer.answer}
			</div>
			:
			<div>
				<input id="edit-answer" type="text" defaultValue={props.answer.answer}/>
				Correct?
				<input id="edit-answer-correct" type="checkbox" defaultChecked={props.answer.correct_answer}/>
				<button onClick={saveAnswer}>Tallenna vastaus
				</button>
			</div>
		}
		{props.edit &&
			<>
				{!editAnswer &&
					<div className="right">
						<input type="checkbox" checked={props.answer.correct_answer} disabled={true}/>
						<img className="answer-image" src={edit} onClick={() => setEditAnswer(true)}/>
						<img className="answer-image" src={remove} alt="Remove answer button" onClick={removeAnswer}/>
					</div>
				}
			</>
		}
	</div>)
}