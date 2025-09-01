import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Award, ArrowRight } from 'lucide-react';

import heroImg from '../assets/welcomebanner2.png';
import heroVideo from '../assets/HeroVideo2.mp4';

<section class="w-full py-16 px-5 text-center bg-gradient-to-r from-[#0a111f] via-[#1e3a5f] to-[#0a111f]">
        <div class="container mx-auto max-w-7xl">
            <h2 class="text-3xl sm:text-4xl font-bold mb-2 relative inline-block">
                ACRV Trusted Partners
                <span class="block w-16 h-1 bg-gray-600 mx-auto mt-2"></span>
            </h2>
            <p class="text-base sm:text-lg text-gray-400 mb-12 max-w-4xl mx-auto">
                Test.
            </p>

            <div class="flex flex-wrap justify-center gap-10 lg:gap-16">
                <div class="flex-shrink-0 relative group">
                    <a href="https://www.emirates.com/" target="_blank" rel="noopener noreferrer" class="flex justify-center items-center w-full transition-transform duration-300 hover:scale-110">
                        <img src="https://media.discordapp.net/attachments/1364759010611298324/1411863654869110804/staralliance.png?ex=68b633fe&is=68b4e27e&hm=bd3dfb4b90bb9d323d5955913a2301c9222045f61600592eb7a04b57e0b29af8&=&format=webp&quality=lossless&width=281&height=281" alt="Star Alliance" class="h-14 object-contain filter drop-shadow-md brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        <div class="absolute left-1/2 -top-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-900 text-white text-sm py-1 px-3 rounded-md whitespace-nowrap pointer-events-none z-20">
                            Star Alliance
                        </div>
                    </a>
                </div>

                <div class="flex-shrink-0 relative group">
                    <a href="https://www.lufthansa.com/" target="_blank" rel="noopener noreferrer" class="flex justify-center items-center w-full transition-transform duration-300 hover:scale-110">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Lufthansa_Logo.svg/1200px-Lufthansa_Logo.svg.png" alt="Lufthansa" class="h-14 object-contain filter drop-shadow-md brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        <div class="absolute left-1/2 -top-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-900 text-white text-sm py-1 px-3 rounded-md whitespace-nowrap pointer-events-none z-20">
                            Lufthansa
                        </div>
                    </a>
                </div>
                
                <div class="flex-shrink-0 relative group">
                    <a href="https://www.eurowings.com/" target="_blank" rel="noopener noreferrer" class="flex justify-center items-center w-full transition-transform duration-300 hover:scale-110">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Eurowings_logo.svg/1200px-Eurowings_logo.svg.png" alt="Eurowings" class="h-14 object-contain filter drop-shadow-md brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        <div class="absolute left-1/2 -top-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-900 text-white text-sm py-1 px-3 rounded-md whitespace-nowrap pointer-events-none z-20">
                            Eurowings
                        </div>
                    </a>
                </div>

                </div>
        </div>
    </section>

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
			description: 'Winner of the Skytrax World Airline Award for Best Airline under 100 members',
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
					src={heroImg}
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
					<h2 className="text-5xl md:text-7xl font-bold text-white">Together</h2>
					<p className="mt-4 text-lg md:text-2xl text-white max-w-xl">
						Experience premium aviation in Roblox with Air Canada Rouge Virtual. Where virtual flights meet real excellence.
					</p>
					<div className="mt-8 flex space-x-4">
						<Link
							to="https://discord.gg/nxseHHfrRH"
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
						<h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Air Canada Rouge</h2>
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
						Join hundreds of satisfied travelers who trust Air Canada Rouge Virtual for their journey around the world.
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