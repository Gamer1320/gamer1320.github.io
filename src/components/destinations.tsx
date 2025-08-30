import React from 'react';   
import Gatwick from '../assets/Gatwick.jpg';   
import Southampton from '../assets/Southampton.jpg';
import Canaries from '../assets/Canaries.jpg';              
import PuntaCana from '../assets/PuntaCana.jpg';
import Cibao from '../assets/Cibao.jpg';      
import Menorca from '../assets/Menorca.jpg';
import Larnaca from '../assets/Larnaca.jpg';    
import Paphos from '../assets/Paphos.jpg';
import Kittila from '../assets/Kittila.jpg';  

const destinations = [
  {
	name: "London Gatwick Airport",
	image: Gatwick,
	description: "A major international airport serving London , known for its extensive flight network and modern facilities."
  },
  {
	name: "Southampton Airport",
	image: Southampton,
	description: "Located on the south coast of England, Southampton Airport is a key regional airport offering flights to various domestic and European destinations as well as being a connector for ACRV Operations."
  }
  ,{    name: "Gran Canaria Airport",
	  image: Canaries,
	  description: "A popular holiday destination in the Canary Islands, Gran Canaria Airport serves as a gateway for tourists seeking sun and relaxation, with flights connecting to various islands including Punta Cana and our hub, Punta Cana."
  },
  {
	name: "Punta Cana International Airport",
	image: PuntaCana,
	description: "A major airport in the Dominican Republic , the hub of all ACRV Operations, Punta Cana International Airport is known for its beautiful beaches and resorts, making it a popular vacation spot for travelers from around the world."
  }
  ,{    name: "Cibao International Airport",
	  image: Cibao,
	  description: "Located in the Dominican Republic, Cibao International Airport serves the Santiago region and is a key point for both domestic and international flights operated by ACRV, enhancing connectivity for travelers and saving cost time."
  },
  {
	name: "Menorca Airport",
	image: Menorca,
	description: "A key airport in the Balearic Islands, Menorca Airport is known for its beautiful beaches and historical sites, serving as a popular destination for tourists seeking sun and culture and a connection point for Canada."
  },
  {
	name: "Larnaca International Airport",
	image: Larnaca,
	description: "Larnaca International Airport is the main international airport in Cyprus , serving as a gateway to the island's rich history and beautiful beaches, with Air Canada Rouge providing essential connectivity for travelers."
  }
  ,{   name: "Paphos International Airport",
	image: Paphos,
	description: "Paphos International Airport is a key airport in Cyprus, known for its archaeological sites and beautiful coastal scenery, serving as a popular destination for tourists and a connection point for ACRV flights."
  },
  {
	name: "Kittila Airport",
	image: Kittila,
	description: "Kittila Airport is located in Finnish Lapland and serves as a gateway to the region's winter sports and natural beauty, with Canada providing essential connectivity for travelers seeking adventure in the Arctic."
  }  
  // Add more destinations as needed
];

function Destinations() {
  return (
	<div className="container mx-auto p-4">
	  <h1 className="text-2xl font-bold mb-4">Destinations</h1>
	  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
		{destinations.map((dest) => (
		  <div key={dest.name} className="bg-white rounded-lg shadow p-4">
			<img src={dest.image} alt={dest.name} className="w-full h-48 object-cover rounded-t-lg" />
			<h2 className="text-xl font-semibold mt-2">{dest.name}</h2>
			<p className="mt-1">{dest.description}</p>
		  </div>
		))}
	  </div>
	</div>
  );
}

export default Destinations;