import Image from "next/image";
import Link from "next/link";
import logo from "../assets/mechanix-logo.png";

export default function NavBar() {
	return (
		<nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
			<div className="container flex flex-wrap justify-between items-center mx-auto">
				<Link href="/">
					<div className="flex items-center mx-2 cursor-pointer">
						<Image src={logo} width={36} height={36} className="mr-3" alt="Mechanix Logo" />
						<span className="self-center text-xl font-semibold whitespace-nowrap mx-2">Mechanix</span>
					</div>
				</Link>
				<div className="md:block md:w-auto" id="navbar-default">
					<ul className="flex p-4 rounded-lg md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
						<li>
							<Link href="/appointments" >
								<span className="block cursor-pointer text-sm font-medium text-gray-600 rounded hover:text-sky-700 md:p-0">My Appointments</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}