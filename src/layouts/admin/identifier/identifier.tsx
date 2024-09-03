import Styles from './identifier.module.css'

function Identifier() {
	return (
		<div className={Styles.id}>
			<div className={Styles.id_img}>
				<img src="/user.png" alt="User profile" />
			</div>
			<div>
				<p className={Styles.id_name}>Patrick Jane</p>
				<p className={Styles.id_title}>HR Manager</p>
			</div>
		</div>
	)
}

export default Identifier
