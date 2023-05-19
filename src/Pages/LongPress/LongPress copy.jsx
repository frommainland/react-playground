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

// three dots radius
const threeDotsR = 180 / 2

const LongPress = () => {
	// get image div distances to the left and top of the viewport
	const [ref, bounds] = useMeasure()

	const [enabled, setEnabled] = useState(true)
	const [longpress, setLongPress] = useState(false)
	const [touchCircle, setTouchCircle] = useState({ x: null, y: null })
	const [threeDots, setThreeDots] = useState([0, 45, 90])
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
				{
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
									animate={{
										x:
											touchCircle.x -
												bounds.x -
												30 +
												threeDotsR <=
											bounds.width / 2
												? Math.cos(
														degrees_to_radians(
															map(
																touchCircle.y -
																	340,
																0,
																600,
																270,
																360
															) + value
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
																	340,
																0,
																600,
																180,
																270
															) - value
														)
												  ) *
														threeDotsR +
												  (touchCircle.x -
														bounds.x -
														30),
										y:
											touchCircle.x -
												bounds.x -
												30 +
												threeDotsR <=
											bounds.width / 2
												? Math.sin(
														degrees_to_radians(
															map(
																touchCircle.y -
																	340,
																0,
																600,
																270,
																360
															) + value
														)
												  ) *
														threeDotsR *
														-1 +
												  (touchCircle.y -
														bounds.y -
														30)
												: Math.sin(
														degrees_to_radians(
															map(
																touchCircle.y -
																	340,
																0,
																600,
																180,
																270
															) - value
														)
												  ) *
														threeDotsR *
														1 +
												  (touchCircle.y -
														bounds.y -
														30),
									}}
									transition={{
										type: 'spring',
										bounce: 0.4,
									}}
									whileHover={{
										x:
											Math.cos(
												degrees_to_radians(
													map(
														touchCircle.y - 340,
														0,
														600,
														270,
														360
													) + value
												)
											) *
												(threeDotsR + 20) +
											(touchCircle.x - bounds.x - 30),

										y:
											Math.sin(
												degrees_to_radians(
													map(
														touchCircle.y - 340,
														0,
														600,
														270,
														360
													) + value
												)
											) *
												(threeDotsR + 20) *
												-1 +
											(touchCircle.y - bounds.y - 30),
										backgroundColor: '#E60022',
                                        scale:1.1,
										transition: {
											type: 'tween',
										},
									}}
								></motion.div>
							)
						})}
					</div>
				}
			</motion.div>
			<p>
				Photo by{' '}
				<a href="https://unsplash.com/@erniemal?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
					Ernest Malimon
				</a>{' '}
				on{' '}
				<a href="https://unsplash.com/photos/F-VfOii6noA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
					Unsplash
				</a>
			</p>
			<p>long press on image</p>
		</div>
	)
}

export default LongPress

//https://codesandbox.io/s/uselongpress-v3-y5m335?fontsize=14&hidenavigation=1&theme=dark&file=/src/App.tsx
//https://github.com/minwork/react/blob/main/packages/use-long-press/README.md
