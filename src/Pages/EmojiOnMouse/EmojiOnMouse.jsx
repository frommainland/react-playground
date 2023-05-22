import React, { useEffect, useRef, useState, useMemo } from 'react'
import { emojisData } from './EmojiData'
import './EmojiOnMouse.scss'
import { motion } from 'framer-motion'
import useMousePosition from '../../helper/hooks/useMousePosition'
import { smooth } from '../../helper/easing'

function rdm(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

const EmojiItem = ({ pageX, pageY, text, fontSize, rotate }) => {
	return (
		<motion.div
			initial={{ scale: 0 }}
			animate={{ scale: 1, rotate: rotate }}
			transition={{ ease: smooth }}
			className="logo"
			style={{
				left: pageX,
				top: pageY,
				fontSize: fontSize,
				// transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
				transform: `translate(-50%, -50%)`,
			}}
		>
			{text}
		</motion.div>
	)
}

const EmojiOnMouse = () => {
	const ref = useRef(null)

	const [emojiArray, setEmojiArray] = useState([])

	useEffect(() => {
		const refCurrent = ref.current
		// Track mouse position
		const handleMove = (e) => {
			let text = emojisData[rdm(0, emojisData.length - 1)]
			let fontSize = rdm(40, 160)
			let rotate = rdm(0, 360)
			let pageX = e.clientX - refCurrent.getBoundingClientRect().left - fontSize/2
			let pageY = e.clientY - fontSize/2
			setEmojiArray((pre) => [
				...pre,
				[text, pageX, pageY, fontSize, rotate],
			])
		}
		window.addEventListener('mousemove', handleMove)

		// Clean up
		return () => {
			window.removeEventListener('mousemove', handleMove)
		}
	}, [])

	const memoizedPositionArray = useMemo(() => {
		const positionArray = []
		window.addEventListener('mousemove', (event) => {
			positionArray.push({ x: event.clientX, y: event.clientY })
		})
		return positionArray
	}, [])

	return (
		<>
			{/* <div className="emoji-bg-text">
				<p>How to improve this page performance?</p>
				<p>Please let me know</p>
				<a href="mailto:caihehuang@gmail.com">caihehuang@gmail.com</a>
			</div> */}

			<div className="emoji-bg" ref={ref}>
				{emojiArray.map((value, index) => {
					return (
						<EmojiItem
							key={index}
							text={value[0]}
							pageX={value[1]}
							pageY={value[2]}
							fontSize={value[3]}
							rotate={value[4]}
						/>
					)
				})}
			</div>
		</>
	)
}

export default EmojiOnMouse
