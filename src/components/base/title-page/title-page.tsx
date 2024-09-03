import { Box, Title } from '@mantine/core'
import Styles from './title.module.css'

function TitlePage({ text }: { text: string }) {
	return (
		<Box className={Styles.titles}>
			<Title order={1} size={'h3'}>
				{text}
			</Title>
		</Box>
	)
}

export default TitlePage
