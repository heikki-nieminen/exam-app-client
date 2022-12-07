import edit from '../img/edit.png'
import remove from '../img/remove.png'
import {useContext, useEffect, useState} from "react"
import {ContentContext, ContentDispatchContext} from "../../components/context/ContentContext"
import {removeAnswer} from "./removeAnswer"
import {saveAnswer} from "./saveAnswer"


export const AdminAnswer = (props) => {
	const [editAnswer, setEditAnswer] = useState(false)
	const [initializeData, setInitializeData] = useState(false)
	const content = useContext(ContentContext)
	const dispatch = useContext(ContentDispatchContext)

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
				<button onClick={()=>
					saveAnswer({server:content.server, dispatch:dispatch, id: props.answer.id, questionId: props.questionId, answerId: props.id, setEditAnswer:setEditAnswer})
				}>Tallenna vastaus
				</button>
			</div>
		}
		{props.edit &&
			<>
				{!editAnswer &&
					<div className="right">
						<input type="checkbox" checked={props.answer.correct_answer} disabled={true}/>
						<img className="answer-image" src={edit} onClick={() => setEditAnswer(true)}/>
						<img className="answer-image" src={remove} alt="Remove answer button" onClick={()=>
							removeAnswer({id: props.answer.id, questionId: props.questionId, answerId: props.id, server:content.server, dispatch:dispatch})
						}/>
					</div>
				}
			</>
		}
	</div>)
}