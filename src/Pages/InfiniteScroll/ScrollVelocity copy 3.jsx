import './ScrollVelocity.scss'
import {
	motion,
	useScroll,
	useSpring,
	useTransform,
	useMotionValue,
	useVelocity,
} from 'framer-motion'
import useWindowSize from '../../helper/hooks/useWindowSize'
import { useRef } from 'react'
import { useState, useCallback, useLayoutEffect, useEffect } from 'react'

//test scrollY detection and velocity. it is jumpy and not smooth during scroll

const designPrinciples = [
	'is innovative',
	'makes a product useful',
	'is aesthetic',
	'makes a product understandable',
	'is unobtrusive',
	'is honest',
	'is long-lasting',
	'is thorough down to the last detail',
	'is environmentally friendly',
	'is as little design as possible',
	'scroll to change speed and direction',
	'is innovative',
	'makes a product useful',
	'is aesthetic',
	'makes a product understandable',
	'is unobtrusive',
	'is honest',
	'is long-lasting',
	'is thorough down to the last detail',
	'is environmentally friendly',
	'is as little design as possible',
	'scroll to change speed and direction',
]

const loopTimes = Array.from(Array(4).keys())

const blurLayerNum = Array.from(Array(8).keys())

const data = {
	ease: 0.02,
	current: 0,
	previous: 0,
	rounded: 0,
}

function InfiniteScrollLoop({ surroundingBackup = 2, children }) {
	const size = useWindowSize()
	const contentRef = useRef(null)
	const scrollRef = useRef(null)
	const [height, setHeight] = useState(0)

	const backupHeight = height * surroundingBackup

	///

	useEffect(() => {
		requestAnimationFrame(() => skewScrolling())
	}, [])

	const skewScrolling = () => {
		//Set Current to the scroll position amount
		data.current = scrollRef.current.scrollTop
		// Set Previous to the scroll previous position
		data.previous += (data.current - data.previous) * data.ease
		// Set rounded to
		data.rounded = Math.round(data.previous * 100) / 100

		// Difference between
		const difference = data.current - data.rounded
		const acceleration = difference / size.width
		const velocity = +acceleration
		const skew = velocity * 25

		//Assign skew and smooth scrolling to the scroll container
		scrollRef.current.style.transform = `skewY(${skew}deg)`

		//loop vai raf
		requestAnimationFrame(() => skewScrolling())
	}

	///

	const handleScroll = useCallback(() => {
		if (scrollRef.current) {
			const scroll = scrollRef.current.scrollTop
			if (scroll < backupHeight || scroll >= backupHeight + height) {
				scrollRef.current.scrollTop = backupHeight + (scroll % height)
			}
		}

		// data.current = scrollRef.current.scrollTop
		// data.previous += (data.current - data.previous) * data.ease
		// data.rounded = Math.round(data.previous * 100) / 100
		// const difference = data.current - data.rounded
		// const acceleration = difference / size.width
		// const velocity = +acceleration
		// const skew = velocity * 7.5
		// scrollRef.current.style.transform = `skewY(${skew}deg)`
		// skewScrolling()
	}, [height])

	useLayoutEffect(() => {
		if (contentRef.current) {
			// setHeight(contentRef.current.offsetHeight)
			setHeight(size.height)
			scrollRef.current.scrollTop = backupHeight
		}
	})

	return (
		<div className="infinite-scroll-loop-outer">
			<div
				className="infinite-scroll-loop-inner"
				ref={scrollRef}
				style={{
					height,
				}}
				onScroll={handleScroll}
			>
				{Array(surroundingBackup)
					.fill()
					.map((_, index) => (
						<div key={index}>{children}</div>
					))}
				<div ref={contentRef}>{children}</div>
				{Array(surroundingBackup)
					.fill()
					.map((_, index) => (
						<div key={index}>{children}</div>
					))}
			</div>
		</div>
	)
}

const ScrollVelocity = () => {
	const size = useWindowSize()

	return (
		<div id="scroll-velocity-wrap">
			<div className="content-wrap">
				<div className="left">Good design</div>
				<div className="right">
					<div className="container">
						<InfiniteScrollLoop>
							{designPrinciples.map((value, index) => {
								return (
									<motion.p
										className="scrolling"
										key={index}
										// initial={{ y: 0 }}
										// animate={{ y: -size.height }}
										transition={{
											repeat: Infinity,
											duration: 30,
											ease: 'linear',
										}}
									>
										{value}
									</motion.p>
								)
							})}
						</InfiniteScrollLoop>
					</div>
				</div>
			</div>
			<div className="gradient-blur gradient-blur-top">
				{blurLayerNum.map((value, index) => {
					return (
						<div
							key={index}
							style={{
								zIndex: value,
								backdropFilter: `blur(${Math.pow(
									1.616,
									value - 1
								)}px)`,
								WebkitMask: `linear-gradient(
						to bottom,
						rgba(0, 0, 0, 0) ${value * 12.5}%,
						rgba(0, 0, 0, 1) ${value * 12.5 + 12.5}%,
						rgba(0, 0, 0, 1) ${value * 12.5 + 25}%,
						rgba(0, 0, 0, 0) ${value * 37.5}%
					)`,
							}}
						></div>
					)
				})}
			</div>
			<div className="gradient-blur gradient-blur-bottom">
				{blurLayerNum.map((value, index) => {
					return (
						<div
							key={index}
							style={{
								zIndex: value,
								backdropFilter: `blur(${Math.pow(
									1.616,
									value - 1
								)}px)`,
								WebkitMask: `linear-gradient(
						to bottom,
						rgba(0, 0, 0, 0) ${value * 12.5}%,
						rgba(0, 0, 0, 1) ${value * 12.5 + 12.5}%,
						rgba(0, 0, 0, 1) ${value * 12.5 + 25}%,
						rgba(0, 0, 0, 0) ${value * 37.5}%
					)`,
							}}
						></div>
					)
				})}
			</div>
			<div className="bottom">
				<a href="https://www.vitsoe.com/us/about/good-design">
					10 Principles of Good Design ↗
				</a>
				<a href="https://www.google.com/search?q=Dieter+Rams&sxsrf=APwXEdeHgE9ITIX7SxkxyOLeBtXSmriNcA:1684897082692&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjG8eLg-oz_AhWyOH0KHeSSDkAQ_AUoAXoECAEQAw&biw=1379&bih=1333&dpr=1">
					Dieter Rams ↗
				</a>
			</div>
		</div>
	)
}

export default ScrollVelocity
