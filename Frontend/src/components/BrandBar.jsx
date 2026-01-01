import parada from "../assets/images/parada.svg";
import calvinklein from "../assets/images/calvinklein.svg";
import zara from "../assets/images/zara.svg";
import gucci from "../assets/images/gucci.svg";
import versace from "../assets/images/versace.svg";

const brands = [parada, calvinklein, zara, gucci, versace, parada];

function BrandBar() {
  return (
    <div className="bg-black py-2">
      <div className="flex items-center justify-evenly">
        {brands.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt="brand"
            className="h-6 object-contain grayscale hover:grayscale-0 transition"
          />
        ))}
      </div>
    </div>
  );
}

export default BrandBar;
