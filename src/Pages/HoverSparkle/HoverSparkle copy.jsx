import React, { useState } from 'react'
import './HoverSparkle.scss'
import { motion } from 'framer-motion'
import { sparkleSvgShapes } from './SVgShapes'
import styled, { keyframes } from 'styled-components'

// josh'way
//range to generate array
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
// Utility helper for random number generation
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min
const useRandomInterval = (callback, minDelay, maxDelay) => {
	const timeoutId = React.useRef(null)
	const savedCallback = React.useRef(callback)
	React.useEffect(() => {
		savedCallback.current = callback
	}, [callback])
	React.useEffect(() => {
		let isEnabled =
			typeof minDelay === 'number' && typeof maxDelay === 'number'
		if (isEnabled) {
			const handleTick = () => {
				const nextTickAt = random(minDelay, maxDelay)
				timeoutId.current = window.setTimeout(() => {
					savedCallback.current()
					handleTick()
				}, nextTickAt)
			}
			handleTick()
		}
		return () => window.clearTimeout(timeoutId.current)
	}, [minDelay, maxDelay])
	const cancel = React.useCallback(function () {
		window.clearTimeout(timeoutId.current)
	}, [])
	return cancel
}

const SparkleColor = 'hsl(50deg, 100%, 50%)'

const generateSparkleData = (color = SparkleColor) => {
	const time = Date.now()
	return {
		id: crypto.randomUUID(),
		createdAt: Date.now(),
		// color,
		color: `hsl(${time % 360}deg, 100%, 50%)`,
		size: random(20, 90),
		style: {
			top: `${random(0, 100)}%`,
			left: `${random(0, 100)}%`,
			zIndex: 2,
			position: 'absolute',
		},
	}
}

const sparkleAnimation = keyframes`
  0% {
    transform: scale(0) rotate(0deg);
  }
  50% {
    transform: scale(1) rotate(90deg);
  }
  100% {
    transform: scale(0) rotate(180deg);
  }
`

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
`

const Svg = styled.svg`
	pointer-events: none;
	animation: ${sparkleAnimation} 0.6s ease-in-out forwards;
`

function SparkleDom({ color, size, style, selectShape }) {
	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			fill={color}
			viewBox="0 0 88 88"
			style={style}
			className="svgSparkle"
		>
			<path d={sparkleSvgShapes[selectShape]}></path>
		</Svg>
	)
}

function SparkleWrapper({ children, selectShape }) {
	const [sparklesData, setSparkleData] = useState([])
	const [isHover, setIsHover] = useState(false)

	useRandomInterval(
		() => {
			const sparkleItem = generateSparkleData()

			const filterSparkleItem = sparklesData.filter((v) => {
				const now = Date.now()
				const delta = now - v.createdAt
				return delta < 1000
			})
			filterSparkleItem.push(sparkleItem)
			setSparkleData(filterSparkleItem)
		},
		// isHover ? 100 : null,
		// isHover ? 350 : null
		100,
		550
	)

	return (
		<span
			style={{ position: 'relative', display: 'inline-block' }}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			{sparklesData.map((sparkle) => {
				return (
					<SparkleDom
						color={sparkle.color}
						size={sparkle.size}
						style={sparkle.style}
						key={sparkle.id}
						selectShape={selectShape}
					/>
				)
			})}
			<span className="content-wrapper">{children}</span>
		</span>
	)
}

function BottomNav({ passShape }) {
	const [selectTab, setSelectTab] = useState(0)
	return (
		<ul className="bottom-nav">
			{range(8).map((v, i) => {
				return (
					<li
						key={i}
						onClick={() => {
							setSelectTab(i)
							passShape(i)
						}}
					>
						{i === selectTab ? (
							<motion.div
								className="underline"
								layoutId="underline"
							/>
						) : null}
					</li>
				)
			})}
		</ul>
	)
}

const HoverSparkle = () => {
	const [selectShape, setSelectShape] = useState(0)

	function passShape(value) {
		setSelectShape(value)
	}

	return (
		<div className="sparkle-wrap">
			<SparkleWrapper selectShape={selectShape}>
				<div className="pearl-ring"></div>
			</SparkleWrapper>
			<BottomNav passShape={passShape} />
		</div>
	)
}

export default HoverSparkle
