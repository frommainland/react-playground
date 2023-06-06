import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// test for animatepresence
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
const range = (start, end, step = 1) => {
	let output = []
	if (typeof end === 'undefined') {
		end = start
		start = 0
	}
	for (let i = start; i < end; i += step) {
		output.push(i)
	}
	return output
}

const displayText = 'what a nice day'
const arrayOfDisplayText = displayText.split('')

function generateTextData(number) {
	const numberOfTexts = range(0, number)
	const fullTextArray = []
	numberOfTexts.map(() => {
		fullTextArray.push(letters[random(0, letters.length)])
	})
	return fullTextArray
}

//
const generateTimes = 9
const numberOfDisplayText = range(0, displayText.length)
const displayTextArray = []
numberOfDisplayText.map((_, index) => {
	const scrambleTexts = generateTextData(generateTimes)
	displayTextArray.push([...scrambleTexts, arrayOfDisplayText[index]])
})
7

const scrambleTexts = generateTextData()

const ScrambleText = () => {
	// const [text, setText] = useState(scrambleTexts)

	// useInterval(
	// 	() => {
	// 		const removeOne = text.length > 1 ? [...text.slice(1)] : [...text]
	// 		setText(removeOne)
	// 	},
	// 	text.length > 1 ? 300 : null
	// )

	const [text, setText] = useState(displayTextArray)

	useInterval(() => {
		const newText = [...text]
		const removeOne = newText.map((innerArray) =>
			innerArray.length > 1 ? innerArray.slice(1) : innerArray
		)
		setText(removeOne)
	}, 200)

	return (
		<>
			<AnimatePresence>
				{text.map((value, index) => {
					return (
						<motion.span
							key={`${value}${index}`}
							initial={{ opacity: 0 }}
							animate={{
								opacity: 1,
								transition: {
									delay: index * 0.3,
								},
							}}
							exit={{ opacity: 0 }}
						>
							{value[0]}
						</motion.span>
					)
				})}
			</AnimatePresence>
		</>
	)
}

export default ScrambleText
