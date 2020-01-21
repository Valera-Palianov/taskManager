import React from 'react'
import './Pagination.css'

const Pagination = (props) => {

	const {totalTaskCount, itemsPerPage, pageNumber} = props

	const onClickHandler = (pageNumber) => {
		props.onChange(pageNumber)
	}

	const pageCount = Math.ceil(totalTaskCount / itemsPerPage)

	let pages = []
	for (let i = 1; i <= pageCount; i++) {
		let disable = (pageNumber == i) ? true : false
		pages.push(<button key={i} className='pagination__button' disabled={disable} onClick={()=>{onClickHandler(i)}}>{i}</button>)
	}
	return (
		<div className='pagination'>
			{pages}
		</div>
	)
}

export default Pagination