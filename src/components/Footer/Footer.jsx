import React from 'react'

const Footer = () => {
	return (
		<footer className="mt-20 border-t bg-white">
			<div className="max-w-7xl mx-auto px-6 py-12">
				
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10">

					{/* Brand */}
					<div>
						<div className="flex items-center gap-3">
							<div className="w-11 h-11 rounded-xl bg-linear-to-br from-purple-600 to-blue-500 flex items-center justify-center shadow-md">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="white">
									<path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
								</svg>
							</div>

							<div>
								<h2 className="font-semibold text-lg bg-linear-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
									Employee Manager
								</h2>
								<p className="text-xs text-gray-500">
									Simple task & team management
								</p>
							</div>
						</div>

						<p className="text-sm text-gray-500 mt-5">
							Built with care ✨ © {new Date().getFullYear()} Employee Manager
						</p>
					</div>


					{/* Product Links */}
					<div className="hidden md:block">
						<h4 className="font-semibold mb-3">Product</h4>
						<ul className="text-sm text-gray-500 space-y-2">
							<li className="hover:text-purple-600 cursor-pointer transition">Features</li>
							<li className="hover:text-purple-600 cursor-pointer transition">Pricing</li>
							<li className="hover:text-purple-600 cursor-pointer transition">Docs</li>
						</ul>
					</div>


					{/* Contact */}
					<div>
						<h4 className="font-semibold mb-3">Contact</h4>

						<p className="text-sm text-gray-500">
							support@empmgr.local
						</p>

						<div className="flex gap-3 mt-4">

							<div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-purple-100 cursor-pointer transition">
								🌐
							</div>

							<div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-blue-100 cursor-pointer transition">
								🐦
							</div>

							<div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-pink-100 cursor-pointer transition">
								📸
							</div>

						</div>
					</div>

				</div>

				{/* Bottom Line */}
				<div className="border-t mt-10 pt-6 text-center text-xs text-gray-400">
					Made with ❤️ using modern web technologies
				</div>

			</div>
		</footer>
	)
}

export default Footer
