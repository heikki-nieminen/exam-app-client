import axios from "axios"

export const saveAnswer = async (props) => {
	let answer = document.getElementById("edit-answer").value
	let isCorrect = document.getElementById("edit-answer-correct").checked
	try{
		let res = await axios({
			method: 'put',
			url:    props.server + '/exam/question/answer',
			data:   {id: props.id, answer: answer, isCorrect: isCorrect}
		})
		props.dispatch({
			type:    "EDIT_ANSWER",
			payload: {questionId: props.questionId, answerId: props.answerId, answer: answer, isCorrect: isCorrect}
		})
		props.setEditAnswer(false)
	}catch(err){
		console.log(err)
	}
}