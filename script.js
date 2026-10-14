const form = document.querySelector('form')
const passInput = document.getElementById('password')
const passValidate = document.getElementById('password_validation')
const inputError = document.querySelector('.input-error')

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PASSWORD_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

function setFieldError(input, message) {
	input.classList.add('invalid')
	let err = input.nextElementSibling
	if (!err || !err.classList.contains('field-error')) {
		err = document.createElement('p')
		err.classList.add('field-error')
		input.insertAdjacentElement('afterend', err)
	}
	err.textContent = message
}

function clearFieldError(input) {
	input.classList.remove('invalid')
	const err = input.nextElementSibling
	if (err && err.classList.contains('field-error')) {
		err.textContent = ''
	}
}

function validatePassword() {
	if (passInput.value !== passValidate.value) {
		inputError.style.visibility = 'visible'
		passValidate.setCustomValidity('Passwords do not match.')
	} else {
		inputError.style.visibility = 'hidden'
		passValidate.setCustomValidity('')
	}
}

passInput.addEventListener('input', () => {
	validatePassword()
	clearFieldError(passInput)
})
passValidate.addEventListener('input', () => {
	validatePassword()
	clearFieldError(passValidate)
})

form.querySelectorAll('input[required]').forEach((input) => {
	input.addEventListener('input', () => clearFieldError(input))
})

form.addEventListener('submit', (e) => {
	e.preventDefault()
	let isValid = true

	form.querySelectorAll('input[required]').forEach((input) => {
		clearFieldError(input)

		if (!input.value.trim()) {
			setFieldError(input, 'This field cannot be left blank.')
			isValid = false
			return
		}

		if (input.type === 'email' && !EMAIL_RE.test(input.value.trim())) {
			setFieldError(input, 'Please enter a valid email address.')
			isValid = false
		}

		if (input.id === 'password' && !PASSWORD_RE.test(input.value)) {
			setFieldError(
				input,
				'Password must be at least 8 characters and include an uppercase letter, a lowercase letter and a number.'
			)
			isValid = false
		}

		if (input.id === 'password_validation' && input.value !== passInput.value) {
			setFieldError(input, 'Passwords do not match.')
			isValid = false
		}
	})

	if (!isValid) return
})
