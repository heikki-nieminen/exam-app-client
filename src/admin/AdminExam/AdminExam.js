import {ContentContext, ContentDispatchContext} from "../../components/context/ContentContext"
import {useContext, useEffect, useState} from "react"
import axios from "axios"
import {useSearchParams} from "react-router-dom"
import edit from '../img/edit.png'
import {AdminQuestion} from "../AdminQuestion/AdminQuestion"
import {AddQuestion} from "./AddQuestion"

export const AdminExam = (props) => {
	const content = useContext(ContentContext)
	const dispatch = useContext(ContentDispatchContext)
	
	let [searchParams] = useSearchParams()
	const [addQuestion, setAddQuestion] = useState(false)
	const [isExamData, setIsExamData] = useState(false)
	const [initializeData, setInitializeData] = useState(false)

	useEffect(() => {
		dispatch({
			type:    "SET_EXAM_ID",
			payload: {id: searchParams.get('id')}
		})
		
		const getExam = async (examId) => {
			try {
				let res = await axios({
					method: 'get',
					url:    content.server + '/exam?id=' + examId
				})
				dispatch({type: "SET_EXAM", payload: res.data})
				setInitializeData(true)
				console.log("DATA SET TO TRUE")
				setIsExamData(true)
			} catch (err) {
				console.log("Virhe ", err)
			}
		}
		if (!initializeData) {
			console.log("Calling getExam()")
			getExam(searchParams.get('id'))
		}
	}, [])
	
	return (<div className="exam-container">
		{initializeData ?
			<>
				{isExamData ?
					<>
						<div className="exam-title-container">
							<div className="exam-title">
								{content.exam.name}
							</div>
							{content.user.isAdmin &&
								<img className="exam-image" src={edit} alt="Edit exam button" onClick={() => {
									dispatch({type: "SET_EXAM_EDIT_MODE"})
								}}/>
							}
						</div>
						{content.exam.questions ?
							<>
								{content.exam.questions.map((item, index) => {
									return (<AdminQuestion key={index} id={index} question={item}/>)
								})}
								<button>Tallenna vastaukset</button>
							</>
							:
							<>
								<p>Ei sisältöä</p>
							</>
						}
						{content.exam.edit &&
							<>
								{addQuestion ?
									<AddQuestion setAddQuestion={setAddQuestion}/>
									:
									<div className="exam-buttons">
										<button onClick={() => {
											setAddQuestion(true)
										}}>Lisää kysymys
										</button>
									</div>
								}
							</>
						}
					</>
					:
					<>
						<h1>404 - Tenttiä ei löydy</h1>
					</>
				}
			</>
			:
			<>
				<h1>Ladataan...</h1>
			</>
		}
	</div>)
}