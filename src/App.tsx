import React, { useEffect, useState } from 'react'
import {
	BrowserRouter,
	Routes,
	Route,
	Outlet,
	useNavigate,
} from 'react-router-dom' 

// Core UI
import Navigation from './components/Navigation'
import Footer from './components/Footer'

// Pages
import Home from './components/Home'
import Fleet from './components/Fleet'
import FlyWithUs from './components/FlyWithUs'
import TermsPage from './components/Terms'
import Privacy from './components/Privacy'
import Destinations from './components/destinations'
import AdminDashboard from './components/AdminDashboard'
import NotFound from './components/NotFound'
import ScrollToTop from './components/ScrollToTop'
import Careers from './components/careers'
import Shutdown from './components/Shutdown'

// —––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Layouts
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
function MainLayout() {
	return (
		<>
			<Navigation />
			<ScrollToTop />
			<Outlet />
			<Footer />
		</>
	)
}

function BareLayout() {
	return <Outlet />
}

// —––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Type for our “me” response
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
type Me = {
	id: string
	username: string
	avatar: string
	topRole: string | null
	isAdmin: boolean
}

// —––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// App
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
export default function App() {
	const [me, setMe] = useState<Me | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === 'true'

	useEffect(() => {
		fetch('/api/auth/me', { credentials: 'include' })
			.then(async res => {
				if (res.status === 401) {
					// Not logged in → no error, just anonymous.
					return null
				}
				if (!res.ok) {
					throw new Error(`Me fetch failed (${res.status})`)
				}
				return res.json() as Promise<Me>
			})
			.then(data => {
				if (data) {
					setMe(data)
					// only mark‑login if we got a valid “me”
					fetch('/api/auth/login', {
						method: 'POST',
						credentials: 'include',
					}).catch(console.error)
				}
				// otherwise: anonymous visitor, carry on
			})
			.catch(err => {
				console.error(err)
				setError(err.message)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [])

	//error
	if (loading) return <div className="fixed inset-0 flex items-center justify-center">Loading…</div>
	if (error) return <div className="p-8 text-red-600">Error: {error}</div>

	
	return (
		<BrowserRouter>
			<Routes>
  {/** Nav + footer routes */}
  <Route element={<MainLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/fleet" element={<Fleet />} />       {/* Uncomment this line */}
    <Route path="/fleet-admin" element={<Fleet />} />  {/* You can keep or remove this admin route */}
    <Route path="/fly-with-us" element={<FlyWithUs />} />
    <Route path="/terms" element={<TermsPage />} />
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/destinations" element={<Destinations />} />
    <Route path="/des-admin" element={<Destinations />} />
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/careers" element={<Careers />} />
  </Route>

				{/** Bare layout for 404 */}
				<Route element={<BareLayout />}>
					<Route path="/404" element={<NotFound />} />
				</Route>

				{/** catch‑all → 404 */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}
