import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion, useTime } from 'framer-motion'
import styled from 'styled-components'
import { smooth } from '../../helper/easing'
import { letters, emojis, blockCharacters, specialCharacters } from './symbols'
import './ScrambleText.scss'

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

function generateRandomString(inputString, symbol='') {
	const length = inputString.length
	let randomString = ''

	for (let i = 0; i < length; i++) {
		const randomCharCode = symbol[random(0, symbol.length - 1)]
		randomString += randomCharCode
	}

	return randomString
}

const allTextVariations = [letters, emojis, blockCharacters, specialCharacters]

const ScrambleTextEffect4 = ({
	word = '',
	speed = 100,
	isReset,
	textVariation,
}) => {
	let max = 10

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
	let diffTemp = []
	const [text] = useState(temp)
	const [diffText] = useState(diffTemp)
	const [activeText, setActiveText] = useState(0)

	// reset button clicked, reset all
	useEffect(() => {
		setActiveText(0)
	}, [isReset])

	// generate max of random letter like ['c','er','tww']

	// max = 3
	// ------->
	// c
	// er
	// tww

	range(0, max).map((v, i) => {
		let newString = ''
		for (let j = 0; j <= i; j++) {
			newString += generateRandomString(
				j.toString(),
				emojis
			)
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
				// newString = ''
				// newTemp.push(newString)
			} else {
				newString = generateRandomString(
					index.toString(),
					emojis
				)
				newTemp.push(newString)
			}
		}

		let final = newTemp.join('')
		// temp.push(final)
		temp.push(
			final
				.split('')
				.slice(i + 1, max + i < word.length ? max + i : word.length)
				.join('')
		)
	})

	//  --------- only show done part ------------------------------

	// set up start, empty with max times
	range(0, max).map(() => {
		diffTemp.push('')
	})

	// get "done" part
	range(0, word.length).map((v, i) => {
		let newString = ''
		let newTemp = []
		for (let index = 0; index <= i; index++) {
			newString = word[index]
			newTemp.push(newString)
		}
		let final = newTemp.join('')
		diffTemp.push(final)
	})

	useInterval(
		() => {
			setActiveText(activeText + 1)
		},
		activeText == max + word.length - 1 ? null : speed
	)

	return (
		<ItemWrapper>
			<ScrambleTextSpan>{diffText[activeText]}</ScrambleTextSpan>
			<ScrambleTextSpan
				style={{
					color: 'var(--green1)',
					backgroundColor: 'var(--green3)',
				}}
			>
				{text[activeText]}
			</ScrambleTextSpan>
		</ItemWrapper>
	)
}

const ScrambleTextSpan = styled.span`
	line-height: 1.4;
	font-size: 24px;
	font-family: var(--apercu-bold);
	color: var(--green3);
`
//------------------------------------------

const SettingButton = styled(motion.div)`
	font-size: 1rem;
	font-family: var(--apercu-bold);
	padding: 10px;
	border-radius: 0.5em;
	&:hover {
		background-color: var(--green2);
		cursor: pointer;
	}
`
const SettingButtonWrap = styled(motion.div)`
	padding: 1rem;
	/* border-radius: 0.5rem; */
	border: 1px solid var(--green3);
	box-shadow: 0px 4px 4px rgba(61, 72, 56, 0.25);
`

const SVGRefresh = (props) => (
	<svg
		width={24}
		height={24}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M1 4v6h6"
			stroke="#3d4838"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"
			stroke="#3d4838"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)

let text =
	'It was a dark and stormy night,\nThe wind howled with all its might.\nThe rain poured down in relentless streams,\nI sought shelter from my haunting dreams.\nBut in the darkness, a flicker of light,\nGuided me through the endless night.'

const settingSpeed = ['0.25x', '0.5x', '1x', '2x']
const settingText = ['Aa', '😀😅', '▛░', '%&']
const settingEffect = ['scramble 1', 'scramble 2', 'scramble 3']

