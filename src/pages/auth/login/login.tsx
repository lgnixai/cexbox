import { useNavigate } from 'react-router-dom'
import { Button, PasswordInput, TextInput } from '@mantine/core'
import { isEmail, useForm } from '@mantine/form'

import { ChildrenProps } from '~/types'
import Styles from './login.module.css'

function LoginPage() {
	return (
		<div className={`${Styles.container}`}>
			<div className={`${Styles.login_card}`}>
				<div className={`${Styles.login_word}`}>
					<h1>Login page</h1>
					<p>Get started today.</p>
				</div>
				<LoginForm />
			</div>
		</div>
	)
}

function InputWrapper({ children }: ChildrenProps) {
	return <div className={`${Styles.input_wrapper}`}>{children}</div>
}

function LoginForm() {
	const navigate = useNavigate()
	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			email: '',
			password: '',
		},

		validate: {
			email: isEmail('Invalid email'),
			password: (value) =>
				value.length < 6 ? 'Password must be at least 6 characters' : null,
		},
	})

	const handleSubmit = (values: typeof form.values) => {
		console.log(values)
		form.reset()
		setTimeout(() => {
			navigate('/admin/')
		}, 1000)
	}

	return (
		<form onSubmit={form.onSubmit(handleSubmit)} className={`${Styles.form}`}>
			<InputWrapper>
				<TextInput
					withAsterisk
					label="Email"
					placeholder="your@email.com"
					key={form.key('email')}
					{...form.getInputProps('email')}
				/>
			</InputWrapper>

			<InputWrapper>
				<PasswordInput
					label="Password"
					placeholder="Your password"
					key={form.key('password')}
					{...form.getInputProps('password')}
				/>
			</InputWrapper>

			<InputWrapper>
				<Button type="submit" fullWidth>
					Login
				</Button>
			</InputWrapper>
		</form>
	)
}

export default LoginPage
