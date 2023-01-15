import './question.css'
import {useContext, useEffect, useState} from "react"
import axios from "axios"
import {Answer} from "../Answer"
import {ContentContext, ContentDispatchContext} from "../../components/context/ContentContext"

export const Question = (props) => {
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
			console.log("USER EXAM: ",props.userExam)
			let userExamCopy = JSON.parse(JSON.stringify(props.userExam))
			userExamCopy.questions[props.id].answer = {}
			props.setUserExam(userExamCopy)
		}
	}, [])
	
	let questionClassname
	if(props.userExam.questions[props.id].answered){
		questionClassname = "question-box answered"
	}
	else{
		questionClassname = "question-box"
	}
	
	return (
		<>
			{initializeData ?
				<div className="question">
					<div className={questionClassname}>
						<div className="question-title-container">
							<p className="question-title">{props.question.question}</p>
						</div>
						<div className="answers-container">
							{props.question.answers ?
								<form>
									{props.question.answers.map((item, index) => {
										
										return <Answer key={index} questionId={props.id} answer={item}
										               id={index} question={props.question} setUserExam={props.setUserExam} userExam={props.userExam}/>
									})}
								</form>
								:
								<>
									Ei vastauksia
								</>
							}
						</div>
					</div>
				</div>
				:
				<>
					<h1>Ladataan...</h1>
				</>
			}
		</>
	)
}