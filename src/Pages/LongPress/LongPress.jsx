import React from 'react'
import './LongPress.scss'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { smooth } from '../../helper/easing'
import { useLongPress } from 'use-long-press'
import { useState, useCallback } from 'react'
import useMeasure from 'react-use-measure'

// linear interpolation
const map = (value, x1, y1, x2, y2) =>
	((value - x1) * (y2 - x2)) / (y1 - x1) + x2

function degrees_to_radians(degrees) {
	const pi = Math.PI
	return degrees * (pi / 180)
}

// svg paths
const pinSvg =
	'M18 13.5c0-2.22-1.21-4.15-3-5.19V2.45A2.5 2.5 0 0 0 17 0H7a2.5 2.5 0 0 0 2 2.45v5.86c-1.79 1.04-3 2.97-3 5.19h5v8.46L12 24l1-2.04V13.5h5Z'

const hideSvg =
	'M11.969 17a4.982 4.982 0 0 1-2.047-.447l6.6-6.6c.281.626.447 1.316.447 2.047a5 5 0 0 1-5 5Zm-5-5a5 5 0 0 1 5-5c.748 0 1.45.175 2.087.47l-6.617 6.617A4.944 4.944 0 0 1 6.969 12Zm13.104-5.598 2.415-2.415a1.75 1.75 0 1 0-2.475-2.474l-3.014 3.013A12.646 12.646 0 0 0 12 3.5C6.455 3.5 1.751 7.051 0 12a12.798 12.798 0 0 0 3.927 5.598l-2.414 2.415A1.748 1.748 0 0 0 2.75 23c.448 0 .896-.171 1.238-.513l3.013-3.013c1.58.678 3.28 1.027 4.999 1.026 5.545 0 10.249-3.551 12-8.5a12.782 12.782 0 0 0-3.927-5.598Z'

const shareSvg =
	'M21 14c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2s2 .9 2 2v4h14v-4c0-1.1.9-2 2-2ZM8.82 8.84c-.78.78-2.05.79-2.83 0-.78-.78-.79-2.04-.01-2.82L11.99 0l6.02 6.01c.78.78.79 2.05.01 2.83-.78.78-2.05.79-2.83 0l-1.2-1.19v6.18a2 2 0 0 1-4 0V7.66L8.82 8.84Z'

// three dots radius
const threeDotsR = 180 / 2
const threeDotsHoverR = threeDotsR + 10

// hover texts
const hoverText = ['发送', '隐藏', '收藏']

