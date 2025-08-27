import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Award, ArrowRight } from 'lucide-react';

import heroImg from '../assets/hero.png';
import heroVideo from '../assets/HeroVideo2.mp4';

const Home: React.FC = () => {
	const features = [
		{
			icon: MapPin,
			title: 'Global Destinations',
			description: 'Fly to premium destinations across Europe, the Caribbean, and beyond',
		},
		{
			icon: Users,
			title: 'Premium Service',
			description: 'Experience world-class hospitality and comfort at 35,000 feet',
		},
		{
			icon: Award,
			title: 'Award-Winning',
			description: 'Recognized globally for excellence in aviation and customer service',
		},
	];

	return (
		<>
			{/* HERO SECTION */}
			<section className="relative h-screen overflow-hidden">
				{/* mobile image */}
				<div
					className="absolute inset-0 bg-center bg-cover bg-no-repeat md:hidden"
					style={{ backgroundImage: `url(${heroImg})` }}
				/>
				{/* desktop video */}
				<video
					className="absolute inset-0 w-full h-full object-cover hidden md:block"
					src={heroVideo}
					poster={heroImg}
					autoPlay
					loop
					muted
					playsInline
					style={{ 
						minWidth: '100%', 
						minHeight: '100%',
						transform: 'scale(1.1)',
						transformOrigin: 'center center'
					}}
				/>
				{/* dark overlay */}
				<div className="absolute inset-0 bg-black/50" />
				{/* hero content */}
				<div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
					<h1 className="text-5xl md:text-7xl font-bold text-white">Going Places</h1>
					<h2 className="text-5xl md:text-7xl font-bold text-amber-400">Together</h2>
					<p className="mt-4 text-lg md:text-2xl text-white max-w-xl">
						Experience premium aviation in Roblox with Qatar Airways Virtual. Where virtual flights meet real excellence.
					</p>
					<div className="mt-8 flex space-x-4">
						<Link
							to="https://discord.com/invite/yKt53cWacV"
							target="_blank"
							className="bg-red-800 hover:bg-red-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
						>
							Join Us Now
						</Link>
						<Link
							to="/fly-with-us"
							className="bg-transparent border-2 border-white hover:bg-white hover:text-red-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
						>
							Fly with Us
						</Link>
					</div>
				</div>
			</section>

			{/* FEATURES SECTION */}
			<section className="py-20 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Qatar Airways</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Experience the difference with our commitment to excellence, innovation, and hospitality.
						</p>
					</div>
					<div className="grid md:grid-cols-3 gap-8">
						{features.map((feature, i) => {
							const Icon = feature.icon;
							return (
								<div
									key={i}
									className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group"
								>
									<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-800 transition-colors duration-300">
										<Icon className="h-8 w-8 text-light-secondary group-hover:text-white transition-colors duration-300" />
									</div>
									<h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
									<p className="text-gray-600 leading-relaxed">{feature.description}</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* CTA SECTION */}
			<section className="py-20 bg-red-800 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-4xl font-bold mb-6">Ready to Take Off?</h2>
					<p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
						Join millions of satisfied travelers who trust Qatar Airways for their journey around the world.
					</p>
					<Link
						to="/fly-with-us"
						className="inline-flex items-center bg-white text-red-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
					>
						Start Your Journey<ArrowRight className="ml-2 h-5 w-5" />
					</Link>
				</div>
			</section>
		</>
	);
};

export default Home;