const Settings = ({ resetHandler, speedHandler, textHandler }) => {
	const [isClicked, setIsClicked] = useState(false)
	const [speedSelected, setSpeedSelected] = useState(2)
	const [textSelected, setTextSelected] = useState(0)
	const [effectSelected, setEffectSelected] = useState(0)
	return (
		<motion.div
			style={{
				display: 'flex',
				alignContent: 'flex-start',
				alignItems: 'flex-start',
				width: '50vw',
				gap: '2rem',
			}}
			layout
		>
			{/* setting button */}
			<motion.div
				layout
				initial={{
					borderRadius: 10,
					border: '1px solid var(--green3)',
					boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
				}}
				className={isClicked ? 'parent isOpen' : 'parent'}
			>
				{!isClicked && (
					<motion.div
						layout
						className="setting-button"
						initial={{ opacity: 0, fontSize: '1rem' }}
						animate={{ opacity: 1 }}
						onClick={() => setIsClicked(true)}
					>
						setting
					</motion.div>
				)}

				{/* setting pannels */}
				{isClicked && (
					<motion.div
						className="setting-panel"
						layout
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<div className="row-wrap">
							<div className="row">
								{settingSpeed.map((v, i) => {
									return (
										<div
											className="setting-button"
											key={i}
											style={{
												backgroundColor:
													speedSelected == i
														? '#C2D1BC'
														: null,
											}}
											onClick={() => {
												setSpeedSelected(i)
												speedHandler(v)
											}}
										>
											{v}
										</div>
									)
								})}
							</div>
							<div className="row">
								{settingText.map((v, i) => {
									return (
										<div
											className="setting-button"
											key={i}
											style={{
												backgroundColor:
													textSelected == i
														? '#C2D1BC'
														: null,
											}}
											onClick={() => {
												setTextSelected(i)
												textHandler(i)
											}}
										>
											{v}
										</div>
									)
								})}
							</div>
							<div className="row">
								{settingEffect.map((v, i) => {
									return (
										<div className="setting-button" key={i}>
											{v}
										</div>
									)
								})}
							</div>
						</div>
						<div
							className="setting-button"
							style={{ textAlign: 'center' }}
							onClick={() => setIsClicked(false)}
						>
							close
						</div>
					</motion.div>
				)}
			</motion.div>
			<SettingButtonWrap layout>
				<SettingButton onClick={resetHandler}>
					<SVGRefresh />
				</SettingButton>
			</SettingButtonWrap>
		</motion.div>
	)
}

///----------------------------------------- full component---

const ScrambleText = () => {
	const [isReset, setIsReset] = useState(0)
	function resetHandler() {
		setIsReset((pre) => pre + 1)
	}

	const [speedRatio, setSpeedRatio] = useState(1)
	function speedHandler(item) {
		let number = parseFloat(item)
		setSpeedRatio(number)
	}

	const [textVariation, setTextVariation] = useState(0)
	function textHandler(item) {
		setTextVariation(item)
	}
    console.log(textVariation)

	return (
		<Examples>
			<div style={{ width: '50vw' }}>
				{/* <ScrambleTextEffect3
					word="It was a dark and stormy night,
The wind howled with all its might."
					speed={100}
				/> */}
				{/* <ScrambleTextEffect2
					word="The rain poured down in relentless streams,
I sought shelter from my haunting dreams."
					speed={95}
				/> */}
				<ScrambleTextEffect4
					word={text}
					speed={75 / speedRatio}
					isReset={isReset}
					textVariation={textVariation}
				/>
				{/* <ScrambleTextEffect1 word="It was a dark and stormy night." /> */}
			</div>
			<Settings
				resetHandler={resetHandler}
				speedHandler={speedHandler}
				textHandler={textHandler}
			/>
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
	font-size: 24px;
	font-family: var(--apercu-bold);
	color: var(--green3);
`

// https://codepen.io/anthonyChaussin/pen/xQxdNz?editors=1010