const LongPress = () => {
	// get image div distances to the left and top of the viewport
	const [ref, bounds] = useMeasure()

	// hover text states
	const [hoverDotIndex, setHoverDotIndex] = useState(null)
	const [showHoverText, setShowHoverText] = useState(false)

	const [enabled, setEnabled] = useState(true)
	const [longpress, setLongPress] = useState(false)
	const [touchCircle, setTouchCircle] = useState({ x: null, y: null })
	// const [threeDots, setThreeDots] = useState([0, 45, 90])
	const [threeDots, setThreeDots] = useState([
		{ angle: 0, path: shareSvg },
		{ angle: 45, path: hideSvg },
		{ angle: 90, path: pinSvg },
	])
	const callback = useCallback((event) => {
		// alert('Long pressed!')
		setTouchCircle({
			x: event.clientX,
			y: event.clientY,
		})
		setLongPress(true)
	}, [])

	const bind = useLongPress(enabled ? callback : null, {
		// onStart: (event) => console.log('Press started'),
		onFinish: (event) => setLongPress(false),
		// onCancel: (event) => console.log('Press cancelled'),
		// onMove: (event) => console.log(event.clientX, event.clientY),
		filterEvents: (event) => true, // All events can potentially trigger long press (same as 'undefined')
		threshold: 500, // In milliseconds
		captureEvent: true, // Event won't get cleared after React finish processing it
		cancelOnMovement: 600, // Square side size (in pixels) inside which movement won't cancel long press
		cancelOutsideElement: true, // Cancel long press when moved mouse / pointer outside element while pressing
		detect: 'pointer', // Default option
	})

	return (
		<div className="long-pres-wrap">
			<p className="instruction">long press on the image</p>
			<motion.div
				className="image"
				ref={ref}
				whileHover={{
					scale: 0.99,
					transition: {
						ease: smooth,
					},
				}}
				{...bind()}
			>
				{longpress && (
					<div className="long-press-mask">
						<div
							className="hallow-circle"
							// circle radius is 30px
							style={{
								left: touchCircle.x - bounds.x - 30,
								top: touchCircle.y - bounds.y - 30,
							}}
						></div>
						{threeDots.map((value, index) => {
							return (
								<motion.div
									key={index}
									className="three-dots"
									style={{ backgroundColor: '#ffffff' }}
									initial={{
										x: touchCircle.x - bounds.x - 30,
										y: touchCircle.y - bounds.y - 30,
									}}
									onMouseEnter={() => {
										setShowHoverText(true)
										setHoverDotIndex(index)
									}}
									onMouseLeave={() => {
										setShowHoverText(false)
										setHoverDotIndex(null)
									}}
									animate={{
										x:
											touchCircle.x - bounds.x <=
											bounds.width / 3
												? Math.cos(
														degrees_to_radians(
															map(
																touchCircle.y -
																	bounds.y,
																0,
																600,
																270,
																360
															) + value.angle
														)
												  ) *
														threeDotsR +
												  (touchCircle.x -
														bounds.x -
														30)
												: touchCircle.x - bounds.x <=
														(bounds.width / 3) *
															2 &&
												  touchCircle.x - bounds.x >
														bounds.width / 3
												? Math.cos(
														degrees_to_radians(
															315 - value.angle
														)
												  ) *
														threeDotsR +
												  (touchCircle.x -
														bounds.x -
														30)
												: Math.cos(
														degrees_to_radians(
															map(
																touchCircle.y -
																	bounds.y,
																0,
																600,
																180,
																270
															) - value.angle
														)
												  ) *
														threeDotsR +
												  (touchCircle.x -
														bounds.x -
														30),
										y:
											touchCircle.x - bounds.x <=
											bounds.width / 3
												? Math.sin(
														degrees_to_radians(
															map(
																touchCircle.y -
																	bounds.y,
																0,
																600,
																270,
																360
															) + value.angle
														)
												  ) *
														threeDotsR *
														-1 +
												  (touchCircle.y -
														bounds.y -
														30)
												: touchCircle.x - bounds.x <=
														(bounds.width / 3) *
															2 &&
												  touchCircle.x - bounds.x >
														bounds.width / 3
												? Math.sin(
														degrees_to_radians(
															315 - value.angle
														)
												  ) *
														threeDotsR *
														(touchCircle.y -
															bounds.y <
														bounds.height / 2
															? -1
															: 1) +
												  (touchCircle.y -
														bounds.y -
														30)
												: Math.sin(
														degrees_to_radians(
															map(
																touchCircle.y -
																	bounds.y,
																0,
																600,
																180,
																270
															) - value.angle
														)
												  ) *
														threeDotsR *
														1 +
												  (touchCircle.y -
														bounds.y -
														30),
									}}
									// transition={{
									// 	type: 'spring',
									// 	bounce: 0.4,
									// }}
									whileHover={{
										x:
											touchCircle.x - bounds.x <=
											bounds.width / 3
												? Math.cos(
														degrees_to_radians(
															map(
																touchCircle.y -
																	bounds.y,
																0,
																600,
																270,
																360
															) + value.angle
														)
												  ) *
														threeDotsHoverR +
												  (touchCircle.x -
														bounds.x -
														30)
												: touchCircle.x - bounds.x <=
														(bounds.width / 3) *
															2 &&
												  touchCircle.x - bounds.x >
														bounds.width / 3
												? Math.cos(
														degrees_to_radians(
															315 - value.angle
														)
												  ) *
														threeDotsHoverR +
												  (touchCircle.x -
														bounds.x -
														30)
												: Math.cos(
														degrees_to_radians(
															map(
																touchCircle.y -
																	bounds.y,
																0,
																600,
																180,
																270
															) - value.angle
														)
												  ) *
														threeDotsHoverR +
												  (touchCircle.x -
														bounds.x -
														30),
										y:
											touchCircle.x - bounds.x <=
											bounds.width / 3
												? Math.sin(
														degrees_to_radians(
															map(
																touchCircle.y -
																	bounds.y,
																0,
																600,
																270,
																360
															) + value.angle
														)
												  ) *
														threeDotsHoverR *
														-1 +
												  (touchCircle.y -
														bounds.y -
														30)
												: touchCircle.x - bounds.x <=
														(bounds.width / 3) *
															2 &&
												  touchCircle.x - bounds.x >
														bounds.width / 3
												? Math.sin(
														degrees_to_radians(
															315 - value.angle
														)
												  ) *
														threeDotsHoverR *
														(touchCircle.y -
															bounds.y <
														bounds.height / 2
															? -1
															: 1) +
												  (touchCircle.y -
														bounds.y -
														30)
												: Math.sin(
														degrees_to_radians(
															map(
																touchCircle.y -
																	bounds.y,
																0,
																600,
																180,
																270
															) - value.angle
														)
												  ) *
														threeDotsHoverR *
														1 +
												  (touchCircle.y -
														bounds.y -
														30),
										backgroundColor: '#E60022',
										scale: 1.05,
										transition: {
											type: 'tween',
										},
									}}
								>
									<motion.svg
										className="icons"
										width={24}
										height={24}
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<motion.path
											d={value.path}
											fill="#111111"
											animate={{
												fill:
													hoverDotIndex === index
														? '#FFFFFF'
														: '#111111',
											}}
										/>
									</motion.svg>
								</motion.div>
							)
						})}

						<motion.p
							className="hover-text"
							animate={{
								x:
									touchCircle.x - bounds.x <= bounds.width / 3
										? // 320 text distance to the left
										  320
										: touchCircle.x - bounds.x <=
												(bounds.width / 3) * 2 &&
										  touchCircle.x - bounds.x >
												bounds.width / 3
										? Math.cos(
												degrees_to_radians(315 - 90)
										  ) *
												threeDotsHoverR +
										  (touchCircle.x - bounds.x - 30) -
										  hoverDotIndex * 10
										: 0,
								y:
									touchCircle.x - bounds.x <= bounds.width / 3
										? Math.sin(
												degrees_to_radians(
													map(
														touchCircle.y -
															bounds.y,
														0,
														600,
														270,
														360
													) + 90
												)
										  ) *
												threeDotsHoverR *
												-1 +
										  (touchCircle.y - bounds.y - 30) -
										  hoverDotIndex * 10
										: touchCircle.x - bounds.x <=
												(bounds.width / 3) * 2 &&
										  touchCircle.x - bounds.x >
												bounds.width / 3
										? touchCircle.y - bounds.y <
										  bounds.height / 2
											? 540
											: 0
										: Math.sin(
												degrees_to_radians(
													map(
														touchCircle.y -
															bounds.y,
														0,
														600,
														180,
														270
													) - 0
												)
										  ) *
												threeDotsHoverR *
												1 +
										  (touchCircle.y - bounds.y - 30) +
										  hoverDotIndex * 10,
								transition: {
									ease: smooth,
								},
							}}
						>
							{hoverText[hoverDotIndex]}
						</motion.p>
					</div>
				)}
			</motion.div>
			<p className="caption">
				Photo by&nbsp;
				<a href="https://unsplash.com/@erniemal?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
					Ernest Malimon
				</a>
				&nbsp;on&nbsp;
				<a href="https://unsplash.com/photos/F-VfOii6noA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
					Unsplash
				</a>
			</p>
		</div>
	)
}

export default LongPress

//https://codesandbox.io/s/uselongpress-v3-y5m335?fontsize=14&hidenavigation=1&theme=dark&file=/src/App.tsx
//https://github.com/minwork/react/blob/main/packages/use-long-press/README.md
