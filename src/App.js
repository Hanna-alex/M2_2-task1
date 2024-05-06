
import styles from './app.module.css'
import { useState } from 'react'
import moment from 'moment'
import 'moment-precise-range-plugin'

export const App = () => {

	const [value, setValue] = useState('')
	const [list, setList] = useState([])
	const [error, setError] = useState('')
	let isValueVaild = value.length >= 3

	const onInputButtonClick = () => {
		const promptValue = prompt()

		setValue(promptValue)

		if (promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа')

		} else {
			setError('')

		}

	}

	const getDate = (date) => {

		return moment(date).format("DD.MM.YYYY HH:mm:ss")
	}

	const onAddButtonClick = () => {
		const dateForId = new Date()

		if (isValueVaild) {
			const newList = [...list, { id: dateForId.toISOString(), value: value, date: getDate(dateForId) }]

			setList(newList)
			setError('')
			setValue('')


		}
	}


	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "<output className={styles['current-value']}>{value}</output>"
			</p>
			{error !== '' && <div className={styles.error}>{error}</div>}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>Ввести новое</button>
				<button className={styles.button} disabled={!isValueVaild} onClick={onAddButtonClick}>Добавить в список</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{list.length === 0 && <p className={styles['no-margin-text']}>Нет добавленных элементов</p>}
				<ul className={styles.list}>
					{list.map(({ id, value, date, time }) => <li className={styles['list-item']} key={id}>{value} {date} {time}</li>)}
				</ul>
			</div>
		</div>
	);
}
