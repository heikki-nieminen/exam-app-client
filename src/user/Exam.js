import {useContext, useEffect, useReducer, useState} from "react"
import axios from "axios"
import './styles.css'
import {useSearchParams} from "react-router-dom"
import {Question} from "./Question"
import {ContentContext, ContentDispatchContext} from "../components/context/ContentContext"


const Exam = (props) => {
	const [userExam, setUserExam] = useState([])
	let [searchParams] = useSearchParams()
	const [isExamData, setIsExamData] = useState(false)
	const [initializeData, setInitializeData] = useState(false)
	
	const dispatch = useContext(ContentDispatchContext)
	const content = useContext(ContentContext)
	
	useEffect(() => {
		dispatch({
			type:    "SET_EXAM_ID",
			payload: {id: searchParams.get('id')}
		})
		
		const getExam = async (examId) => {
			try {
				const result = await axios({
					method: 'get',
					url:    content.server + '/exam?id=' + examId
				})
				dispatch({type: "SET_EXAM", payload: result.data})
				result.data.questions.map((item, index) => setUserExam(current => [...current, {question: item.question, answered: false}]))
				console.log("USEREXAM: ",userExam)
				setInitializeData(true)
				setIsExamData(true)
			} catch (err) {
				console.log("Virhe ", err)
			}
		}
		
		getExam(searchParams.get('id'))
		
	}, [])
	
	console.log("NIMI: ",content.exam.name)
	
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
							return (<Question key={index} question={item} id={index} setUserExam={setUserExam} userExam={userExam}/>)
						})}
						<button onClick={(e)=>{
							
							if(!userExam.reduce((a,b) =>!a ? false : !!b.answered , true)){
								console.log("Vastaa kaikkiin kysymyksiin")
							}
							else{
								console.log("Vastaukset tallennettu")
							}
						}}>Tallenna vastaukset</button>
						<br/>
						<p>TESTI:</p>
						{userExam.map((item, index)=><div>{item.question}{item.answered && <>{item.answer.id}</>}</div>)}
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

export default Exam
