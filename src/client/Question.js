import './styles.css'
import {useContext, useEffect, useState} from "react"
import axios from "axios"
import {Answer} from "./Answer"
import {ContentContext, ContentDispatchContext} from "../components/context/ContentContext"

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
		}
	}, [])
	
	return (
		<>
			{initializeData ?
				<div className="question">
					<div className="question-box">
						<div className="question-title-container">
							<p className="question-title">{props.question.question}</p>
						</div>
						<div className="answers-container">
							{props.question.answers ?
								<>
									{props.question.answers.map((item, index) => {
										return <Answer key={index} questionId={props.id} answer={item}
										               id={index} question={props.question}/>
									})}
								</>
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