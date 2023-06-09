import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion, useTime } from 'framer-motion'
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
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
]

const emojis = [
	'😀',
	'😃',
	'😄',
	'😁',
	'😆',
	'😅',
	'😂',
	'🤣',
	'😊',
	'😇',
	'🙂',
	'🙃',
	'😉',
	'😌',
	'😍',
	'🥰',
	'😘',
	'😗',
	'😙',
	'😚',
	'😋',
	'😛',
	'😜',
	'🤪',
	'😝',
	'🤑',
	'🤗',
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

const test = [...letters, ...emojis]

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

function generateTextData(number, symbol = letters) {
	const numberOfTexts = range(0, number)
	const fullTextArray = []
	numberOfTexts.map(() => {
		fullTextArray.push(symbol[random(0, symbol.length)])
	})
	return fullTextArray
}

const ScrambleTextEffect1 = ({ word, generateTimes = 5 }) => {
	let generatedData = []

	range(0, word.length).map((_, index) => {
		const scrambleTexts = generateTextData(generateTimes)
		generatedData.push([...scrambleTexts, word[index]])
	})

	const [text, setText] = useState(generatedData)

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

const generateTextArray = (text = '') => {
	let generatedText = []
	let text2Array = text.split('')
	text2Array.map((_, index) => {
		let temp = shuffle(text).slice(0, index + 1)
		generatedText.push(temp)
	})

	generatedText.push(text)
	return generatedText
}

const ScrambleTextEffect2 = ({ word, speed = 100 }) => {
	const [textArray] = useState(generateTextArray(word))
	const [activeText, setActiveText] = useState(0)

	useInterval(
		() => {
			setActiveText(activeText + 1)
		},
		activeText == textArray.length - 1 ? null : speed
	)

	return (
		<ItemWrapper>
			<Item>{textArray[activeText]}</Item>
		</ItemWrapper>
	)
}

const ScrambleTextEffect3 = ({ word, speed = 100 }) => {
	const [text, setText] = useState(word)

	const random = (min, max) => Math.floor(Math.random() * (max - min)) + min
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
					newStringSplit += letters[random(0, letters.length - 1)]
				}
			}

			setText(newStringSplit)

			count++

			if (count >= stringSplit.length + delayAnimation) {
				j++

				if (j >= stringSplit.length) {
					clearInterval(interval)
				}
			}
		}, speed)
	}

	return (
		<ItemWrapper>
			<Item>{text}</Item>
		</ItemWrapper>
	)
}

function generateRandomString(inputString) {
	const length = inputString.length
	let randomString = ''

	for (let i = 0; i < length; i++) {
		const randomCharCode = letters[random(0, letters.length - 1)]
		randomString += randomCharCode
	}

	return randomString
}

const ScrambleTextEffect4 = ({ word, speed = 100 }) => {
	let max = 8

	// example of the disired array
	// const [text, setText] = useState([
	// 	'1',
	// 	'sa',
	// 	'dse',
	// 	'wih2',
	// 	'whza2',
	// 	'wha63d',
	// 	'what567',
	// 	'whata67u',
	// 	'whatad7s',
	// 	'whatadae',
	// 	'whataday',
	// ])

	let temp = []
	const [text, setText] = useState(temp)
	const [activeText, setActiveText] = useState(0)

	// generate max of random letter like ['c','er','tww']

	// max = 3
	// ------->
	// c
	// er
	// tww

	range(0, max).map((v, i) => {
		let newString = ''
		for (let j = 0; j <= i; j++) {
			newString += generateRandomString(j.toString())
		}
		temp.push(newString)
	})

	range(0, word.length).map((v, i) => {
		let newString = ''
		let newTemp = []

		for (let index = 0; index < word.length; index++) {
			if (index <= i) {
				newString = word[index]
				newTemp.push(newString)
			} else {
				newString = generateRandomString(index.toString())
				newTemp.push(newString)
			}
		}

		let final = newTemp.join('')
		temp.push(
			final
				.split('')
				.slice(0, max + i < word.length ? max + i : word.length)
		)
	})

	useInterval(
		() => {
			setActiveText(activeText + 1)
		},
		activeText == max + word.length - 1 ? null : speed
	)

	return (
		<ItemWrapper>
			<Item>{text[activeText]}</Item>
		</ItemWrapper>
	)
}

const ScrambleText = () => {
	return (
		<Examples>
			<div style={{ width: '50vw' }}>
				<ScrambleTextEffect3
					word="It was a dark and stormy night,
The wind howled with all its might."
					speed={100}
				/>
				<ScrambleTextEffect2
					word="The rain poured down in relentless streams,
I sought shelter from my haunting dreams."
					speed={95}
				/>
				<ScrambleTextEffect4
					word="But in the darkness, a flicker of light,
Guided me through the endless night."
					speed={75}
				/>
				{/* <ScrambleTextEffect1 word="It was a dark and stormy night." /> */}
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

const ItemWrapper = styled.div`
	margin-bottom: 2rem;
`
const Item = styled(motion.h1)`
	line-height: 1.4;
	font-size: 32px;
	font-family: var(--apercu-bold);
	color: var(--green3);
`

// https://codepen.io/anthonyChaussin/pen/xQxdNz?editors=1010
