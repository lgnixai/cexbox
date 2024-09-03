type UserRole =
	| 'CEO'
	| 'People Ops'
	| 'Manager'
	| 'Leader'
	| 'QA'
	| 'FE'
	| 'BE'
	| 'Mobile'
	| 'Designer'

type Gender = 'male' | 'female'

export interface Users {
	id: string
	fullname: string
	email: string
	gender: Gender
	role: UserRole
}
