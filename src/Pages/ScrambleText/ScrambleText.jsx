import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
import { smooth } from '../../helper/easing'

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

const blockCharacters = [
	'\u2591',
	'\u2592',
	'\u2593',
	'\u2588',
	'\u2596',
	'\u2597',
	'\u2598',
	'\u2599',
	'\u259A',
	'\u259B',
	'\u259C',
	'\u259D',
	'\u259E',
	'\u259F',
]

const specialCharacters = [
	'!',
	'§',
	'$',
	'%',
	'&',
	'/',
	'(',
	')',
	'=',
	'?',
	'_',
	'<',
	'>',
	'^',
	'°',
	'*',
	'#',
	'-',
	':',
	';',
	'~',
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
const generateTimes = 5
const numberOfDisplayText = range(0, displayText.length)
const displayTextArray = []
numberOfDisplayText.map((_, index) => {
	const scrambleTexts = generateTextData(generateTimes)
	displayTextArray.push([...scrambleTexts, arrayOfDisplayText[index]])
})

const ScrambleTextEffect1 = () => {
	const [text, setText] = useState(displayTextArray)

	const moveY = Array.from(
		{ length: generateTimes + 2 },
		(_, index) => `${100 - 100 * index}%`
	)

	return (
		<PlayGround>
			{text.map((innerArray, i) => {
				return (
					<Wrapper key={i}>
						{innerArray.map((value, index) => {
							return (
								<Item
									animate={{
										y: moveY,
									}}
									transition={{
										duration: text.length / 20,
										ease: smooth,
										delay: 0.25 * i,
									}}
									key={index}
								>
									{value}
								</Item>
							)
						})}
					</Wrapper>
				)
			})}
		</PlayGround>
	)
}

// hugo costa https://codepen.io/hug0hq/pen/OJXXLyB
function shuffle(word) {
	return word
		.split('')
		.sort(() => 0.5 - Math.random())
		.join('')
}

const generateTextArray = (text = displayText) => {
	let generatedText = []
	let text2Array = text.split('')
	text2Array.map((_, index) => {
		let temp = shuffle(text).slice(0, index + 1)
		generatedText.push(temp)
	})

	generatedText.push(text)
	return generatedText
}

const ScrambleTextEffect2 = ({ text }) => {
	const [textArray] = useState(generateTextArray(text))
	const [activeText, setActiveText] = useState(0)

	useInterval(
		() => {
			setActiveText(activeText + 1)
		},
		activeText == textArray.length - 1 ? null : 50
	)

	return (
		<>
			<Item>{textArray[activeText]}</Item>
		</>
	)
}

const ScrambleTextEffect3 = () => {
	const [text, setText] = useState('what a nice day')

	const random = (min, max) => Math.floor(Math.random() * (max - min)) + min
	const time = 100
	let count = 0
	let j = 0
	let delayAnimation = 0

	useEffect(() => {
		startScrambleText()
	}, [])

	const startScrambleText = () => {
		const stringSplit = text.split('')
		const interval = setInterval(() => {
			let newStringSplit = ''
			for (let i = 0; i <= stringSplit.length - 1; i++) {
				if (i <= j && count >= stringSplit.length + delayAnimation) {
					newStringSplit += stringSplit[i]
				} else {
					newStringSplit +=
						specialCharacters[
							random(0, specialCharacters.length - 1)
						]
				}
			}

			// if (count === 1) {
			// 	console.log(newStringSplit) // Log the initial value of text on the first interval
			// }
			setText(newStringSplit)

			count++

			if (count >= stringSplit.length + delayAnimation) {
				j++

				if (j >= stringSplit.length) {
					clearInterval(interval)
				}
			}
		}, time)
	}

	return <Item>{text}</Item>
}

function generateRandomString(inputString) {
	const length = inputString.length
	let randomString = ''

	for (let i = 0; i < length; i++) {
		const randomCharCode = Math.floor(Math.random() * 26) + 97 // Random lowercase character code (97-122)
		const randomChar = String.fromCharCode(randomCharCode)
		randomString += randomChar
	}

	return randomString
}

const ScrambleTextEffect4 = () => {
	let max = 3
	// const [text, setText] = useState('what a nice day')
	const [text, setText] = useState([
		'1',
		'sa',
		'dse',
		'wih2',
		'whza',
		'wha6',
		'what',
	])
	let temp = []
	const [count, setCount] = useState(0)
	const [j, setJ] = useState(0)

	const [activeText, setActiveText] = useState(0)

	useInterval(
		() => {
			if (count < max) {
				arrayOfDisplayText.map((value, index) => {
					temp.push(
						generateRandomString(
							arrayOfDisplayText.slice(0, index + 1).join('')
						)
					)
				})
			} else {
				arrayOfDisplayText.map((value, index) => {
					if (index <= j) {
						temp.push(
							arrayOfDisplayText.slice(0, index + 1).join('')
						)
					} else {
						temp.push(
							generateRandomString(
								arrayOfDisplayText.slice(0, index + 1).join('')
							)
						)
					}
				})
			}

			setCount((prevCount) => prevCount + 1)
			setText(temp)
			console.log(temp)
			if (count >= max) {
				setJ(j + 1)
			}
			setActiveText(activeText + 1)
		},
		j == text.length ? null : 500
	)

	return (
		<>
			<Item>{text[0]}</Item>
		</>
	)
}

const ScrambleText = () => {
	const [text, setText] = useState(displayTextArray)

	const moveY = Array.from(
		{ length: text.length - 3 },
		(_, index) => `${100 - 100 * index}%`
	)

	return (
		<Examples>
			<div>
				<ScrambleTextEffect2 text={displayText} />
				<ScrambleTextEffect3 />
				<ScrambleTextEffect4 />
				<ScrambleTextEffect1 />
			</div>
		</Examples>
	)
}

export default ScrambleText

const Examples = styled.div`
	display: flex;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100%;
`

const PlayGround = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`

const Wrapper = styled.div`
	overflow: hidden;
	height: 32px;
	width: 20px;
	text-align: center;
`
const Item = styled(motion.h1)`
	line-height: 1;
	font-size: 32px;
	font-family: var(--apercu-bold);
	color: var(--green3);
`

// https://codepen.io/anthonyChaussin/pen/xQxdNz?editors=1010
