import './App.scss'
import './font.scss'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import { smooth } from './helper/easing'
import EmojiOnMouse from './Pages/EmojiOnMouse/EmojiOnMouse'
import LongPress from './Pages/LongPress/LongPress'
import InfiniteScroll from './Pages/InfiniteScroll/InfiniteScroll'
import HoverSparkle from './Pages/HoverSparkle/HoverSparkle'
import ScrambleText from './Pages/ScrambleText/ScrambleText'
import SmoothInOut from './Pages/smoothInOut/SmoothInOut'
import NoMatch from './Pages/NoMatch'

import React, { useState, useEffect, useRef } from 'react'
import './component/Sidebar.scss'
import { LayoutGroup, easeIn, easeInOut, easeOut, motion } from 'framer-motion'
import { useMeasure } from 'react-use'

// imput of sidebar list - content and pathnames
const menuItems = [
	{
		listName: 'emoji on mouseover',
		pathName: 'EmojiOnMouse',
		element: <EmojiOnMouse />,
	},
	{
		listName: 'pinterest long press',
		pathName: 'LongPress',
		element: <LongPress />,
	},
	{
		listName: 'infinite scroll',
		pathName: 'InfiniteScroll',
		element: <InfiniteScroll />,
	},
	{
		listName: 'pick sparkle',
		pathName: 'PickSparkle',
		element: <HoverSparkle />,
	},
	{
		listName: 'scramble text',
		pathName: 'ScrambleText',
		element: <ScrambleText />,
	},
	{
		listName: 'smooth in & out smooth in & out smooth in & out',
		pathName: 'SmoothInOut',
		element: <SmoothInOut />,
	},
	{
		listName: 'smooth in & out smooth in & out smooth in & out1',
		pathName: 'SmoothInOut1',
		element: <SmoothInOut />,
	},
	{
		listName: 'smooth in & out smooth in & out smooth in & out2',
		pathName: 'SmoothInOut1',
		element: <SmoothInOut />,
	},
	{
		listName: 'smooth in & out smooth in & out smooth in & out3',
		pathName: 'SmoothInOut1',
		element: <SmoothInOut />,
	},
	{
		listName: 'smooth in & out smooth in & out smooth in & out4',
		pathName: 'SmoothInOut1',
		element: <SmoothInOut />,
	},
	{
		listName: 'smooth in & out smooth in & out smooth in & out5',
		pathName: 'SmoothInOut1',
		element: <SmoothInOut />,
	},
	{
		listName: 'smooth in & out smooth in & out smooth in & out6',
		pathName: 'SmoothInOut1',
		element: <SmoothInOut />,
	},
	{
		listName: 'smooth in & out smooth in & out smooth in & out7',
		pathName: 'SmoothInOut1',
		element: <SmoothInOut />,
	},
	{
		listName: 'smooth in & out smooth in & out smooth in & out8',
		pathName: 'SmoothInOut1',
		element: <SmoothInOut />,
	},
	{
		listName: 'smooth in & out smooth in & out smooth in & out9',
		pathName: 'SmoothInOut1',
		element: <SmoothInOut />,
	},
	{
		listName: 'smooth in & out smooth in & out smooth in & out10',
		pathName: 'SmoothInOut1',
		element: <SmoothInOut />,
	},
]

const MenuItem = ({ text, selected, onClick, pathName }) => {
	const [ref, { width, height }] = useMeasure()
	return (
		<Link to={`/${pathName}`}>
			<motion.li
				ref={ref}
				onClick={onClick}
				animate={{
					color: selected ? '#EFFFE8' : '#3D4838',
				}}
				whileHover={{ backgroundColor: '#CEDAC7' }}
			>
				{text}
				{selected && (
					<motion.div
						className="sidebar-underline"
						layoutId="sidebar-underline"
						style={{
							width: width + 10,
							height: height + 20,
							top: 0,
							left: 0,
						}}
					/>
				)}
			</motion.li>
		</Link>
	)
}

