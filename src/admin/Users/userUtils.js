import axios from "axios"

export const updateUser = async (props) => {
	try {
		const result = await axios({
			method: "put",
			url:    props.server + '/users',
			data:   {id: props.id, role: props.role}
		})
	} catch (err) {
		console.log(err)
	}
}

export const deleteUser = async (props) => {
	try {
		const result = await axios({
			method: "delete",
			url:    props.server + '/users',
			data:   {id: props.id}
		})
		
	} catch (err) {
		console.log(err)
	}
}

