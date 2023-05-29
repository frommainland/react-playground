import './ScrollVelocity.scss'
import { motion } from 'framer-motion'
import useWindowSize from '../../helper/hooks/useWindowSize'

// working but without infinite scrolling

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
]

const loopTimes = Array.from(Array(4).keys())

const blurLayerNum = Array.from(Array(8).keys())

const ScrollVelocity = () => {
	const size = useWindowSize()

	return (
		<div id="scroll-velocity-wrap">
			<div className="content-wrap">
				<div className="left">Good design</div>
				<div className="right">
					<div className="container">
						{loopTimes.map(() => {
							return designPrinciples.map((value, index) => {
								return (
									<motion.p
										className="scrolling"
										key={index}
										initial={{ y: 0 }}
										animate={{ y: -size.height }}
										transition={{
											repeat: Infinity,
											duration: 30,
											ease: 'linear',
										}}
									>
										{value}
									</motion.p>
								)
							})
						})}
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
								webkitMask: `linear-gradient(
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
								webkitMask: `linear-gradient(
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
