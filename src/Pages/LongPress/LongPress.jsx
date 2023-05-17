import React from 'react'
import './LongPress.scss'
import { motion } from 'framer-motion'
import { smooth } from '../../helper/easing'
import { useLongPress } from 'use-long-press'
import { useState, useCallback } from 'react'
import useMeasure from 'react-use-measure'

const LongPress = () => {
	const [enabled, setEnabled] = useState(true)
	const [longpress, setLongPress] = useState(false)
	const [touchCircle, setTouchCircle] = useState({ x: null, y: null })
	const callback = useCallback((event) => {
		// alert('Long pressed!')
		setTouchCircle({ x: event.clientX, y: event.clientY })
		setLongPress(true)
		console.log(touchCircle)
	}, [])

	const bind = useLongPress(enabled ? callback : null, {
		onStart: (event) => console.log('Press started'),
		onFinish: (event) => setLongPress(false),
		onCancel: (event) => console.log('Press cancelled'),
		// onMove: (event) => console.log(event.clientX, event.clientY),
		filterEvents: (event) => true, // All events can potentially trigger long press (same as 'undefined')
		threshold: 500, // In milliseconds
		captureEvent: true, // Event won't get cleared after React finish processing it
		cancelOnMovement: 25, // Square side size (in pixels) inside which movement won't cancel long press
		cancelOutsideElement: true, // Cancel long press when moved mouse / pointer outside element while pressing
		detect: 'pointer', // Default option
	})

	const [ref, bounds] = useMeasure()

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
					</div>
				)}
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
