import './App.scss'
import Sidebar from './component/Sidebar'
import Playground from './component/Playground'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import EmojiOnMouse from './Pages/EmojiOnMouse'
import LongPress from './Pages/longPress'

function App() {
	return (
		<>
			{/* <Sidebar />
			<Playground /> */}
			<Routes>
				<Route path="/" element={<Sidebar />}>
					<Route index element={<EmojiOnMouse />} />
					<Route path="longPress" element={<LongPress />} />
					<Route path="emojiOnMouse" element={<EmojiOnMouse />} />

					{/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
					{/* <Route path="*" element={<NoMatch />} /> */}
				</Route>
			</Routes>
		</>
	)
}

export default App
