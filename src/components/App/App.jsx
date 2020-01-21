import React from 'react'
import './App.css'

import TaskList from '../../containers/TaskList'
import TaskListForm from '../../containers/TaskListForm'
import User from '../../containers/User'

const App = (props) => {
	return(
		<div className='app'>
			<div className='app__frame'>
				<TaskListForm />
				<TaskList />
				<User />
			</div>
		</div>
	)
}

export default App