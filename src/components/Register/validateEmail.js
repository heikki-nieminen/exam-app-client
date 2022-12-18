const regex = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')

export const validateEmail = (email) => {
	return regex.test(email)
}