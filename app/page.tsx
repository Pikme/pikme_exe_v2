import Link from 'next/link';
import { getAllTours } from '@/data';

export default async function Home() {
  const tours = await getAllTours();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Pikme Tours</h1>
        <p className="text-gray-600 mb-8">Explore our curated spiritual and adventure tours across India.</p>
        
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-left border-b pb-2">Featured Tours</h2>
          {tours.map((tour) => (
            <Link 
              key={tour.slug} 
              href={`/activity/${tour.slug}`}
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-orange-50 rounded-2xl transition-colors group"
            >
              <div className="text-left">
                <h3 className="font-bold text-gray-800 group-hover:text-orange-600">{tour.title}</h3>
                <p className="text-sm text-gray-500">{tour.duration} • {tour.location}</p>
              </div>
              <span className="text-orange-500 font-bold">View Details →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
