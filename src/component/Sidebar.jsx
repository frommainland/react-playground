import React, { useState } from 'react'
import './Sidebar.scss'
import { motion } from 'framer-motion'
import { useMeasure } from 'react-use'
import { Routes, Route, Outlet, Link } from 'react-router-dom'

const menuItems = [
	{ listName: 'emoji on mouseover', pathName: 'emojiOnMouse' },
	{ listName: 'pinterest long press', pathName: 'longPress' },
	{ listName: 'scroll velocity', pathName: 'scrollVelecity' },
	{ listName: 'animation based on time', pathName: 'timeElaspedAnimation' },
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

export default Sidebar
