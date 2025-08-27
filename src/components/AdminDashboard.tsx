// src/components/AdminDashboard.tsx
import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import {
	ArrowUp,
	ArrowDown,
	Clock,
	Trash2,
	Edit2,
} from 'lucide-react'

/** ── Types ───────────────────────────────────────────── */
type Me = {
	id: string
	username: string
	avatar: string
	topRole: string | null
	isAdmin: boolean
}

type LoggedUser = {
	id: string
	username: string
	first_seen: string
	last_seen: string
	top_role: string | null
	is_admin: boolean
	ip: string
}

type Position = {
	id: number
	title: string
	subtitle: string
	description: string
	createdby: string
	created_at: string
	updated_at: string
}

/** ── Component ─────────────────────────────────────── */
export default function AdminDashboard() {
	const nav = useNavigate()

	/** Auth & user‑log state */
	const [me, setMe] = useState<Me | null>(null)
	const [loading, setLoading] = useState(true)
	const [invalid, setInvalid] = useState(false)
	const [meErr, setMeErr] = useState<string | null>(null)

	const [users, setUsers] = useState<LoggedUser[] | null>(null)
	const [usersErr, setUsersErr] = useState<string | null>(null)

	/** Filter & sort for User Logs */
	const [filter, setFilter] = useState('')
	const visibleUsers = useMemo(() => {
		if (!users) return null
		return users.filter(u =>
			u.id.includes(filter) ||
			u.username.toLowerCase().includes(filter.toLowerCase())
		)
	}, [users, filter])

	const [sortOrder, setSortOrder] = useState<'default' | 'desc' | 'asc'>('default')
	const toggleSort = () => {
		setSortOrder(o => o === 'default' ? 'desc' : o === 'desc' ? 'asc' : 'default')
	}
	const displayedUsers = useMemo(() => {
		if (!visibleUsers) return null
		if (sortOrder === 'default') return visibleUsers
		return [...visibleUsers].sort((a, b) => {
			const da = new Date(a.last_seen).getTime()
			const db = new Date(b.last_seen).getTime()
			return sortOrder === 'desc' ? db - da : da - db
		})
	}, [visibleUsers, sortOrder])

	/** Tabs */
	const [tab, setTab] = useState<'logs' | 'create' | 'manage'>('logs')

	/** Positions state & form */
	const [positions, setPositions] = useState<Position[]>([])
	const [posErr, setPosErr] = useState<string | null>(null)

	const [formTitle, setFormTitle] = useState('')
	const [formSubtitle, setFormSubtitle] = useState('')
	const [formDesc, setFormDesc] = useState('')
	const [editId, setEditId] = useState<number | null>(null)

	const canSave = formTitle.trim() && formDesc.trim()

	/** ── Effects ───────────────────────────────────────── */
	// 1) load “me”
	useEffect(() => {
		fetch('/api/auth/me', { credentials: 'include' })
			.then(res => {
				if (res.status === 401) {
					window.location.assign('/api/auth/discord')
					throw new Error('Redirecting to login…')
				}
				if (!res.ok) {
					throw new Error(`Me fetch failed (${res.status})`)
				}
				return res.json() as Promise<Me>
			})
			.then(data => {
				if (!data.isAdmin) {
					setMe(data)
				} else {
					setMe(data)
				}
			})
			.catch(err => {
				console.error(err)
				setMeErr(err.message)
			})
			.finally(() => setLoading(false))
	}, [nav])

	// 2) load users once me is valid
	useEffect(() => {
		if (!me) return
		fetch('/api/auth/users', { credentials: 'include' })
			.then(res => {
				if (res.status === 403) throw new Error('Forbidden')
				if (!res.ok) throw new Error(`Users fetch failed (${res.status})`)
				return res.json() as Promise<LoggedUser[]>
			})
			.then(setUsers)
			.catch(err => {
				console.error(err)
				setUsersErr(
					err.message === 'Forbidden'
						? 'Invalid credentials, access denied. This incident has been logged.'
						: err.message
				)
				//setTimeout(() => nav('/404', { replace: true }), 500)
			})
	}, [me, nav])

	// 3) load positions
	useEffect(() => {
		fetch('/api/admin/positions', { credentials: 'include' })
			.then(res => {
				if (!res.ok) throw new Error(`Positions fetch failed (${res.status})`)
				return res.json() as Promise<Position[]>
			})
			.then(setPositions)
			.catch(err => {
				console.error(err)
				setPosErr(err.message)
			})
	}, [])
	/** ── Handlers ─────────────────────────────────────── */
	const resetForm = () => {
		setFormTitle('')
		setFormSubtitle('')
		setFormDesc('')
		setEditId(null)
	}

	const handleSavePosition = async () => {
		if (!canSave) return
		try {
			const url = editId
				? `/api/admin/positions/id?id=${editId}`
				: '/api/admin/positions'
			const method = editId ? 'PUT' : 'POST'
			await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({
					title: formTitle,
					subtitle: formSubtitle,
					description: formDesc,
					createdBy: me?.username || 'Unknown Admin',
				})
			})
			// reload
			const r = await fetch('/api/admin/positions', { credentials: 'include' })
			const list = await r.json()
			setPositions(list)
			resetForm()
			setTab('manage')
		} catch (err: any) {
			console.error(err)
			setPosErr(err.message)
		}
	}

	const handleEditClick = (p: Position) => {
		setFormTitle(p.title)
		setFormSubtitle(p.subtitle)
		setFormDesc(p.description)
		setEditId(p.id)
		setTab('create')
	}

	const handleDelete = async (id: number) => {
		if (!confirm('Delete this position?')) return
		await fetch(`/api/admin/positions/id?id=${id}`, {
			method: 'DELETE',
			credentials: 'include'
		})
		setPositions(pos => pos.filter(x => x.id !== id))
	}

	/** ── Render ───────────────────────────────────────── */
	return (
		<div className="relative min-h-screen bg-gray-50">
			{/* overlay while checking/auth */}
			{(loading || invalid) && (
				<div className="absolute inset-0 z-50 flex items-center justify-center bg-white">
					{loading
						? <>
							<svg className="animate-spin h-12 w-12 text-gray-500" viewBox="0 0 24 24" fill="none">
								<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
								<path fill="currentColor" className="opacity-75"
									d="M4 12a8 8 0 018-8v8H4z" />
							</svg>
							<p className="mt-4 text-gray-600">Checking credentials…</p>
						</>
						: <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded shadow">
							<p className="text-red-700 font-medium">
								Invalid credentials—you do not have permission to view this page.
							</p>
						</div>
					}
				</div>
			)}

			{/* page content */}
			<div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<h1 className="text-3xl font-extrabold text-gray-900 mb-6">
					Admin Panel
				</h1>

				{/* tabs */}
				<nav className="mb-8 border-b">
					{(['logs', 'create', 'manage'] as const).map(t => (
						<button
							key={t}
							onClick={() => setTab(t)}
							className={`px-4 py-2 -mb-px font-medium ${tab === t
								? 'border-b-2 border-red-600 text-red-600'
								: 'text-gray-600 hover:text-gray-800'
								}`}
						>
							{{
								logs: 'User Logs',
								create: editId ? 'Edit Position' : 'Create Position',
								manage: 'Manage Positions',
							}[t]}
						</button>
					))}
				</nav>

				{/* content for each tab */}
				<div className="space-y-6">

					{/* ─── 1) User Logs ───────────────────────── */}
					{tab === 'logs' && (
						<>
							{meErr && <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded">
								<p className="text-red-700">Error loading your account: {meErr}</p>
							</div>}
							{usersErr && <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded">
								<p className="text-red-700">Error loading users: {usersErr}</p>
							</div>}

							<div className="mb-4">
								<input
									type="text"
									placeholder="Search by Discord ID or username…"
									value={filter}
									onChange={e => setFilter(e.target.value)}
									className="w-full sm:w-1/2 px-3 py-2 border rounded-lg"
								/>
							</div>

							<div className="bg-white shadow rounded-lg overflow-hidden">
								<div className="overflow-x-auto">
									<table className="min-w-full divide-y divide-gray-200">
										<thead className="bg-gray-100">
											<tr>
												{['Discord ID', 'Username', 'First Seen'].map(col => (
													<th key={col}
														className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														{col}
													</th>
												))}
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													<button onClick={toggleSort}
														className="inline-flex items-center space-x-1 hover:text-gray-700">
														<span>Last Seen</span>
														{sortOrder === 'default' && <Clock className="h-4 w-4 text-gray-400" />}
														{sortOrder === 'desc' && <ArrowDown className="h-4 w-4 text-gray-600" />}
														{sortOrder === 'asc' && <ArrowUp className="h-4 w-4 text-gray-600" />}
													</button>
												</th>
												{['Role', 'IP Address'].map(col => (
													<th key={col}
														className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														{col}
													</th>
												))}
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{!displayedUsers
												? <tr><td colSpan={6}
													className="px-6 py-4 text-center text-gray-500">Loading users…</td></tr>
												: displayedUsers.length === 0
													? <tr><td colSpan={6}
														className="px-6 py-4 text-center text-gray-500">
														No one matches “{filter}.”
													</td></tr>
													: displayedUsers.map(u => (
														<tr key={u.id} className="hover:bg-gray-50">
															<td className="px-6 py-4 font-mono text-sm text-gray-700">{u.id}</td>
															<td className="px-6 py-4 text-gray-900">{u.username}</td>
															<td className="px-6 py-4 text-gray-700">
																{new Date(u.first_seen).toLocaleString()}
															</td>
															<td className="px-6 py-4 text-gray-700">
																{new Date(u.last_seen).toLocaleString()}
															</td>
															<td className="px-6 py-4 text-gray-700">{u.top_role || '—'}</td>
															<td className="px-6 py-4 font-mono text-sm text-gray-700">{u.ip}</td>
														</tr>
													))
											}
										</tbody>
									</table>
								</div>
							</div>
						</>
					)}

					{/* ─── 2) Create / Edit Position ────────────────── */}
					{tab === 'create' && (
						<div className="space-y-8">
							{posErr && <div className="mb-4 text-red-600">{posErr}</div>}

							{/* Title */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Position Title
								</label>
								<input
									type="text"
									value={formTitle}
									onChange={e => setFormTitle(e.target.value)}
									className="w-full bg-gray-100 text-black font-mono rounded-lg p-4 whitespace-pre-wrap border-2 border-primary focus:ring-pink focus:ring-2 transition-colors placeholder-gray-300 ring-red-200 focus:ring-red-300 focus:ring-opacity-50 focus:outline-none"
									placeholder="CTO | Chief Technology Officer..."
								/>
							</div>

							{/* Subtitle */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Subtitle / Role Type
								</label>
								<input
									type="text"
									value={formSubtitle}
									onChange={e => setFormSubtitle(e.target.value)}
									className="w-full bg-gray-100 text-black font-mono rounded-lg p-4 whitespace-pre-wrap border-2 border-primary focus:ring-pink focus:ring-2 transition-colors placeholder-gray-300 ring-red-200 focus:ring-red-300 focus:ring-opacity-50 focus:outline-none"
									placeholder="Management, Board of directors, etc."
								/>
							</div>

							{/* Description */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Full Job Description (Markdown)
									<span className="relative group ml-1 cursor-help">
										<svg className="inline w-4 h-4 text-gray-400 hover:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
										</svg>
										<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 w-64">
											<div className="font-semibold mb-2">Markdown Quick Reference:</div>
											<div className="space-y-1 text-left font-mono">
												<div>**Bold Text**</div>
												<div>*Italic Text*</div>
												<div>- Bullet Point</div>
												<div>[space][space]- Sub Bullet</div>
												<div>[Link Text](URL)</div>
											</div>
											<div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
										</div>
									</span>
								</label>
								<div className="flex space-x-6">
									{/* Editor */}
									<textarea
										value={formDesc}
										onChange={e => setFormDesc(e.target.value)}
										rows={12}
										className="w-1/2 bg-gray-100 text-black font-mono rounded-lg p-4 resize- whitespace-pre-wrap border-2 border-primary focus:ring-pink focus:ring-2 transition-colors placeholder-gray-300 ring-red-200 focus:ring-red-300 focus:ring-opacity-50 focus:outline-none"
										placeholder={"Use Markdown…"}
									/>

									{/* Live Preview */}
									<div className="w-1/2 bg-gray-200 rounded-lg p-4 overflow-auto prose border-2 border-pink-800">
										<ReactMarkdown
											remarkPlugins={[remarkBreaks]}
											components={{
												h1: ({ children }) => (
													<h1 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#870044] pb-2 sm:text-xl">
														{children}
													</h1>
												),
												h2: ({ children }) => (
													<h2 className="text-xl font-semibold text-gray-800 mb-3 mt-6 sm:text-lg">
														{children}
													</h2>
												),
												h3: ({ children }) => (
													<h3 className="text-lg font-medium text-gray-700 mb-2 mt-4 sm:text-base">
														{children}
													</h3>
												),
												ul: ({ children }) => (
													<ul className="list-disc pl-6 mb-4">{children}</ul>
												),
												ol: ({ children }) => (
													<ol className="list-decimal pl-6 mb-4">{children}</ol>
												),
												li: ({ children }) => (
													<li className="mb-2">{children}</li>
												),
												a: ({ children, href }) => (
													<a
														href={href}
														target="_blank"
														rel="noopener noreferrer"
														className="text-[#870044] hover:text-[#5c0632] underline font-medium transition-colors"
													>
														{children}
													</a>
												),
												p: ({ children }) => (
													<p className="mb-4 text-gray-700 leading-relaxed sm:text-sm">
														{children}
													</p>
												),
												strong: ({ children }) => (
													<strong className="font-semibold text-gray-900">
														{children}
													</strong>
												),
												em: ({ children }) => (
													<em className="italic text-gray-600">
														{children}
													</em>
												)
											}}
										>
											{formDesc || '_preview…_'}
										</ReactMarkdown>
									</div>
								</div>
							</div>

							{/* Save */}
							<button
								disabled={!canSave}
								onClick={handleSavePosition}
								className={`px-6 py-2 rounded-lg font-semibold transition ${canSave
									? 'bg-primary hover:bg-red-900 text-white'
									: 'bg-gray-300 text-gray-600 cursor-not-allowed'
									}`}
							>
								{editId ? 'Update Position' : 'Create Position'}
							</button>
						</div>
					)}

					{/* ─── 3) Manage Positions ─────────────────────── */}
					{tab === 'manage' && (
						<>
							{posErr && <div className="mb-4 text-red-600">{posErr}</div>}
							<div className="space-y-4">
								{positions.map(p => (
									<div key={p.id}
										className="flex items-center justify-between bg-white rounded-lg p-4 shadow">
										<div>
											<h3 className="font-semibold">{p.title}</h3>
											<p className="italic text-gray-600">{p.subtitle}</p>
											<p className="text-gray-700">Created By: {p.createdby}</p>
										</div>
										<div className="space-x-2">
											<button
												onClick={() => handleEditClick(p)}
												className="inline-flex items-center space-x-1 bg-yellow-500 px-3 py-1 rounded text-white hover:bg-yellow-600"
											>
												<Edit2 className="h-4 w-4" /> <span>Edit</span>
											</button>
											<button
												onClick={() => handleDelete(p.id)}
												className="inline-flex items-center space-x-1 bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
											>
												<Trash2 className="h-4 w-4" /> <span>Delete</span>
											</button>
										</div>
									</div>
								))}
								{positions.length === 0 && (
									<p className="text-gray-500">No open positions published yet.</p>
								)}
							</div>
						</>
					)}

				</div>
			</div>
		</div>
	)
}