const NormalSideBar = () => {
	const [selected, setSelected] = useState(0)
	const [isScrolled, setIsScrolled] = useState(false)
	const sideBarRef = useRef()

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(sideBarRef.current.scrollTop > 0)
		}
		sideBarRef.current.addEventListener('scroll', handleScroll)
		return () => {
			sideBarRef.current.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const MenuIcon = () => {
		return (
			<div
				className="menu-icon-wrap"
				onClick={() => setIsMenuClicked(true)}
			>
				<svg
					className="menu-icon"
					width="18"
					height="12"
					viewBox="0 0 18 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M0 0H18V2H0V0ZM0 5H18V7H0V5ZM0 10H18V12H0V10Z"
						fill="black"
					/>
				</svg>
			</div>
		)
	}

	const [isMenuClicked, setIsMenuClicked] = useState(false)

	return (
		<>
			<MenuIcon />
			<div
				className={
					isMenuClicked
						? 'normal-sidebar-wrap open'
						: 'normal-sidebar-wrap'
				}
			>
				<nav className="sidebar" ref={sideBarRef}>
					<div
						className={
							isScrolled
								? 'scrolled site-logo-wrap'
								: 'site-logo-wrap'
						}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M2 13H4V15H6V13H8V15H10V13H12V15H14V10L17 7V1H19L23 3L19 5V7L22 10V22H11V19C11 18.4696 10.7893 17.9609 10.4142 17.5858C10.0391 17.2107 9.53043 17 9 17C8.46957 17 7.96086 17.2107 7.58579 17.5858C7.21071 17.9609 7 18.4696 7 19V22H2V13ZM18 10C17.45 10 17 10.54 17 11.2V13H19V11.2C19 10.54 18.55 10 18 10Z"
								fill="var(--green3)"
							/>
						</svg>
						<p className="logo-text">Playground</p>
					</div>
					<ol className="sidebar-list">
						{menuItems.map((value, index) => (
							<MenuItem
								text={value.listName}
								key={value.listName}
								selected={selected === index}
								onClick={() => {
									setSelected(index)
									setIsMenuClicked(false)
								}}
								pathName={value.pathName}
								layoutID="normal"
							/>
						))}
					</ol>
				</nav>
			</div>
		</>
	)
}

const XSSideBar = () => {
	const [isMenuClicked, setIsMenuClicked] = useState(false)
	const sideBarRef = useRef()
	const [isScrolled, setIsScrolled] = useState(false)
	const [selected, setSelected] = useState(0)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(sideBarRef.current.scrollTop > 0)
		}
		sideBarRef.current.addEventListener('scroll', handleScroll)
		return () => {
			sideBarRef.current.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const BackButton = () => {
		return (
			<div className="backbutton-wrap" onClick={() => setIsMenuClicked(false)}>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="back-icon"
				>
					<path
						d="M19 12H5"
						stroke="black"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M12 19L5 12L12 5"
						stroke="black"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
		)
	}

	return (
		<>
			<BackButton />
			<motion.div
				className={
					isMenuClicked ? 'xs-sidebar-wrap close' : 'xs-sidebar-wrap'
				}
			>
				<nav className="sidebar" ref={sideBarRef}>
					<div
						className={
							isScrolled
								? 'scrolled site-logo-wrap'
								: 'site-logo-wrap'
						}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M2 13H4V15H6V13H8V15H10V13H12V15H14V10L17 7V1H19L23 3L19 5V7L22 10V22H11V19C11 18.4696 10.7893 17.9609 10.4142 17.5858C10.0391 17.2107 9.53043 17 9 17C8.46957 17 7.96086 17.2107 7.58579 17.5858C7.21071 17.9609 7 18.4696 7 19V22H2V13ZM18 10C17.45 10 17 10.54 17 11.2V13H19V11.2C19 10.54 18.55 10 18 10Z"
								fill="var(--green3)"
							/>
						</svg>
						<p className="logo-text">Playground</p>
					</div>
					<ol className="sidebar-list">
						{menuItems.map((value, index) => (
							<MenuItem
								text={value.listName}
								key={`${value.listName}xs`}
								selected={selected === index}
								onClick={() => {
									setSelected(index)
									setIsMenuClicked(true)
								}}
								pathName={value.pathName}
							/>
						))}
					</ol>
				</nav>
			</motion.div>
		</>
	)
}

const Layout = () => {
	return (
		<>
			<NormalSideBar />
			<XSSideBar />
			<div className="playground">
				<Outlet />
			</div>
		</>
	)
}

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<EmojiOnMouse />} />
					{menuItems.map((value, index) => {
						return (
							<Route
								path={value.pathName}
								element={
									value.element ? value.element : <NoMatch />
								}
								key={index}
							/>
						)
					})}
					<Route path="*" element={<NoMatch />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
