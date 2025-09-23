// App.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
const sections = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "howItWorks", label: "How it Works" },
    { id: "security", label: "Security" },
    { id: "contact", label: "Contact" },
];

const LandingPage = () => {
    const handleScroll = (id) => {
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: "smooth" });
    };
    const navigate = useNavigate();
    return (
        <div className="bg-primary-background text-white min-h-screen">
            {/* Header */}
            <header className="fixed top-0 w-full  border-primary-bottom z-50 shadow-md">
                <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
                    <div className="text-xl font-bold">
                        Moiterworkz <span className="text-yellow-300 text-sm block">Digital Payments</span>
                    </div>
                    <nav className="flex space-x-6">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => handleScroll(section.id)}
                                className="hover:text-yellow-300 transition-colors"
                            >
                                {section.label}
                            </button>
                        ))}
                    </nav>
                    <div className="flex space-x-2">
                        <button className="border border-white px-4 py-1 rounded hover:bg-white hover:text-black transition">
                            Sign In
                        </button>
                        <button onClick={() => navigate("/Sign-Up")} className="bg-yellow-300 text-black px-4 py-1 rounded hover:opacity-90 transition">
                            Sign Up
                        </button>
                    </div>
                </div>
            </header>

            {/* Sections */}
            <main className="pt-24">
                {sections.map((section) => (
                    <section
                        key={section.id}
                        id={section.id}
                        className="h-screen flex items-center justify-center text-4xl font-bold"
                    >
                        {section.label} Section
                    </section>
                ))}
            </main>
        </div>
    );
};

export default LandingPage;
