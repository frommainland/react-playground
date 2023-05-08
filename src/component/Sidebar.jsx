import React, { useState } from 'react'
import './Sidebar.scss'
import { motion } from 'framer-motion'
import { useMeasure } from 'react-use'

const menuItems = [
	'emoji on mouseover',
	'pinterest long press',
	'scroll velocity',
	'animation based on time animation based on time',
	'scroll speed inView',
]

const MenuItem = ({ text, selected, onClick }) => {
	const [ref, { width, height }] = useMeasure()
	return (
		<motion.li
			ref={ref}
			className="menu-item"
			onClick={onClick}
			animate={{
				color: selected ? '#EFFFE8' : '#3D4838',
			}}
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
	)
}

const Sidebar = () => {
	const [selected, setSelected] = useState(0)

	return (
		<nav className="sidebar">
			<ol>
				{menuItems.map((value, index) => (
					<MenuItem
						text={value}
						key={value}
						selected={selected === index}
						onClick={() => setSelected(index)}
					/>
				))}
			</ol>
		</nav>
	)
}

export default Sidebar
