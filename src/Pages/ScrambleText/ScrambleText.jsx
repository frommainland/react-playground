import React, { useState } from 'react'

function useInterval(callback, delay) {
	const intervalRef = React.useRef(null)
	const savedCallback = React.useRef(callback)
	React.useEffect(() => {
		savedCallback.current = callback
	}, [callback])
	React.useEffect(() => {
		const tick = () => savedCallback.current()
		if (typeof delay === 'number') {
			intervalRef.current = window.setInterval(tick, delay)
			return () => window.clearInterval(intervalRef.current)
		}
	}, [delay])
	return intervalRef
}

const letters = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
]

const emojis = [
	'😀, 😃, 😄, 😁, 😆, 😅, 😂, 🤣, 😊, 😇, 🙂, 🙃, 😉, 😌, 😍, 🥰, 😘, 😗, 😙, 😚, 😋, 😛, 😜, 🤪, 😝, 🤑, 🤗',
]

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min

// text change intervals, so can be used to determine how long it should be stopped
const timeChangeDelta = 300

function generateTextData() {
	const time = Date.now()
	return {
		text: letters[random(0, letters.length)],
		createdAt: time,
	}
}

const ScrambleText = () => {
	const [text, setText] = useState(null)
	const [textTracking, setTextTracking] = useState([])
	// console.log(textTracking)
	const [hasStop, setHasStop] = useState(false)
	useInterval(
		() => {
			let now = Date.now()
			let textInstance = generateTextData()
			setTextTracking([...textTracking, textInstance])
			let checkRounds =
				textTracking.filter((value) => {
					let delta = now - value.createdAt
					return delta > timeChangeDelta * 2
				}).length > 0
			setText(textInstance.text)
			setHasStop(checkRounds)
		},
		hasStop ? null : timeChangeDelta
	)

	// useInterval(() => {
	// 	const now = Date.now()
	// 	let textInstance = generateTextData()

	// 	const filteredText = text.filter((value, index) => {
	// 		let delta = now - value.createdAt
	// 		return delta < 2900
	// 	})

	// 	filteredText.push(textInstance)
	// 	setText(filteredText)
	// 	console.log(text)
	// }, 3000)

	return (
		<>
			<h1>123</h1>
			<h1>{text}</h1>
		</>
	)
}

export default ScrambleText
