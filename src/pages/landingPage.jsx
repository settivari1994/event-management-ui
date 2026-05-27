export default function LandingPage() {
  const menuItems = [
    'Home',
    'Features',
    'Services',
    'Pricing',
    'Contact',
  ];

  const logos = [
    'Google',
    'Microsoft',
    'Amazon',
    'Netflix',
    'Spotify',
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
            B
          </div>
          <h1 className="text-2xl font-bold">Brandify</h1>
        </div>

        <nav>
          <ul className="flex gap-8 text-lg font-medium">
            {menuItems.map((item) => (
              <li
                key={item}
                className="cursor-pointer hover:text-blue-600 transition"
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>

        <button className="bg-black text-white px-5 py-2 rounded-xl hover:scale-105 transition">
          Get Started
        </button>
      </header>

      {/* Hero Banner */}
      <section className="grid md:grid-cols-2 gap-10 items-center px-8 md:px-16 py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div>
          <p className="text-blue-600 font-semibold mb-4 uppercase tracking-wide">
            Modern React Landing Page
          </p>

          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Build Stunning
            <span className="text-blue-600"> Web Experiences</span>
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-8">
            Create responsive and modern websites using React JS and Tailwind CSS.
            This landing page comes with a beautiful hero banner, navigation menu,
            logos section, and reusable UI blocks.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-lg hover:scale-105 transition">
              Start Free
            </button>

            <button className="border border-gray-300 px-6 py-3 rounded-2xl text-lg hover:bg-white transition">
              Live Demo
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop"
              alt="Banner"
              className="rounded-2xl w-full h-[350px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Trusted Logos */}
      <section className="px-8 md:px-16 py-16 bg-white">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold mb-3">Trusted by Top Companies</h3>
          <p className="text-gray-500">
            Companies around the world use our platform.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {logos.map((logo) => (
            <div
              key={logo}
              className="bg-gray-100 rounded-2xl p-6 flex items-center justify-center text-xl font-bold hover:shadow-lg transition"
            >
              {logo}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-8 md:px-16 py-20 bg-gray-50">
        <div className="text-center mb-14">
          <h3 className="text-4xl font-bold mb-4">Why Choose Us?</h3>
          <p className="text-gray-600 text-lg">
            Everything you need for a modern frontend application.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Responsive Design',
              desc: 'Works perfectly on mobile, tablet, and desktop devices.',
            },
            {
              title: 'Modern UI',
              desc: 'Beautiful components with clean and scalable design.',
            },
            {
              title: 'Fast Performance',
              desc: 'Optimized React components with smooth user experience.',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-8 rounded-3xl shadow-md hover:-translate-y-2 transition"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl mb-6">
                🚀
              </div>

              <h4 className="text-2xl font-bold mb-4">{feature.title}</h4>
              <p className="text-gray-600 leading-7">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-10 px-8 md:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-2xl font-bold mb-2">Brandify</h4>
            <p className="text-gray-400">
              Modern React landing page template.
            </p>
          </div>

          <div className="flex gap-6 text-gray-300">
            {menuItems.map((item) => (
              <span
                key={item}
                className="cursor-pointer hover:text-white transition"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
