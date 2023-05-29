import React, { useLayoutEffect, useState } from 'react'
import './RandomSparkle.scss'
import { motion } from 'framer-motion'
import { useRef } from 'react'

const Sparkle = () => {
	return (
		<svg
			width="88"
			height="87"
			viewBox="0 0 88 87"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M47.51 70.387a30.94 30.94 0 0 1 8.647-15.726 30.687 30.687 0 0 1 15.891-8.233L88 43.5l-15.953-2.928h.002a30.688 30.688 0 0 1-15.892-8.233 30.94 30.94 0 0 1-8.646-15.726L44 0l-3.51 16.613a30.942 30.942 0 0 1-8.647 15.726 30.687 30.687 0 0 1-15.891 8.233L0 43.5l15.953 2.928h-.002a30.688 30.688 0 0 1 15.892 8.233 30.941 30.941 0 0 1 8.646 15.726L44 87l3.511-16.613Z"
				fill="#C34C9C"
			/>
		</svg>
	)
}

const RandomSparkle = () => {
	const ref = useRef(null)
	const [size, setSize] = useState({ width: 0, height: 0 })

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

	console.log(size)

	//     const ref = useRef(null)
	// const [size, setSize] = useState({ width: 0, height: 0 })

	// useLayoutEffect(() => {
	// 	if (ref.current) {
	// 		const width = ref.current.offsetWidth
	// 		const height = ref.current.offsetHeight
	// 		setSize({ width, height })
	// 	}
	// }, [ref])
	// console.log(size.width, size.height)

	// function gerenatePos() {}
	const [isHover, setIsHover] = useState(false)

	const [randomPos, setRandomPos] = useState(null)

	return (
		<div className="sparkle-wrap">
			<motion.div
				ref={ref}
				className="box"
				onHoverStart={() => setIsHover(true)}
				onHoverEnd={() => setIsHover(false)}
			>
				hover me
			</motion.div>
		</div>
	)
}

export default RandomSparkle
