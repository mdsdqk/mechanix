import Image from "next/image";
import carImage from "../assets/Car_Monochromatic.svg";

export default function Hero() {
	return (
		<div className="m-2 mt-4 p-2 relative md:w-2/3">
			<h1 className="text-center mt-16 md:text-left md:ml-8 text-2xl md:text-3xl lg:text-4xl font-medium text-slate-700">
				Get your car serviced by the best!
			</h1>
			<div className="absolute top-12 md:top-0 w-full h-screen">
				<Image src={carImage} alt="Hero Image" layout="responsive" />
			</div>
		</div>
	);
}