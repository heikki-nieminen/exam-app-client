export const Answer = (props) => {
	
	return (<div className="answer">
			<div>
				<input type="radio" name="answer" value={props.answer.answer} onChange={(e)=>{
					let copyUserExam = JSON.parse(JSON.stringify(props.userExam))
					copyUserExam.questions[props.questionId].answered = e.target.checked
					copyUserExam.questions[props.questionId].answer = props.answer.id
					props.setUserExam(copyUserExam)
				}}/>
				{props.answer.answer}
			</div>
	</div>)
}