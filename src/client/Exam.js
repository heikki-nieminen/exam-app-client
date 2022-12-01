import {useContext, useEffect, useState} from "react"
import axios from "axios"
import './styles.css'
import {useSearchParams} from "react-router-dom"
import {Question} from "./Question"
import {ContentContext, ContentDispatchContext} from "../components/context/ContentContext"

const Exam = (props) => {
	
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
							return (<Question key={index} question={item} id={index}/>)
						})}
						<button>Tallenna vastaukset</button>
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
