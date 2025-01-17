import Image from "next/image";
import backgroundImage from '../../public/images/tomato.jpg';
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="absolute inset-0 z-[-1]"> {/* Background layer */}
        <Image
          src={backgroundImage} // Path to your image file
          alt="Tomato"
          layout="fill" // Fill the entire parent container
          objectFit="cover" // Maintain aspect ratio and cover the entire area
          quality={75} // Optional: adjust the image quality
        />
      </div>

      {/* Main Topic Positioned at the Top Center */}
      <div className="flex flex-col justify-center items-center h-full gap-8">
      <h1 className="text-4xl sm:text-5xl md:text-4xl font-extrabold text-white p-4 rounded-md bg-opacity-70 backdrop-blur-md flex flex-col items-center">
  <span>Vegetable Shop</span>
  <span className="block">Inventory Management</span>
</h1>


        
        {/* Blue Button */}
        <Link href="/vegetable-list" className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all">
          Check the Inventory
        </Link>
      </div>

      {/* Content goes here */}
    </div>
  );
}
