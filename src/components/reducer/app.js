export const reducer = (state, action) => {
	switch (action.type) {
		case "INITIALIZE_DATA": {
			let stateCopy = JSON.parse(JSON.stringify(state))
			return {...stateCopy, initialized: action.payload}
		}
		case "SET_ALERT" : {
			return {...state, alert: action.payload}
		}
		case "LOGIN": {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.initialized = false
			stateCopy.user.loggedIn = true
			stateCopy.user.id = action.payload.id
			if(action.payload.role === "admin") {
				stateCopy.user.isAdmin = true
			}
			stateCopy.user.role = action.payload.role
			stateCopy.user.token = action.payload.token
			return {...stateCopy, alert: ""}
		}
		case "LOGOUT": {
			let stateCopy = JSON.parse(JSON.stringify(state))
			localStorage.removeItem('access_token')
			stateCopy.user.loggedIn = false
			stateCopy.user.id = 0
			stateCopy.user.isAdmin = false
			stateCopy.user.token = ""
			return stateCopy
		}
		case "SET_USER" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.user.id = action.payload.id
			if(action.payload.role === "admin"){
				stateCopy.user.isAdmin = true
			}
			stateCopy.user.username = action.payload.name
			stateCopy.user.loggedIn = true
			return stateCopy
		}
		case "SET_EXAMS" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			return {...stateCopy, exams: action.payload}
		}
		case "SET_EXAM_ID" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			console.log("SETTING EXAM ID")
			return {...stateCopy, examId: action.payload.id, initialized: action.payload.initialized}
		}
		case "SET_EXAM" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			console.log("PAYLOAD NIMI: ", action.payload.name)
			return {...stateCopy, exam: action.payload}
		}
		case "SET_QUESTION" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.exam.questions.push(action.payload)
			return stateCopy
		}
		case "SET_ANSWERS" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			console.log("SETTING ANSWERS", action.payload.answers)
			console.log("QUESTIONS: ", stateCopy.exam.questions)
			stateCopy.exam.questions[action.payload.questionId].answers = action.payload.answers
			return stateCopy
		}
		case "SET_QUESTION_EDIT_MODE" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.exam.questions[action.payload].edit = !stateCopy.exam.questions[action.payload].edit
			return stateCopy
		}
		case "SET_EXAM_EDIT_MODE" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.exam.edit = !stateCopy.exam.edit
			return stateCopy
		}
		case "ADD_EXAM" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.exams.push({id: action.payload.id, name: action.payload.examName})
			return stateCopy
		}
		case "REMOVE_EXAM" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.exams.splice(action.payload, 1)
			return stateCopy
		}
		case "ADD_QUESTION" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.exam.questions.push({
				id: action.payload.id, question: action.payload.question, exam_id: action.payload.examId, answers: []
			})
			return stateCopy
		}
		case "EDIT_QUESTION": {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.exam.questions[action.payload.questionId].question = action.payload.question
			return stateCopy
		}
		case "ADD_QUESTION_ID" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.exam.questions[action.payload.index].id = action.payload.id
			return stateCopy
		}
		case "ADD_ANSWER" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.exam.questions[action.payload.questionId].answers.push({
				id:             action.payload.id,
				answer:         action.payload.answer,
				question_id:    action.payload.realQuestionId,
				correct_answer: action.payload.correct
			})
			console.log("Vastaus lisätty: ", stateCopy)
			return stateCopy
		}
		case "EDIT_ANSWER" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.exam.questions[action.payload.questionId].answers[action.payload.answerId].answer = action.payload.answer
			stateCopy.exam.questions[action.payload.questionId].answers[action.payload.answerId].correct_answer = action.payload.isCorrect
			return stateCopy
		}
		case "ADD_ANSWER_ID" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.exam.questions[action.payload.questionIndex].answers[action.payload.answerIndex].id = action.payload.answerIndex
			console.log("LISÄTTIIN VASTAUSID: ", stateCopy.exam.questions[action.payload.questionIndex].answers)
			return stateCopy
		}
		case "REMOVE_QUESTION" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.exam.questions.splice(action.payload.questionId, 1)
			return stateCopy
		}
		case "REMOVE_ANSWER" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			let removed = stateCopy.exam.questions[action.payload.questionId].answers.splice(action.payload.answerId, 1)
			console.log("POISTETTIIN: ", removed)
			return stateCopy
		}
		case "SAVE_EXAM" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			return stateCopy
		}
		case "SET_ROLE" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.user.isAdmin = action.payload
			return stateCopy
		}
	}
}

