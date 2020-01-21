import React from 'react'
import "./TaskListSortSwitcher.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TaskListSortSwitcher = (props) => {

	const {activeSortField, activeSortDirection, sortFields} = props

	const onSortFieldChange = (field) => {props.sortFieldChange(field)}
	const onSortDirectionChange = (direction) => props.sortDirectionChange(direction)

	const sortFieldsJSX = sortFields.map((f, i) => {

		let classes = "sort-switcher__field sort-switcher__button"
		if(f.field == activeSortField) classes += " sort-switcher__field_active"
		return <button className={classes} key={i} onClick={()=>{onSortFieldChange(f.field)}}>{f.name}</button>

	})

	const directionIcon = (activeSortDirection == "asc") ? "sort-amount-down" : "sort-amount-down-alt"
	const newDirection = (activeSortDirection == "asc") ? "desc" : "asc"

	return (
		<div className='sort-switcher card'>
			<div className='sort-switcher__fields'>
				{sortFieldsJSX}
			</div>
			<div className='sort-switcher__directions'>
				<button onClick={()=>{onSortDirectionChange(newDirection)}} className='sort-switcher__button sort-switcher__direction'>
					<FontAwesomeIcon icon={directionIcon}/>
				</button>
			</div>
		</div>
	)
}

export default TaskListSortSwitcher