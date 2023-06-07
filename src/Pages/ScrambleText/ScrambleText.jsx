import React, { useState } from 'react'
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
const generateTimes = 10
const numberOfDisplayText = range(0, displayText.length)
const displayTextArray = []
numberOfDisplayText.map((_, index) => {
	const scrambleTexts = generateTextData(generateTimes)
	displayTextArray.push([...scrambleTexts, arrayOfDisplayText[index]])
})

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
		activeText == textArray.length - 1 ? null : 100
	)

	return (
		<>
			<h1>{textArray[activeText]}</h1>
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
		<>
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
											duration: text.length / 10,
											ease: smooth,
											delay: 1 + 0.25 * i,
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
			<ScrambleTextEffect2 text='abcde' />
		</>
	)
}

export default ScrambleText

const PlayGround = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	/* height: 100%; */
	width: 100%;
`

const Wrapper = styled.div`
	overflow: hidden;
	height: 32px;
	width: 22px;
	text-align: center;
`
const Item = styled(motion.h1)`
	line-height: 1;
	font-size: 32px;
	font-family: var(--apercu-bold);
`


const originalString = "whatatime";
const maxRandomLetters = 5;

const generatedArray = [];

for (let i = 0; i < originalString.length; i++) {
  const randomLetters = i < maxRandomLetters ? generateRandomLetters() : generatedArray[i - maxRandomLetters];
  const currentSubstring = originalString.substring(0, i + 1);
  const currentEntry = currentSubstring + randomLetters;
  generatedArray.push(currentEntry);
}

// Function to generate random letters
function generateRandomLetters() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let randomLetters = "";
  
  for (let i = 0; i < maxRandomLetters; i++) {
    randomLetters += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  
  return randomLetters;
}

console.log(generatedArray);