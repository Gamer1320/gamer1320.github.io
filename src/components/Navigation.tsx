import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, LogOut, UserPlus, UserRoundPlus, User } from 'lucide-react'
import { FaDiscord } from 'react-icons/fa'

import logoUrl from '../assets/SVG/QatarAirwaysVirtualLogoLong.svg'

type User = {
	id: string
	username: string
	avatar: string
	topRole: string | null
	isAdmin: boolean
}
const Navigation: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [user, setUser] = useState<User | null>(null)
	const [showTerms, setShowTerms] = useState(false)
	const [agreed, setAgreed] = useState(false)
	const location = useLocation()
	const dropdownRef = useRef<HTMLDivElement>(null)

	// 1) Fetch user & their topRole in one shot
	useEffect(() => {
		fetch('/api/auth/me', { credentials: 'include' })
			.then(res => {
				if (!res.ok) throw new Error('Not logged in');
				return res.json();
			})
			.then(data => setUser(data))
			.catch(() => setUser(null));
	}, []);


	// 2) Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (
				dropdownOpen &&
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setDropdownOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [dropdownOpen])

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (
				isOpen &&
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [isOpen])

	const navItems = [
		{ name: 'Home', path: '/' },
		{ name: 'Destinations', path: '/destinations' },
		{ name: 'Fleet', path: '/fleet' },
		{name: 'Careers', path: '/careers'}
	]

	return (
		<>
			<nav className="bg-white shadow-lg sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 flex items-center justify-between h-[5.5rem]">
					{/* Logo */}
					<div className="flex-shrink-0">
						<Link to="/" className="flex items-center space-x-2">
							<img src={logoUrl} alt="Qatar Airways Virtual" className="h-[3.9rem] w-auto" />
						</Link>
					</div>

					{/* Desktop nav links */}
					<div className="hidden md:flex flex-1 justify-center items-center space-x-8">
						{navItems.map(item => (
							<Link
								key={item.name}
								to={item.path}
								className={`
									px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
									${location.pathname === item.path
										? 'text-white bg-primary'
										: 'text-gray-700 hover:text-primary hover:bg-gray-50'
									}
								`}
							>
								{item.name}
							</Link>
						))}
					</div>

					{/* Right side */}
					<div className="flex items-center space-x-4">
						{/* Desktop avatar/dropdown or login */}
						<div className="hidden md:flex items-center" ref={dropdownRef}>
							{user ? (
								<div className="relative">
									<button
										onClick={() => setDropdownOpen(o => !o)}
										className="flex items-center space-x-2 border border-primary px-1.5 py-1.5 rounded-full text-primary hover:bg-primary/10"
									>
										<img
											src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
											alt={user.username}
											className="h-8 w-8 rounded-full border-2 border-primary"
										/>
										<span className="font-medium">{user.username}</span>
										<ChevronDown
											className={`h-4 w-4 transition-transform duration-200 ease-in-out ${dropdownOpen ? 'rotate-180' : 'rotate-0'
												}`}
										/>
									</button>

									{dropdownOpen && (
										<div
											className="
												absolute right-0 mt-2 w-56 bg-white border-2 border-primary
												rounded-lg shadow-lg z-50 overflow-hidden animate-dropdown-in
											"
										>
											{/* Header */}
											<div className="flex items-center px-4 py-3 bg-primary/10">
												<img
													src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
													alt={user.username}
													className="h-10 w-10 rounded-full border-2 border-primary"
												/>
												<div className="ml-3">
													<p className="text-primary font-semibold">{user.username}</p>
													<p className="text-sm text-gray-600">
														{user.topRole === null ? 'Not In Server' : user.topRole}
													</p>
												</div>
											</div>
											{/*Admin link*/}
											{!user?.isAdmin && (
												<Link
													to="/admin"
													className="w-full flex items-center px-4 py-2 space-x-2 text-gray-700 hover:bg-primary/5"
													onClick={async () => {setDropdownOpen(false)}}
												><UserPlus className="h-5 w-5 text-primary" /><span>Admin Dashboard</span>
												</Link>
											)}
											{/* Logout */}
											<button
												onClick={async () => {
													await fetch('/api/auth/logout', {
														method: 'POST',
														credentials: 'include'
													})
													setUser(null)
													setDropdownOpen(false)
												}}
												className="w-full flex items-center px-4 py-2 space-x-2 text-gray-700 hover:bg-primary/5"
											>
												<LogOut className="h-5 w-5 text-primary" />
												<span>Logout</span>
											</button>
										</div>
									)}
								</div>
							) : (
								<button
									onClick={() => setShowTerms(true)}
									className="border border-primary px-3 py-1 rounded-full text-primary hover:bg-primary/10"
								>
									Login
								</button>
							)}
						</div>

						{/* Mobile hamburger */}
						<div className="md:hidden">
							<button
								onClick={() => setIsOpen(o => !o)}
								className="p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-50"
							>
								{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
							</button>
						</div>
					</div>
				</div>

				{/* Mobile drawer */}
				{isOpen && (
					<div className="md:hidden bg-white border-t"ref={dropdownRef}>
						<div className="px-2 pt-2 pb-3 space-y-1">
							{/* User header */}
							{user && (
								<div className="px-4 py-3 flex items-center space-x-3 border-b">
									<img
										src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
										alt={user.username}
										className="h-10 w-10 rounded-full border-2 border-primary"
									/>
									<div>
										<p className="text-base font-medium text-primary">{user.username}</p>
										<p className="text-sm text-gray-600">
											{user.topRole === null ? 'Not In Server' : user.topRole}
										</p>
									</div>
								</div>
							)}

							{navItems.map(item => (
								<Link
									key={item.name}
									to={item.path}
									onClick={() => setIsOpen(false)}
									className={`
										block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
										${location.pathname === item.path
											? 'text-white bg-primary'
											: 'text-gray-700 hover:text-primary hover:bg-gray-50'
										}
									`}
								>
									{item.name}
								</Link>
							))}

							{user?.isAdmin && (
								<Link
									to="/admin"
									className="border-t border-gray-200 pt-4 w-full flex items-center px-4 py-2 space-x-2 text-gray-700 hover:bg-primary/5"
									onClick={() => {
										setIsOpen(false)
									}}
								><UserRoundPlus className="h-5 w-5 text-primary" /><span>Admin Dashboard</span>
								</Link>
							)}
							{user ? (
								<button
									onClick={async () => {
										await fetch('/api/auth/logout', {
											method: 'POST',
											credentials: 'include'
										})
										setUser(null)
										setIsOpen(false)
									}}
									className="border-t border-gray-200 w-full flex items-center px-4 py-2 space-x-2 text-gray-700 hover:bg-primary/5"
								>
									<LogOut className="h-5 w-5 text-primary" />
									<span>Logout</span>
								</button>
							) : (
								<button
									onClick={() => {
										setShowTerms(true)
										setIsOpen(false)
									}}
									className="w-full text-left px-3 py-2 rounded-md text-base text-gray-700 hover:text-primary hover:bg-gray-50"
								>
									Login
								</button>
							)}
						</div>
					</div>
				)}
			</nav>

			{/* Terms‑of‑Use Modal */}
			{showTerms && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 max-w-sm w-full">
						<h2 className="text-xl font-semibold mb-4">Before you continue</h2>
						<p className="mb-4">
							Please review and accept our{' '}
							<Link to="/terms" className="underline text-primary" onClick={() => setShowTerms(false)}>
								Terms of Use
							</Link>{' '}
							and{' '}
							<Link to="/privacy" className="underline text-primary" onClick={() => setShowTerms(false)}>
								Privacy Policy
							</Link>.
						</p>
						<label className="flex items-center mb-4">
							<input
								type="checkbox"
								checked={agreed}
								onChange={() => setAgreed(a => !a)}
								className="mr-2"
							/>
							I agree to the Terms of Use & Privacy Policy
						</label>
						<div className="flex justify-end space-x-2">
							<button onClick={() => setShowTerms(false)} className="px-4 py-2">
								Cancel
							</button>
							<a
								href="/api/auth/discord"
								className={`px-4 py-2 rounded-md text-white bg-primary ${!agreed ? 'opacity-50 pointer-events-none' : ''}`}><FaDiscord className="inline-block mr-2 align-text-bottom" /> Continue with Discord</a>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Navigation
