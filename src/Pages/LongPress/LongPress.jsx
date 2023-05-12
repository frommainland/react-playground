import React from 'react'
import './LongPress.scss'
import { motion } from 'framer-motion'
import { smooth } from '../../helper/easing'
import { useLongPress } from 'react-use'

const LongPress = () => {
	const onLongPress = () => {
		console.log('calls callback after long pressing 300ms')
	}

	const defaultOptions = {
		isPreventDefault: true,
		delay: 300,
	}
	const longPressEvent = useLongPress(onLongPress, defaultOptions)

	return (
		<div className="long-pres-wrap">
			<motion.div
				className="image"
				whileHover={{
					scale: 0.99,
					transition: {
						ease: smooth,
					},
				}}
				{...longPressEvent}
			></motion.div>
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
