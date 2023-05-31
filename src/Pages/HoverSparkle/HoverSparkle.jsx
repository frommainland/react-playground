import React, { useLayoutEffect, useState } from 'react'
import './HoverSparkle.scss'
import { motion } from 'framer-motion'
import { useRef } from 'react'

// josh'way

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

const generateSparkle = (color = SparkleColor) => {
	return {
		id: crypto.randomUUID(),
		createdAt: Date.now(),
		color,
		size: random(20, 40),
		style: {
			top: `${random(0, 100)}%`,
			left: `${random(0, 100)}%`,
			zIndex: 2,
			position: 'absolute',
		},
	}
}

function SparkleInstance({ color, size, style }) {
	return (
		<motion.svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			fill={color}
			viewBox="0 0 88 87"
			style={style}
			className="svgSparkle"
			// animate={{ scale: [0, 1, 0], rotate: [0, 180] }}
			// transition={{
			// 	duration: 1,
			// 	ease: 'easeInOut',
			// }}
		>
			<path d="M47.51 70.387a30.94 30.94 0 018.647-15.726 30.687 30.687 0 0115.891-8.233L88 43.5l-15.953-2.928h.002a30.688 30.688 0 01-15.892-8.233 30.94 30.94 0 01-8.646-15.726L44 0 40.49 16.613a30.942 30.942 0 01-8.647 15.726 30.687 30.687 0 01-15.891 8.233L0 43.5l15.953 2.928h-.002a30.688 30.688 0 0115.892 8.233 30.941 30.941 0 018.646 15.726L44 87l3.511-16.613z"></path>
		</motion.svg>
	)
}

const HoverSparkle = () => {
	const [sparkles, setSparkles] = React.useState([])

	useRandomInterval(
		() => {
			const now = Date.now()
			const newSparkle = generateSparkle()

			//start as an empty array
			const nextSparkles = sparkles.filter((value) => {
				const delta = now - value.createdAt
				return delta < 1100
			})
			nextSparkles.push(newSparkle)

			setSparkles(nextSparkles)
		},
		100,
		500
	)


	return (
		<div className="sparkle-wrap">
			<span style={{ position: 'relative', display: 'inline-block' }}>
				{sparkles.map((sparkle) => {
					return (
						<SparkleInstance
							color={sparkle.color}
							size={sparkle.size}
							style={sparkle.style}
							key={sparkle.id}
						/>
					)
				})}
				<span style={{ position: 'relative', zIndex: '1' }}>
					<h1>123</h1>
				</span>
			</span>
		</div>
	)
}

export default HoverSparkle
