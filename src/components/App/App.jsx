import React from 'react'
import './App.css'

import TaskList from '../../containers/TaskList'
import TaskForm from '../../containers/TaskForm'
import User from '../../containers/User'

const App = (props) => {
	return(
		<div className='app'>
			<div className='app__frame'>
				<TaskForm />
				<TaskList />
				<User />
			</div>
		</div>
	)
}

export default App