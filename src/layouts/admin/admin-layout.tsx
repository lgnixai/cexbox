import { NavLink } from '@mantine/core'
import { IconArticle, IconUser } from '@tabler/icons-react'

import { ChildrenProps } from '~/types'
import Styles from './admin.module.css'
import Identifier from './identifier/identifier'

function AdminLayout({ children }: ChildrenProps) {
	return (
		<div className={Styles.layout}>
			<aside className={Styles.sidebar}>
				<Identifier />

				<NavLink
					href="#required-for-focus"
					label="Blogs"
					leftSection={<IconArticle size="1rem" stroke={1.5} />}
					childrenOffset={28}
				>
					<NavLink href="#required-for-focus" label="Draft" />
					<NavLink href="#required-for-focus" label="Published" />
				</NavLink>

				<NavLink
					href="#required-for-focus"
					label="User Management"
					leftSection={<IconUser size="1rem" stroke={1.5} />}
					childrenOffset={28}
					defaultOpened
				>
					<NavLink label="Table" href="/admin/table" />
				</NavLink>

				<div></div>
			</aside>
			<div className={Styles.content}>
				<main className={Styles.main}>{children}</main>
			</div>
		</div>
	)
}

export default AdminLayout
