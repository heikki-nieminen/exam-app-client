export const Answer = (props) => {

	return (<div className="answer">
			<div>
				<input type="checkbox" value={props.answer.answer}/>
				{props.answer.answer}
			</div>
	</div>)
}