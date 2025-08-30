import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import { X, Briefcase, Mail, MessageSquare } from 'lucide-react'

type Position = {
	id: number
	title: string
	subtitle: string
	about: string
	created_at: string
}

export default function Careers() {
	const [jobs, setJobs] = useState<Position[]>([])
	const [selected, setSelected] = useState<Position | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [showApplyModal, setShowApplyModal] = useState(false)

	useEffect(() => {
		fetch('/api/positions')
			.then(r => {
				if (!r.ok) throw new Error('Failed to fetch positions')
				return r.json()
			})
			.then(data => {
				setJobs(data)
				setLoading(false)
			})
			.catch(err => {
				console.error(err)
				setError(err.message)
				setLoading(false)
			})
	}, [])

	// Manage scroll when modal is open
	useEffect(() => {
		document.body.style.overflow = selected || showApplyModal ? 'hidden' : ''
	}, [selected, showApplyModal])

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#870044] mx-auto"></div>
					<p className="mt-4 text-gray-600">Loading careers...</p>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
				<div className="text-center bg-white p-8 rounded-lg shadow-lg">
					<p className="text-red-600 mb-4">Error loading careers: {error}</p>
					<button
						onClick={() => window.location.reload()}
						className="px-4 py-2 bg-[#870044] text-white rounded-lg hover:bg-[#5c0632] transition-colors"
					>
						Try Again
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
			<div className="max-w-6xl mx-auto py-16 px-4">
				{/* Header Section */}
				<div className="text-center mb-12">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-[#870044] rounded-full mb-4">
						<Briefcase className="w-8 h-8 text-white" />
					</div>
					<h1 className="text-5xl font-bold text-gray-900 mb-4">Join Our Team</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Discover exciting career opportunities and help us shape the future of Roblox aviation.
					</p>
				</div>

				{/* Jobs Grid */}
				{jobs.length === 0 ? (
					<div className="text-center py-16">
						<div className="bg-white rounded-lg shadow-lg p-12 max-w-lg mx-auto">
							<Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
							<h3 className="text-xl font-semibold text-gray-900 mb-2">No Open Positions</h3>
							<p className="text-gray-600">
								We don't have any open positions at the moment, but check back soon for new opportunities!
							</p>
						</div>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{jobs.map(job => (
							<div
								key={job.id}
								onClick={() => setSelected(job)}
								className="group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
							>
								<div className="p-6">
									<div className="flex items-start justify-between mb-4">
										<div className="w-12 h-12 bg-gradient-to-br from-[#870044] to-[#5c0632] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
											<Briefcase className="w-6 h-6 text-white" />
										</div>
										<span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
											{new Date(job.created_at).toLocaleDateString()}
										</span>
									</div>

									<h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#870044] transition-colors">
										{job.title}
									</h2>
									<p className="text-gray-600 text-sm mb-4 line-clamp-2">
										{job.subtitle}
									</p>

									<div className="flex items-center text-[#000000] font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
										<span>Learn More</span>
										<svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
										</svg>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Job Details Modal */}
			{selected && (
				<div
					className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
					onClick={() => setSelected(null)}
				>
					<div
						className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-auto rounded-2xl shadow-2xl"
						onClick={e => e.stopPropagation()}
					>
						{/* Modal Header */}
						<div className="bg-gradient-to-r from-[#870044] to-[#5c0632] text-white p-8 sm:p-6">
							<button
								className="absolute top-6 right-6 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200 sm:top-4 sm:right-4"
								onClick={() => setSelected(null)}
							>
								<X size={24} />
							</button>

							<div className="flex items-start space-x-4 ">
								{/* Briefcase icon visible only on desktop */}
								<div className="w-16 h-16 bg-white/20 rounded-xl hidden sm:flex items-center justify-center ">
									<Briefcase className="w-8 h-8 text-white" />
								</div>
								<div>
									<h2 className="text-3xl font-bold mb-2 sm:text-2xl">{selected.title}</h2>
									<p className="text-xl text-white/90 sm:text-lg">{selected.subtitle}</p>
									<p className="text-sm text-white/70 mt-2 sm:text-xs">
										Posted on {new Date(selected.created_at).toLocaleDateString()}
									</p>
								</div>
							</div>
						</div>

						{/* Modal Content */}
						<div className="p-8 sm:p-6 overflow-y-auto sm:max-h-[65vh] max-h-[50vh]">
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
								{selected.about}
							</ReactMarkdown>
						</div>

						{/* Modal Footer */}
						<div className="bg-gray-50 px-8 py-6 border-t border-gray-200 sm:px-6 sm:py-4">
							<div className="flex items-center justify-between sm:justify-center">
								 {/* Close button visible only on desktop */}
								<button
									onClick={() => setSelected(null)}
									className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors hidden sm:block"
								>
									Close
								</button>
								{/* Apply Now button visible on both desktop and mobile */}
								<button
									onClick={() => setShowApplyModal(true)}
									className="px-6 py-2 bg-[#870044] text-white rounded-lg hover:bg-[#5c0632] transition-colors font-medium sm:px-4 sm:py-2 sm:text-sm"
								>
									Apply Now
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Apply Modal */}
			{showApplyModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
					<div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-auto max-h-[90vh]">
						<div className="flex items-center justify-between p-6 border-b">
							<h3 className="text-lg font-semibold text-gray-900">
								Apply for {selected?.title}
							</h3>
							<button
								onClick={() => setShowApplyModal(false)}
								className="text-gray-400 hover:text-gray-600 transition-colors"
							>
								<X className="h-5 w-5" />
							</button>
						</div>
						<div className="p-6">
							<div className="space-y-3">
								<button
									onClick={() => {
										window.open(
											'mailto:founder@qatarairwaysvirtual.com?subject=Application for ' +
											selected?.title,
											'_blank'
										)
										setShowApplyModal(false)
									}}
									className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-[#870044] text-white rounded-lg hover:bg-[#5c0632] transition-colors font-medium"
								>
									<Mail className="h-5 w-5" />
									<span>Apply via Email</span>
								</button>
								<button
									onClick={() => {
										window.open('https://discord.gg/nxseHHfrRH', '_blank')
										setShowApplyModal(false)
									}}
									className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-[#5865F2] text-white rounded-lg hover:bg-[#4752C4] transition-colors font-medium"
								>
									<MessageSquare className="h-5 w-5" />
									<span>Open a Ticket in Discord</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}