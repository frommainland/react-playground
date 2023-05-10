import './App.scss'
// import Sidebar from './component/Sidebar'
import Playground from './component/Playground'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import EmojiOnMouse from './Pages/EmojiOnMouse'
import LongPress from './Pages/longPress'
import NoMatch from './Pages/NoMatch'

import React, { useState } from 'react'
import './component/Sidebar.scss'
import { motion } from 'framer-motion'
import { useMeasure } from 'react-use'

const menuItems = [
	{
		listName: 'emoji on mouseover',
		pathName: 'EmojiOnMouse',
		element: <EmojiOnMouse />,
	},
	{
		listName: 'pinterest long press',
		pathName: 'LongPress',
		element: <LongPress />,
	},
	{ listName: 'scroll velocity', pathName: 'ScrollVelecity' },
	{ listName: 'animation based on time', pathName: 'TimeElaspedAnimation' },
]

const MenuItem = ({ text, selected, onClick, pathName }) => {
	const [ref, { width, height }] = useMeasure()
	return (
		<Link to={`/${pathName}`}>
			<motion.li
				ref={ref}
				className="menu-item"
				onClick={onClick}
				animate={{
					color: selected ? '#EFFFE8' : '#3D4838',
				}}
				whileHover={{ backgroundColor: '#CEDAC7' }}
			>
				{text}
				{selected && (
					<motion.div
						className="underline"
						layoutId="underline"
						style={{
							width: width + 10,
							height: height + 20,
							top: 0,
							left: 0,
						}}
					/>
				)}
			</motion.li>
		</Link>
	)
}

const Sidebar = () => {
	const [selected, setSelected] = useState(0)

	return (
		<>
			<nav className="sidebar">
				<ol>
					{menuItems.map((value, index) => (
						<MenuItem
							text={value.listName}
							key={value.listName}
							selected={selected === index}
							onClick={() => setSelected(index)}
							pathName={value.pathName}
						/>
					))}
				</ol>
			</nav>
			<Outlet />
		</>
	)
}

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Sidebar />}>
					{menuItems.map((value, index) => {
						return (
							<Route
								path={value.pathName}
								element={
									value.element ? value.element : <NoMatch />
								}
								key={index}
							/>
						)
					})}
					{/* <Route index element={<EmojiOnMouse />} /> */}
					{/* <Route path="longPress" element={<LongPress />} />
					<Route path="emojiOnMouse" element={<EmojiOnMouse />} /> */}

					<Route path="*" element={<NoMatch />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
