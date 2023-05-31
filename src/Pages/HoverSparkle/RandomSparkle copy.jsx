import React, { useLayoutEffect, useState } from 'react'
import './RandomSparkle.scss'
import { motion } from 'framer-motion'
import { useRef } from 'react'

// original one

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

function Sparkle({ x, y, size }) {
	return (
		<motion.svg
			width={size}
			height={size}
			viewBox="0 0 88 87"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				position: 'absolute',
				left: x,
				top: y,
			}}
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
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

	useInterval(
		() => {
			const newPos = {
				x: Math.floor(Math.random() * size.width),
				y: Math.floor(Math.random() * size.height),
			}
			const newSparkleSize = Math.random() * 80 + 20
			setPos([...pos, newPos])
			setSparkleSize([...sparkleSize, newSparkleSize])
		},
		isHover ? 1000 : null
	)

	const [fruits, setFruits] = useState(['apple', 'orange', 'peach', 'grape'])

	const removeElement = (value) => {
		// const newFruits = fruits.filter((_, i) => i !== index)
		const newFruits = fruits.filter((v) => v !== value)
		setFruits(newFruits)
		// if (index == 2) {
		// 	setFruits([2])
		// }
		// console.log(index)
	}

	return (
		<div className="sparkle-wrap">
			<motion.div
				ref={ref}
				className="box"
				onHoverStart={() => setIsHover(true)}
				onHoverEnd={() => {
					setIsHover(false)
					setPos([{ x: null, y: null }])
				}}
			>
				hover me
				{isHover &&
					pos.map((v, i) => {
						return (
							<Sparkle
								key={i}
								x={v.x}
								y={v.y}
								size={sparkleSize[i]}
							/>
						)
					})}
				{fruits.map((value, index) => {
					return (
						<motion.h1
							key={index}
							initial={{ scale: 0 }}
							animate={{ scale: [1, .1] }}
							transition={{ duration: 0.3, delay: 1 + index }}
							onAnimationComplete={() => removeElement(value)}
						>
							{value}
						</motion.h1>
					)
				})}
			</motion.div>
		</div>
	)
}

export default RandomSparkle
