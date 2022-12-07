import axios from "axios"

export const removeAnswer = async (props) => {
	
	try {
		const res = await axios({
			method: 'delete',
			url:    props.server + '/exam/question/answer',
			data: {id: props.id}
		})
		props.dispatch({
			type:    "REMOVE_ANSWER",
			payload: {questionId: props.questionId, answerId: props.answerId}
		})
	} catch (err) {
		console.log(err)
	}
}