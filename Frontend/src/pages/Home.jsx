import Hero from "../components/Hero";
import BrandBar from "../components/BrandBar";
import NewArrivals from "../components/NewArrivals";
import TopSelling from "../components/TopSelling";

export default function Home() {
  return (
    <>
      {/* DEBUG: Quick link to Auth for testing */}
      <div className="max-w-6xl mx-auto my-6 px-4">
        <div className="flex justify-center">
          <a href="/auth" className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600">Go to Auth (debug)</a>
        </div>
      </div>

      <Hero />
      <BrandBar />
      <NewArrivals />
      <TopSelling />
    </>
  );
}
