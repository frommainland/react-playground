import React, { useEffect, useRef, useState } from 'react'
import { emojisData } from './EmojiData'
import './EmojiOnMouse.scss'
import useMousePosition from '../../helper/hooks/useMousePosition'

function rdm(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

const EmojiItem = ({ pageX, pageY, text, fontSize, rotate }) => {
	return (
		<div
			className="logo"
			style={{
				left: pageX,
				top: pageY,
				fontSize: fontSize,
				transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
			}}
		>
			{text}
		</div>
	)
}

const EmojiOnMouse = () => {
	const mousePosition = useMousePosition()
	const [emojiArray, setEmojiArray] = useState([])
	const [move, setMove] = useState(0)

	const ref = useRef(null)

	function becool() {
		const refCurrent = ref.current
		let text = emojisData[rdm(0, emojisData.length - 1)]
		let pageX = mousePosition.x - refCurrent.getBoundingClientRect().left
		let pageY = mousePosition.y
		let fontSize = rdm(40, 160)
		let rotate = rdm(0, 360)
		setMove((move) => move + 1)
		if (move % 7 === 0) {
			setEmojiArray((pre) => [
				...pre,
				[text, pageX, pageY, fontSize, rotate],
			])
		}
	}

	return (
		<>
			<div className="emoji-bg-text">
				<p>How to improve this page performance?</p>
				<p>Please let me know</p>
				<a href="mailto:caihehuang@gmail.com">caihehuang@gmail.com</a>
			</div>
			<div className="emoji-bg" onMouseMove={becool} ref={ref}>
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
