import {useContext, useEffect, useState} from "react"
import edit from '../img/edit.png'
import remove from '../img/remove.png'
import add from '../img/add.png'
import axios from "axios"
import {AdminAnswer} from "../AdminAnswer/AdminAnswer"
import {AddAnswer} from "./AddAnswer"
import {ContentContext, ContentDispatchContext} from "../../components/context/ContentContext"

export const AdminQuestion = (props) => {
	const [addAnswer, setAddAnswer] = useState(false)
	const [editQuestion, setEditQuestion] = useState(false)
	const [initializeData, setInitializeData] = useState(false)
	
	const content = useContext(ContentContext)
	const dispatch = useContext(ContentDispatchContext)
	
	
	useEffect(() => {
		const getAnswers = async (questionId) => {
			if (questionId) {
				try {
					let res = await axios({
						method: 'get',
						url:    content.server + '/exam/question?id=' + questionId
					})
					dispatch({type: "SET_ANSWERS", payload: {questionId: props.id, answers: res.data}})
					setInitializeData(true)
				} catch (err) {
					console.log("Virhe ", err)
				}
			}
		}
		if (!initializeData) {
			getAnswers(props.question.id)
		}
	}, [])
	
	const saveQuestion = async () => {
		let question = document.getElementById("question-edit").value
		try {
			let res = await axios({
				method: 'put',
				url:    content.server + '/exam/question',
				data:   {id: props.question.id, question: question}
			})
			dispatch({type: "EDIT_QUESTION", payload: {questionId: props.id, question: question}})
		} catch (err) {
			console.log(err)
		}
		
	}
	
	return (
		<>
			{initializeData ?
				<div className="question">
					<div className="question-box">
						{!editQuestion ?
							<div className="question-title-container">
								<p className="question-title">{props.question.question}</p>
								{props.question.edit && <img className="edit-question-image" src={edit} onClick={() => {
									setEditQuestion(true)
								}}/>}
							</div>
							:
							<div className="question-title-container">
								<input id="question-edit" type="text" defaultValue={props.question.question}/>
								<button onClick={() => {
									saveQuestion()
									setEditQuestion(false)
								}}>Tallenna kysymys
								</button>
							</div>
						}
						<div className="answers-container">
							{props.question.answers ?
								<>
									{props.question.answers.map((item, index) => {
										return <AdminAnswer key={index} questionId={props.id} answer={item}
										               id={index} question={props.question}
										               edit={props.question.edit}/>
									})}
								</>
								:
								<>
									EI vastauksia
								</>
							}
							{props.question.edit &&
								<>
									{addAnswer ?
										<AddAnswer question={props.question} questionId={props.id}
										           setAddAnswer={setAddAnswer} />
										:
										<img className="question-image" src={add} alt="Add answer button" onClick={(e) => {
											setAddAnswer(true)
										}}/>
										
									}
								</>
							}
						</div>
					</div>
					{content.exam.edit &&
						<div className="question-buttons">
							<img className="question-image" src={edit} alt="Edit question button" onClick={() => {
								dispatch({type: "SET_QUESTION_EDIT_MODE", payload: props.id})
							}}/>
							<br/>
							<img className="question-image" src={remove} alt="Remove question button" onClick={async () => {
								let request = {id: props.question.id}
								try {
									let res = await axios({
										method: 'delete',
										url:    content.server + '/exam/question',
										data:   request
									})
									dispatch({type: "REMOVE_QUESTION", payload: {questionId: props.id}})
								} catch (err) {
									console.log(err)
								}
							}}/>
						</div>
					}
				</div>
				:
				<>
					<h1>Ladataan...</h1>
				</>
			}
		</>
	)
}