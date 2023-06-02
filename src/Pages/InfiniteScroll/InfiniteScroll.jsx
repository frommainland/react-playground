import './InfiniteScroll.scss'
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
import useMeasure from 'react-use-measure'

//test for slowing move when hover, that is it

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
]

const loopTimes = Array.from(Array(2).keys())

const blurLayerNum = Array.from(Array(8).keys())

function InfiniteScrollLoop({ surroundingBackup = 1, children }) {
	const size = useWindowSize()
	const contentRef = useRef(null)
	const scrollRef = useRef(null)
	const [height, setHeight] = useState(0)

	const backupHeight = height * surroundingBackup

	///

	///

	const handleScroll = useCallback(() => {
		if (scrollRef.current) {
			const scroll = scrollRef.current.scrollTop
			if (scroll < backupHeight || scroll >= backupHeight + height) {
				scrollRef.current.scrollTop = backupHeight + (scroll % height)
			}
		}
	}, [height])

	useLayoutEffect(() => {
		if (contentRef.current) {
			setHeight(contentRef.current.offsetHeight)
			// setHeight(size.height)
			scrollRef.current.scrollTop = backupHeight - (size.height % height)
		}
	})

	return (
		<div className="infinite-scroll-loop-outer">
			<motion.div
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
						<motion.div
							key={`${index}a`}
							initial={{ y: 0 }}
							animate={{
								y: -height,
							}}
							transition={{
								repeat: Infinity,
								// duration: isHover ? 100 : 50,
								duration: 50,
								ease: 'linear',
							}}
						>
							{children}
						</motion.div>
					))}
				<motion.div
					ref={contentRef}
					initial={{ y: 0 }}
					animate={{
						y: -height,
					}}
					transition={{
						repeat: Infinity,
						// duration: isHover ? 100 : 50,
						duration: 50,
						ease: 'linear',
					}}
				>
					{children}
				</motion.div>
				{Array(surroundingBackup)
					.fill()
					.map((_, index) => (
						<motion.div
							key={`${index}b`}
							initial={{ y: 0 }}
							animate={{
								y: -height,
							}}
							transition={{
								repeat: Infinity,
								// duration: isHover ? 100 : 50,
								duration: 50,
								ease: 'linear',
							}}
						>
							{children}
						</motion.div>
					))}
			</motion.div>
		</div>
	)
}

const InfiniteScroll = () => {
	const size = useWindowSize()

	return (
		<div id="scroll-velocity-wrap">
			<div className="content-wrap">
				<div className="left">Good design</div>
				<div className="right">
					<motion.div className="container">
						<InfiniteScrollLoop>
							{designPrinciples.map((value, index) => {
								return (
									<motion.p
										// ref={ref}
										className="scrolling"
										key={index}
										// initial={{ y: 0 }}
										// animate={{
										// 	y: -size.height,
										// }}
										// transition={{
										// 	repeat: Infinity,
										// 	// duration: isHover ? 100 : 50,
										// 	duration: 60,
										// 	ease: 'linear',
										// }}
									>
										{value}
										<sup>
											{(index %
												(designPrinciples.length / 2)) +
												1}
										</sup>
									</motion.p>
								)
							})}
						</InfiniteScrollLoop>
					</motion.div>
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

export default InfiniteScroll
