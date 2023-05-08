import React, { useState } from 'react'
import './Sidebar.scss'
import { motion } from 'framer-motion'

const menuItems = [
	'emoji on mouseover',
	'pinterest long press',
	'scroll velocity',
	'animation based on time',
	'scroll speed inView',
]

const MenuItem = ({ text, selected, onClick }) => (
	<motion.div
		className="menu-item"
		onClick={onClick}
		animate={{ opacity: selected ? 1 : 0.5 }}
	>
		{text}
		{selected && <motion.div className="underline" layoutId="underline" />}
	</motion.div>
)

const Sidebar = () => {
	const [selected, setSelected] = useState(0)
	return (
		<nav className="sidebar">
			<ol>
				{menuItems.map((value, index) => {
					return <MenuItem text={value} key={value} selected={selected}
				})}
			</ol>
		</nav>
	)
}

export default Sidebar
