import React, { useLayoutEffect, useState } from 'react'
import './RandomSparkle.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'

// test for onanimationcomplte => remove it from the dom 
// not working it seams i am manipulating the array (add/remove) it at the same time.

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

function Sparkle({ x, y, sparkleSize, removeEle }) {
	return (
		<motion.svg
			width={sparkleSize}
			height={sparkleSize}
			viewBox="0 0 88 87"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				position: 'absolute',
				left: x,
				top: y,
			}}
			initial={{ scale: 0 }}
			animate={{ scale: 1, rotate: 90 }}
			exit={{ scale: 0, rotate: 180 }}
			transition={{ duration: 2 }}
			onAnimationComplete={() => {
				removeEle(x)
			}}
		>
			<path
				d="M47.51 70.387a30.94 30.94 0 0 1 8.647-15.726 30.687 30.687 0 0 1 15.891-8.233L88 43.5l-15.953-2.928h.002a30.688 30.688 0 0 1-15.892-8.233 30.94 30.94 0 0 1-8.646-15.726L44 0l-3.51 16.613a30.942 30.942 0 0 1-8.647 15.726 30.687 30.687 0 0 1-15.891 8.233L0 43.5l15.953 2.928h-.002a30.688 30.688 0 0 1 15.892 8.233 30.941 30.941 0 0 1 8.646 15.726L44 87l3.511-16.613Z"
				fill="#C34C9C"
			/>
		</motion.svg>
	)
}

const RandomSparkle = () => {
	const ref = useRef(null)
	const [size, setSize] = useState({ width: 0, height: 0 })
	const [pos, setPos] = useState([])
	const [sparkleSize, setSparkleSize] = useState([])

	const [isHover, setIsHover] = useState(false)

	const removeEle = (value) => {
		const newPos = pos.filter((v, i) => {
			value !== v.x
		})
		setPos(newPos)
	}

	useLayoutEffect(() => {
		if (ref.current) {
			const width = ref.current.offsetWidth
			const height = ref.current.offsetHeight
			setSize({
				width,
				height,
			})
		}
	}, [ref])

	useRandomInterval(
		() => {
			const newPos = {
				x: Math.floor(Math.random() * size.width),
				y: Math.floor(Math.random() * size.height),
			}
			const newSparkleSize = Math.random() * 80 + 20
			setPos([...pos, newPos])
			setSparkleSize([...sparkleSize, newSparkleSize])
		},
		isHover ? 100 : null,
		isHover ? 450 : null
	)

	return (
		<div className="sparkle-wrap">
			<motion.div
				ref={ref}
				className="box"
				onHoverStart={() => setIsHover(true)}
				onHoverEnd={() => {
					setIsHover(false)
					// setPos([{ x: null, y: null }])
				}}
			>
				hover me
				{pos.map((v, i) => {
					return (
						<Sparkle
							key={v.x}
							x={v.x}
							y={v.y}
							sparkleSize={sparkleSize[i]}
							removeEle={removeEle}
						/>
					)
				})}
			</motion.div>
		</div>
	)
}

export default RandomSparkle
