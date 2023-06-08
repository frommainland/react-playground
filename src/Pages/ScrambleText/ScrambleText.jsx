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

const ScrambleTextEffect3 = () => {
	const [text, setText] = useState('what a nice day')
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
	const time = 280
	let count = 0
	let j = 0
	let delayAnimation = 0

	useEffect(() => {
		startScrambleText()
	}, [])

	const startScrambleText = () => {
		const stringSplit = text.split('')
		console.log(stringSplit)
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

	return (
		<h1
			className="text_box"
			style={{
				width: `${text.length}ch`,
				animation: `typing ${(time * text.length) / 1000}s steps(${
					text.length
				})`,
			}}
		>
			{text}
		</h1>
	)
}

const ScrambleText = () => {
	const [text, setText] = useState(displayTextArray)
	// let blockCharacters = [
	// 	'&#x2591;',
	// 	'&#x2592;',
	// 	'&#x2593;',
	// 	'&#x2588;',
	// 	'&#x2596;',
	// 	'&#x2597;',
	// 	'&#x2598;',
	// 	'&#x2599;',
	// 	'&#x259A;',
	// 	'&#x259B;',
	// 	'&#x259C;',
	// 	'&#x259D;',
	// 	'&#x259E;',
	// 	'&#x259F;',
	// ]

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
      ];
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
			<ScrambleTextEffect2 text={displayText} />
			<ScrambleTextEffect3 />
            <h1>{blockCharacters}</h1>
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


// https://codepen.io/anthonyChaussin/pen/xQxdNz?editors=1010