import heroImage from "../assets/images/heroImage.svg";

function Hero() {
  return (
    <section className="relative w-full bg-gray-100">
      
      {/* ẢNH – HIỆN ĐẦY ĐỦ */}
      <img
        src={heroImage}
        alt="Hero"
        className="w-full max-h-[500px] object-contain mx-auto"
      />

      {/* TEXT BÊN TRÁI */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-xl ml-16">
          
          {/* H1 */}
          <h1 className="font-hero text-5xl font-black tracking-wide drop-shadow-xl">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>

          {/* P */}
          <p className="text-gray-600 mb-6 text-sm">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of style.
          </p>

          {/* BUTTON */}
          <button className="bg-black text-white px-6 py-3 rounded rounded-lg">
            Shop Now
          </button>
          


        </div>
      </div>

    </section>
  );
}

export default Hero;
