import React, { useRef, useState } from 'react'
import './SmoothInOut.scss'
import styled from 'styled-components'
import { gsap } from 'gsap'
import { useEffect } from 'react'
import { random, range } from '../../helper/util'

import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function randomStartStateData() {
	return {
		x: random(0, 200),
		y: random(0, 100),
		rotate: random(-10, 10),
	}
}

const Mini = () => {
	const miniRef = useRef(null)

	const [startData] = useState(randomStartStateData())
	console.log(startData)

	useEffect(() => {
		const ele = miniRef.current

		let fromTween = ScrollTrigger.create({
			trigger: ele,
			start: 'top 95%',
			end: 'end 5%',
			// markers: true,
			onEnter: () =>
				gsap.fromTo(
					ele,
					{
						rotation: startData.rotate,
						y: startData.y,
						x: startData.x,
					},
					{
						rotation: 0,
						y: 0,
						x: startData.x + 100,
						scrollTrigger: {
							start: 'top 95%',
							end: '+=200',
							trigger: ele,
							scrub: 1,
						},
					}
				),
			onLeave: () =>
				gsap.fromTo(
					ele,
					{ x: startData.x + 100, rotation: 0, y: 0 },
					{
						x: startData.x,
						rotation: -startData.rotate,
						y: -startData.y,
						scrollTrigger: {
							start: 'center 5%',
							end: '+=200',
							trigger: ele,
							scrub: 1,
						},
					}
				),
		})

		return () => fromTween.revert()
	}, [])
	return (
		<div className="mini" ref={miniRef}>
			<div className="photo" />
		</div>
	)
}

const Wide = () => {
	const cardRef = useRef(null)

	const [startData] = useState(randomStartStateData())
	console.log(startData)

	useEffect(() => {
		const ele = cardRef.current

		let fromTween = ScrollTrigger.create({
			trigger: ele,
			start: 'top 95%',
			end: 'end 5%',
			// markers: true,
			onEnter: () =>
				gsap.fromTo(
					ele,
					{
						rotation: startData.rotate,
						y: startData.y,
						x: startData.x,
					},
					{
						rotation: 0,
						y: 0,
						x: startData.x + 100,
						scrollTrigger: {
							start: 'top 95%',
							end: '+=200',
							trigger: ele,
							scrub: 1,
						},
					}
				),
			onLeave: () =>
				gsap.fromTo(
					ele,
					{ x: startData.x + 100, rotation: 0, y: 0 },
					{
						x: startData.x,
						rotation: -startData.rotate,
						y: -startData.y,
						scrollTrigger: {
							start: 'center 5%',
							end: '+=200',
							trigger: ele,
							scrub: 1,
						},
					}
				),
		})

		return () => fromTween.revert()
	}, [])
	return (
		<div className="wide-photo-wrapper" ref={cardRef}>
			<div className="wide-photo" />
		</div>
	)
}
const Sx = () => {
	const sxRef = useRef(null)

	const [startData] = useState(randomStartStateData())
	console.log(startData)

	useEffect(() => {
		const ele = sxRef.current

		let fromTween = ScrollTrigger.create({
			trigger: ele,
			start: 'top 95%',
			end: 'end 5%',
			// markers: true,
			onEnter: () =>
				gsap.fromTo(
					ele,
					{
						rotation: startData.rotate,
						y: startData.y,
						x: startData.x,
					},
					{
						rotation: 0,
						y: 0,
						x: startData.x + 100,
						scrollTrigger: {
							start: 'top 95%',
							end: '+=200',
							trigger: ele,
							scrub: 1,
						},
					}
				),
			onLeave: () =>
				gsap.fromTo(
					ele,
					{ x: startData.x + 100, rotation: 0, y: 0 },
					{
						x: startData.x,
						rotation: -startData.rotate,
						y: -startData.y,
						scrollTrigger: {
							start: 'center 5%',
							end: '+=200',
							trigger: ele,
							scrub: 1,
						},
					}
				),
		})

		return () => fromTween.revert()
	}, [])
	return (
		<div className="sx-photo-wrapper" ref={sxRef}>
			<div className="sx-photo" />
		</div>
	)
}

const SmoothInOut = () => {
	return (
		<>
			<Red></Red>
			<Red></Red>
			<Mini />
			<Wide />
			<Sx />
			<Red></Red>
		</>
	)
}

const Red = styled.div`
	background-color: red;
	height: 100px;
	width: 100px;
	margin-bottom: 110vh;
`

export default SmoothInOut
