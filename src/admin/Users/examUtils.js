import axios from "axios"
import {useContext} from "react"
import {ContentContext} from "../../components/context/ContentContext"

export const addExamToUser = async (props) => {
	console.log("KUTSU ", props.server)
	try {
		const result = await axios({
			method: "post",
			url:    props.server + '/users/exam',
			data:   {examId: props.examId, userId: props.userId, name: props.name}
		})
		props.setAddExam(false)
	} catch (err) {
		console.log(err)
	}
}

export const deleteExamFromUser = async () => {

}

export const getExams = async (content, dispatch) => {
	try {
		let res = await axios({
			method: 'get',
			url:    content.server + '/exams',
		})
		dispatch({type: "SET_EXAMS", payload: res.data})
	} catch (err) {
		console.log("Ei toimi ", err)
	}
}