import React, { useState } from 'react'
import { Users as UsersIcon, Gauge as GaugeIcon, Fuel as FuelIcon } from 'lucide-react'
import B727 from '../assets/B727.png'
import B777 from '../assets/B777.png'
import A350 from '../assets/A350.png'
import B787 from '../assets/B787.png'

type Aircraft = {
	model: string
	name: string
	description: string
	image: string
	specifications: {
		passengers: string
		rangeKm: number
		speedKph: number
	}
	features: string[]
}

const FLEET: Aircraft[] = [
	{
		model: 'Boeing 727',
		name: 'The Classic',
		description:
			'The Boeing 727 is a groundbreaking tri-jet aircraft that transformed air travel since its launch. Renowned for its T-tail design and efficiency, it could operate from shorter runways while accommodating up to 189 passengers. This aircraft became a favorite for airlines, blending comfort and reliability in both domestic and international flights. Its legacy continues to impact modern aviation, reflecting Boeing\'s dedication to innovation.',
		image: B727,
		specifications: { passengers: '149–189', rangeKm: 4400, speedKph: 964 },
		features: ['Tri‑jet Configuration', 'Proven Reliability', 'Comfortable Seating', 'Regional Excellence'],
	},
	{
		model: 'Boeing 777‑300ER',
		name: 'The Long‑Haul Champion',
		description:
			'The Boeing 777-300ER is a premier long-range, wide-body aircraft celebrated for its impressive capacity and outstanding efficiency. With seating for over passengers, it seamlessly blends comfort and advanced technology, making it the top choice for many travellers. Its powerful engines and sleek aerodynamic design empower it to effortlessly cover vast distances, while its spacious cabins elevate the flying experience to new heights. We have two liveries, one being the 2022 FIFA WC livery, restricted only to @Captain and above.',
		image: B777,
		specifications: { passengers: '314–396', rangeKm: 17370, speedKph: 905 },
		features: ['Twin‑Engine Efficiency', 'Premium Comfort', 'Advanced Avionics', 'Global Reach'],
	},
	{
		model: 'Boeing 787 Dreamliner',
		name: 'The Dreamliner',
		description:
			'The Boeing 787 Dreamliner is a groundbreaking long-haul aircraft celebrated for its fuel efficiency, advanced technology, and comfort. With a composite fuselage and wings, it reduces weight and enhances aerodynamics, leading to lower fuel consumption. The Dreamliner features state-of-the-art systems, including larger windows and improved cabin pressure, which enhance the flying experience. The B787 connects global destinations while providing an unforgettable experience in the air.',
		image: B787,
		specifications: { passengers: '242–335', rangeKm: 14140, speedKph: 913 },
		features: ['Composite Materials', 'Fuel Efficient', 'Quiet Cabin', 'Advanced Systems'],
	},
	{
		model: 'Airbus A350',
		name: 'The Future of Flight',
		description:
			'The Airbus A350 is a state-of-the-art, long-range, wide-body designed for efficiency and passenger comfort. Featuring advanced aerodynamics and lightweight materials, it offers reduced fuel consumption and lower emissions compared to older models. The cabin is equipped with modern amenities and spacious seating, ensuring a pleasant flying experience for. With its impressive range and performance, the A350 is the leader of the skies.',
		image: A350,
		specifications: { passengers: '253–440', rangeKm: 15000, speedKph: 903 },
		features: ['Next‑Gen Materials', 'Fuel Efficient', 'Quiet Cabin', 'Enhanced Connectivity'],
	},
]

