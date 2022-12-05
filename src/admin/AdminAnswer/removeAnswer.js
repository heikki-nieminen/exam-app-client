import axios from "axios"

export const removeAnswer = async (props) => {

	let request = {id: props.index}
	try {
		let res = await axios({
			method: 'delete',
			url:    props.server + '/exam/question/answer',
			data:   request
		})
		props.dispatch({
			type:    "REMOVE_ANSWER",
			payload: {questionId: props.questionId, answerId: props.id}
		})
	} catch (err) {
		console.log(err)
	}
}