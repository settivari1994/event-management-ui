import { Link } from "react-router-dom";

export default function EventGuideLandingPage() {
  const services = [
    "Event Management",
    "Sports Management",
    "Fan Engagement",
    "Ticketing & Registration",
    "College Fest Management",
    "Brand Promotions",
    "Production & Infrastructure",
    "Technology Solutions",
  ];

  const upcomingEvents = [
    {
      title: "IPL Fan Fest 2026",
      location: "Bangalore",
      date: "June 12, 2026",
    },
    {
      title: "College Tech Carnival",
      location: "Hyderabad",
      date: "July 04, 2026",
    },
    {
      title: "Corporate Leadership Summit",
      location: "Mumbai",
      date: "August 20, 2026",
    },
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      company: "TechNova Pvt Ltd",
      review:
        "EventGuide handled our annual conference flawlessly.",
    },
    {
      name: "Sneha Reddy",
      company: "Elite Sports Club",
      review:
        "Their sports event management team is highly professional.",
    },
    {
      name: "Arjun Mehta",
      company: "Campus Beats",
      review:
        "The college fest was a massive success thanks to EventGuide.",
    },
  ];

  return (
    <div className="bg-white text-gray-800 min-h-screen scroll-smooth">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* LOGO */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-md">
                <span className="text-white text-xl font-bold">
                  EG
                </span>
              </div>

              <div>
                <h1 className="text-2xl font-bold text-blue-600 leading-none">
                  EventGuide
                </h1>

                <p className="text-xs text-gray-500 mt-1">
                  Pvt Ltd
                </p>
              </div>
            </div>

            {/* NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
              <a href="#home" className="hover:text-blue-600">
                Home
              </a>

              <a href="#about" className="hover:text-blue-600">
                About
              </a>

              <a href="#services" className="hover:text-blue-600">
                Services
              </a>

              <a href="#portfolio" className="hover:text-blue-600">
                Portfolio
              </a>

              <a href="#contact" className="hover:text-blue-600">
                Contact
              </a>
            </nav>

            {/* HEADER BUTTONS */}
            <div className="hidden md:flex items-center gap-3">
            <Link  to="/login" className="px-4 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 transition">
             Login
             </Link>
              <a
                href="#contact"
                className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Book Consultation
              </a>
            </div>

          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        id="home"
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Creating Unforgettable Events & Experiences
              </h2>

              <p className="text-lg text-blue-100 mb-8">
                We specialize in event management, sports management,
                fan engagement, ticketing solutions, and premium event
                production across India.
              </p>

              <div className="flex flex-wrap gap-4">

                <a
                  href="#contact"
                  className="bg-white text-blue-600 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition"
                >
                  Contact Us
                </a>

                <a
                  href="#services"
                  className="border border-white px-6 py-3 rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transition"
                >
                  Explore Services
                </a>

              </div>
            </div>

            {/* STATS */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl">

              <div className="grid grid-cols-2 gap-6">

                <div className="bg-white/10 rounded-2xl p-6 text-center">
                  <h3 className="text-3xl font-bold">
                    500+
                  </h3>

                  <p className="text-sm mt-2">
                    Events Managed
                  </p>
                </div>

                <div className="bg-white/10 rounded-2xl p-6 text-center">
                  <h3 className="text-3xl font-bold">
                    1M+
                  </h3>

                  <p className="text-sm mt-2">
                    Tickets Processed
                  </p>
                </div>

                <div className="bg-white/10 rounded-2xl p-6 text-center">
                  <h3 className="text-3xl font-bold">
                    100+
                  </h3>

                  <p className="text-sm mt-2">
                    Corporate Clients
                  </p>
                </div>

                <div className="bg-white/10 rounded-2xl p-6 text-center">
                  <h3 className="text-3xl font-bold">
                    24/7
                  </h3>

                  <p className="text-sm mt-2">
                    Support Team
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <img
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop"
              alt="event"
              className="rounded-3xl shadow-lg w-full h-[400px] object-cover"
            />

            <div>
              <h2 className="text-4xl font-bold mb-6">
                About EventGuide
              </h2>

              <p className="text-gray-600 leading-8 mb-6">
                EventGuide Pvt Ltd is a leading event and sports
                management company delivering large-scale experiences
                with technology, creativity, and operational excellence.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">

                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">
                    Our Vision
                  </h3>

                  <p className="text-sm text-gray-600">
                    Deliver world-class experiences through innovation.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">
                    Our Mission
                  </h3>

                  <p className="text-sm text-gray-600">
                    Simplify event execution with premium solutions.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">
              Our Services
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              End-to-end event and engagement solutions tailored
              for modern businesses and audiences.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border rounded-3xl p-6 shadow-sm hover:shadow-xl transition duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl mb-4">
                  {index + 1}
                </div>

                <h3 className="font-semibold text-lg mb-3">
                  {service}
                </h3>

                <p className="text-sm text-gray-600 leading-6">
                  Professional solutions designed to ensure smooth execution.
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">
              Testimonials
            </h2>

            <p className="text-gray-600">
              What our clients say about our services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-sm"
              >
                <p className="text-gray-600 leading-7 mb-6">
                  “{testimonial.review}”
                </p>

                <div>
                  <h4 className="font-semibold text-lg">
                    {testimonial.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-12">

            <div>
              <h2 className="text-4xl font-bold mb-6">
                Contact Us
              </h2>

              <p className="text-gray-600 leading-8 mb-8">
                Ready to organize your next big event?
                Connect with our team today.
              </p>

              <div className="space-y-4 text-gray-700">
                <p>📍 Bangalore, India</p>
                <p>📞 +91 9876543210</p>
                <p>✉️ contact@eventguide.com</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 shadow-sm">

              <div className="space-y-5">

                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <textarea
                  rows="5"
                  placeholder="Your Message"
                  className="w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button className="w-full bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 transition">
                  Send Message
                </button>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-14">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                EventGuide
              </h3>

              <p className="text-sm leading-7 text-gray-400">
                Premium event management and technology solutions.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Quick Links
              </h4>

              <ul className="space-y-3 text-sm">
                <li>About Us</li>
                <li>Services</li>
                <li>Portfolio</li>
                <li>Contact</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Policies
              </h4>

              <ul className="space-y-3 text-sm">
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
                <li>Refund Policy</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Follow Us
              </h4>

              <div className="flex gap-4 text-sm">
                <span className="bg-gray-800 px-4 py-2 rounded-xl">
                  Facebook
                </span>

                <span className="bg-gray-800 px-4 py-2 rounded-xl">
                  Instagram
                </span>

                <span className="bg-gray-800 px-4 py-2 rounded-xl">
                  LinkedIn
                </span>
              </div>
            </div>

          </div>

          <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
            © 2026 EventGuide Pvt Ltd. All rights reserved.
          </div>

        </div>
      </footer>

    </div>
  );
}