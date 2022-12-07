
export const Answer = (props) => {
	
	return (<div className="answer">
			<div>
				<input type="radio" name="answer" value={props.answer.answer} onChange={(e)=>{
					let copyUserExam = props.userExam.slice()
					copyUserExam[props.questionId].answered = e.target.checked
					copyUserExam[props.questionId].answer = {id: props.answer.id}
					props.setUserExam(copyUserExam)
				}}/>
				{props.answer.answer}
			</div>
	</div>)
}