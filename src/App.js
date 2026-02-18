import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

const testimonials = [
	{
		name: "Amit Sharma",
		role: "Insurance Consultant",
		image: "https://randomuser.me/api/portraits/men/32.jpg",
		text: "We received 120+ interested customers within 2 days. Amazing service and very professional execution.",
	},
	{
		name: "Priya Verma",
		role: "Real Estate Advisor",
		image: "https://randomuser.me/api/portraits/women/44.jpg",
		text: "Saved our sales team’s time completely. We only contacted serious buyers. Highly recommended.",
	},
	{
		name: "Rahul Mehta",
		role: "Marketing Agency Owner",
		image: "https://randomuser.me/api/portraits/men/62.jpg",
		text: "Best lead generation service we have used so far. ROI was excellent.",
	},
];

function App() {
	const [index, setIndex] = useState(0);
	const [showPopup, setShowPopup] = useState(false);

	useEffect(() => {
		const timer = setInterval(() => {
			nextSlide();
		}, 5000);

		return () => clearInterval(timer);
	}, [index]);

	useEffect(() => {
		const popupTimer = setTimeout(() => {
			setShowPopup(true);
		}, 10000);

		return () => clearTimeout(popupTimer);
	}, []);

	const nextSlide = () => {
		setIndex((prev) => (prev + 1) % testimonials.length);
	};

	const prevSlide = () => {
		setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
	};

	function handleSubmit(event) {
		event.preventDefault();

		const formData = new FormData(event.target);

		const whatsappMessage =
			`Name: ${formData.get("name")}%0A` +
			`Business: ${formData.get("business")}%0A` +
			`Email: ${formData.get("email")}%0A` +
			`Phone: ${formData.get("phone")}%0A` +
			`Requirement: ${formData.get("requirement")}`;

		window.open(
			`https://wa.me/918999472923?text=${whatsappMessage}`,
			"_blank"
		);

		alert("Details sent to WhatsApp successfully!");
		window.location.reload();
	}

	// Add Contact Us form submission handler
	function handleContactSubmit(event) {
		event.preventDefault();

		const formData = new FormData(event.target);
		const contactDetails = {
			name: formData.get("name"),
			email: formData.get("email"),
			type: formData.get("type"), // Company or Individual
			message: formData.get("message"),
		};

		// Send details to WhatsApp
		const whatsappMessage = `Name: ${contactDetails.name}%0AEmail: ${contactDetails.email}%0AType: ${contactDetails.type}%0AMessage: ${contactDetails.message}`;
		window.open(`https://wa.me/918999472923?text=${whatsappMessage}`, "_blank");

		// Show a success message
		alert("Contact details sent to WhatsApp successfully!");
	}

	// Add scroll-to-form functionality
	function scrollToContactForm() {
		const contactSection = document.querySelector(".contact");
		if (contactSection) {
			contactSection.scrollIntoView({ behavior: "smooth" });
		}
	}

	// Handle Request Demo button click
	function handleRequestDemo() {
		const demoMessage = "I want to see the demo of Leads Gen Pro";
		window.open(`https://wa.me/918999472923?text=${encodeURIComponent(demoMessage)}`, "_blank");
	}

	return (
		<div className="app">
			{/* Background Blobs */}
			<div className="blob blob1"></div>
			<div className="blob blob2"></div>
			<div className="blob blob3"></div>

			{/* Navbar */}
			<nav className="navbar">
				<h2 className="logo">LeadGen Pro</h2>
				<button className="navBtn" onClick={handleRequestDemo}>Request Free Demo</button>
			</nav>

			{/* Hero */}
			<section className="hero">
				<motion.div
					className="heroContent"
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<h1>
						We Don’t Sell Software — <br />
						We Deliver Interested Customers
					</h1>

					<p>
						Share your customer data and receive ready-to-convert leads
						without hiring a sales team.
					</p>

					<div className="heroButtons">
						<button className="primary" onClick={handleRequestDemo}>Request Demo</button>
						<button className="secondary" onClick={scrollToContactForm}>Contact Us</button>
					</div>
				</motion.div>
			</section>

			{/* How It Works */}
			<section className="section">
				<h2>How Our System Works</h2>

				<div className="grid">
					<Card title="Share Your Data" text="Provide contacts in Excel format." />
					<Card title="We Run Campaign" text="We execute campaigns securely from our system." />
					<Card title="Receive Interested Leads" text="Get only serious customers ready to convert." />
				</div>
			</section>

			{/* Testimonials */}
			<section className="section testimonials">
				<h2>What Our Clients Say</h2>

				<div className="carousel">
					<button className="arrow left" onClick={prevSlide}>‹</button>

					<AnimatePresence mode="wait">
						<motion.div
							key={index}
							className="testimonialCard"
							initial={{ opacity: 0, x: 60 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -60 }}
							transition={{ duration: 0.5 }}
						>
							<img src={testimonials[index].image} alt="client" className="avatar" />

							<p>"{testimonials[index].text}"</p>

							<h4>{testimonials[index].name}</h4>
							<span>{testimonials[index].role}</span>
						</motion.div>
					</AnimatePresence>

					<button className="arrow right" onClick={nextSlide}>›</button>
				</div>

				<div className="dots">
					{testimonials.map((_, i) => (
						<span
							key={i}
							className={i === index ? "dot active" : "dot"}
							onClick={() => setIndex(i)}
						/>
					))}
				</div>
			</section>

			{/* Demo Section */}
			<section className="demo">
				<h2>See How Our System Works</h2>
				<p>
					Book a free demo to understand how we contact customers
					and deliver qualified leads.
				</p>
				<button className="primary big">Book Free Demo</button>
			</section>

			{/* Contact */}
			<section className="section contact">
				<h2>Contact Us</h2>

				<form className="form" onSubmit={handleContactSubmit}>
					<input name="name" placeholder="Your Name" required />
					<input name="email" placeholder="Your Email" required />
					<select name="type" required>
						<option value="Company">Company</option>
						<option value="Individual">Individual</option>
					</select>
					<textarea name="message" placeholder="Your Message" required />

					<button className="primary" type="submit">Submit</button>
				</form>
			</section>

			<footer className="footer">
				© 2026 LeadGen Pro. All rights reserved.
			</footer>

			{/* Floating WhatsApp Button */}
			<a
				href="https://wa.me/918999472923?text=Hi%20I%20am%20interested%20in%20your%20lead%20generation%20service"
				className="whatsappFloat"
				target="_blank"
				rel="noopener noreferrer"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28" fill="white">
					<path d="M19.11 17.57c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.13-1.13-.42-2.15-1.35-.79-.7-1.33-1.56-1.49-1.82-.16-.27-.02-.41.12-.54.12-.12.27-.32.41-.48.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.13-.61-1.47-.84-2.01-.22-.53-.44-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3 0 1.36.98 2.67 1.12 2.86.13.18 1.93 2.94 4.67 4.12.65.28 1.16.45 1.55.58.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.31z" />
					<path d="M16 3C9.38 3 4 8.38 4 15c0 2.64.86 5.08 2.32 7.06L4 29l7.12-2.27C13.06 27.23 14.5 27.5 16 27.5c6.62 0 12-5.38 12-12S22.62 3 16 3zm0 22c-1.36 0-2.69-.24-3.94-.7l-.28-.1-4.23 1.35 1.38-4.12-.18-.3A9.94 9.94 0 0 1 6 15c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10z" />
				</svg>
			</a>

			{/* Auto WhatsApp Popup */}
			{showPopup && (
				<div className="whatsappPopup">
					<div className="popupContent">
						<div className="popupHeader">
							<span>Chat with us on WhatsApp</span>
							<button onClick={() => setShowPopup(false)}>✕</button>
						</div>

						<p>Hi 👋 Interested in getting more customers for your business?</p>

						<a
							href="https://wa.me/918999472923?text=Hi%20I%20am%20interested%20in%20your%20lead%20generation%20service"
							target="_blank"
							rel="noopener noreferrer"
							className="popupBtn"
						>
							Start Chat
						</a>
					</div>
				</div>
			)}
		</div>
	);
}

function Card({ title, text }) {
	return (
		<motion.div className="card" whileHover={{ scale: 1.05 }}>
			<h3>{title}</h3>
			<p>{text}</p>
		</motion.div>
	);
}

export default App;
