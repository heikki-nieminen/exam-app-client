import {useContext, useEffect, useState} from "react"
import axios from "axios"
import './styles.css'
import {useSearchParams} from "react-router-dom"
import {Question} from "./Question"
import {ContentContext, ContentDispatchContext} from "../components/context/ContentContext"

const Exam = (props) => {
	const [userExam, setUserExam] = useState({examId: 0, questions: []})
	let [searchParams] = useSearchParams()
	const [isExamData, setIsExamData] = useState(false)
	const [initializeData, setInitializeData] = useState(false)
	
	const dispatch = useContext(ContentDispatchContext)
	const content = useContext(ContentContext)
	const examId = searchParams.get('id')
	
	useEffect(() => {
		dispatch({
			type:    "SET_EXAM_ID",
			payload: {id: examId}
		})
		
		const getExam = async (examId) => {
			try {
				const result = await axios({
					method: 'get',
					url:    content.server + '/exam?id=' + examId
				})
				dispatch({type: "SET_EXAM", payload: result.data})
				
				const questions = result.data.questions.map((item, index) => ({
					question:   item.question,
					questionId: item.id,
					answered:   false,
					answer:     0
				}))
				setUserExam({examId: content.examId, questions: questions})
				console.log("USEREXAM: ", userExam)
				setInitializeData(true)
				setIsExamData(true)
			} catch (err) {
				console.log("Virhe ", err)
			}
		}
		
		getExam(searchParams.get('id'))
		
	}, [])
	
	console.log("NIMI: ", content.exam.name)
	
	return (<div className="exam-container">
		{initializeData &&
			<>
				{isExamData ?
					<>
						<div className="exam-title-container">
							<div className="exam-title">
								{content.exam.name}
							</div>
						</div>
						{content.exam.questions ?
							<>
								{content.exam.questions.map((item, index) => {
									return (
										<Question key={index} question={item} id={index} setUserExam={setUserExam} userExam={userExam}/>)
								})}
								<button onClick={(e) => {
									
									if (!userExam.questions.reduce((a, b) => !a ? false : !!b.answered, true)) {
										console.log("Vastaa kaikkiin kysymyksiin")
									} else {
										console.log("Vastaukset tallennettu")
										userExam.questions.map((item) =>{
											saveAnswer({examId: content.exam.id, questionId: item.questionId, answerId: item.answer, userId: content.user.id, server: content.server})
										})
									}
								}}>Tallenna vastaukset
								</button>
								<br/>
								<p>TESTI:</p>
								{userExam.questions.map((item, index) =>
									<div>{item.question}{item.answered && <>{item.answer.id}</>}</div>)}
							</>
							:
							<>
								<p>Ei sisältöä</p>
							</>
						}
					</>
					:
					<>
						<h1>404 - Tenttiä ei löydy</h1>
					</>
				}
			</>
		}
	</div>)
}

const saveAnswer = async (props) => {
	try {
		const result = await axios({
			method: "post",
			url:    props.server + '/useranswer',
			data:   {examId: props.examId, questionId: props.questionId, answerId: props.answerId, userId: props.userId}
		})
	} catch (err) {
		console.log(err)
	}
}

export default Exam