export default function Fleet() {
	// unit state: metric (km, kph) or imperial (nm, kt)
	const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')

	const convertRange = (km: number) => {
		if (unit === 'imperial') return (km / 1.852).toFixed(0) + ' nm'
		return km.toLocaleString() + ' km'
	}
	const convertSpeed = (kph: number) => {
		if (unit === 'imperial') return (kph / 1.852).toFixed(0) + ' kt'
		return kph.toLocaleString() + ' km/h'
	}

	return (
		<div className="min-h-screen bg-gray-50 py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
				{/* 1) Fleet at a glance */}
				<div className="bg-red-800 text-white rounded-3xl shadow-lg p-10">
					<h2 className="text-3xl font-extrabold text-center mb-8">Fleet At a Glance</h2>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
						<div className="text-center">
							<p className="text-6xl font-extrabold leading-none">4</p>
							<p className="mt-2 uppercase tracking-wider">Models</p>
						</div>
						<div className="text-center">
							<p className="text-6xl font-extrabold leading-none">99.7%</p>
							<p className="mt-2 uppercase tracking-wider">On‑Time Performance</p>
						</div>
						<div className="text-center">
							<p className="text-6xl font-extrabold leading-none">5★</p>
							<p className="mt-2 uppercase tracking-wider">Safety Rating</p>
						</div>
					</div>
				</div>

				{/* 2) Header + unit toggle */}
				<div className="flex flex-col md:flex-row items-center justify-between gap-6">
					<div className="text-center md:text-left">
						<h1 className="text-5xl font-extrabold text-gray-900 mb-2">Our Fleet</h1>
						<p className="text-lg text-gray-600">
							Cutting‑edge aircraft, superior comfort, and top safety standards — your journey starts here.
						</p>
					</div>
					<div className="flex items-center space-x-4">
						<span className="font-medium text-gray-700">Units:</span>
						{(['metric','imperial'] as const).map(u => (
							<button
								key={u}
								onClick={() => setUnit(u)}
								className={`
									px-4 py-1 rounded-full font-medium transition
									${unit === u
										? 'bg-red-800 text-white'
										: 'bg-white text-gray-700 hover:bg-gray-100'}
								`}
							>
								{u === 'metric' ? 'km / kmh' : 'nm / kt'}
							</button>
						))}
					</div>
				</div>

				{/* 3) Aircraft cards */}
				<div className="space-y-12">
					{FLEET.map((plane, idx) => (
						<div
							key={idx}
							className={`
								bg-white rounded-3xl shadow-lg overflow-hidden transition-transform
								hover:scale-[1.01]
								lg:flex ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}
							`}
						>
							{/* Image */}
							<div className="lg:w-1/2 relative overflow-hidden">
								<img
									src={plane.image}
									alt={plane.model}
									className="w-full h-64 lg:h-full object-cover"
								/>
								<div className="absolute top-4 left-4 bg-red-800 text-white px-3 py-1 rounded-full font-semibold text-sm">
									{plane.model}
								</div>
							</div>
							{/* Details */}
							<div className="lg:w-1/2 p-8 flex flex-col">
								<h3 className="text-3xl font-bold text-gray-900 mb-1">{plane.name}</h3>
								<p className="text-red-800 font-semibold mb-4">{plane.model}</p>
								<p className="text-gray-700 mb-6 flex-grow">{plane.description}</p>

								{/* Specs */}
								<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
									<div className="bg-gray-50 p-4 rounded-lg text-center">
										<UsersIcon className="h-6 w-6 text-red-800 mx-auto mb-2" />
										<p className="text-sm text-gray-500">Passengers</p>
										<p className="font-semibold text-gray-900">{plane.specifications.passengers}</p>
									</div>
									<div className="bg-gray-50 p-4 rounded-lg text-center">
										<GaugeIcon className="h-6 w-6 text-red-800 mx-auto mb-2" />
										<p className="text-sm text-gray-500">Max Speed</p>
										<p className="font-semibold text-gray-900">
											{convertSpeed(plane.specifications.speedKph)}
										</p>
									</div>
									<div className="bg-gray-50 p-4 rounded-lg text-center">
										<FuelIcon className="h-6 w-6 text-red-800 mx-auto mb-2" />
										<p className="text-sm text-gray-500">Range</p>
										<p className="font-semibold text-gray-900">
											{convertRange(plane.specifications.rangeKm)}
										</p>
									</div>
								</div>

								{/* Features */}
								<div className="mb-6">
									<h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h4>
									<ul className="grid grid-cols-2 gap-3">
										{plane.features.map((feat, i) => (
											<li
												key={i}
												className="flex items-center text-gray-700 bg-gray-50 px-3 py-2 rounded-lg"
											>
												<span className="h-2 w-2 bg-red-800 rounded-full mr-3 block" />
												{feat}
											</li>
										))}
									</ul>
								</div>

								<button className="mt-auto bg-red-800 hover:bg-red-900 text-white font-semibold py-3 rounded-lg transition">
									Learn More About {plane.name}
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}