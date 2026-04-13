import { LockKeyhole, CalendarClock } from "lucide-react";
import Header from "@/components/Header"; 
import Footer from "@/components/Footer"; 

export default function PrivacyPolicy() {
    const lastUpdated = "April 15, 2026";

    return (
        <div className="flex flex-col min-h-screen bg-gray-950">
            <Header />
            <main className="flex-1 text-gray-300 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 border-b border-gray-800 pb-8">
                        <div className="flex items-center justify-center mb-4">
                            <LockKeyhole className="w-12 h-12 text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-white text-center tracking-tighter uppercase mb-4">
                            Privacy Policy
                        </h1>
                        <div className="flex items-center justify-center text-sm text-gray-500">
                            <CalendarClock className="w-4 h-4 mr-2" />
                            Last Updated: {lastUpdated}
                        </div>
                    </div>
                    <div className="space-y-10 text-base md:text-lg leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                <span className="w-2 h-6 bg-red-600 mr-3 rounded-full"></span>
                                1. Information We Collect
                            </h2>
                            <p className="mb-4">
                                At CINEFLIX, we believe in being transparent about the data we collect to provide you with a seamless cinematic experience. We collect the following types of information:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                <li><strong>Account Information:</strong> Your name, email address, and password when you register.</li>
                                <li><strong>Transaction Data:</strong> Booking history, ticket purchases, and snack orders. (Note: Payment details are securely processed by our third-party providers; we do not store full credit card numbers).</li>
                                <li><strong>Usage Data:</strong> Information about how you navigate our website, including device type and IP address.</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                <span className="w-2 h-6 bg-red-600 mr-3 rounded-full"></span>
                                2. How We Use Your Information
                            </h2>
                            <p className="mb-4">
                                The information we collect is strictly used to improve your experience and manage our core business operations:
                            </p>
                            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                                <ul className="list-none space-y-3 text-gray-400">
                                    <li className="flex items-start">
                                        <span className="text-red-500 font-bold mr-2">✓</span>
                                        Processing your ticket bookings and snack purchases.
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 font-bold mr-2">✓</span>
                                        Sending booking confirmations, e-tickets, and password reset OTPs.
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 font-bold mr-2">✓</span>
                                        Providing customer support and responding to your inquiries.
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 font-bold mr-2">✓</span>
                                        Sending promotional offers (only if you have opted in to receive them).
                                    </li>
                                </ul>
                            </div>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                <span className="w-2 h-6 bg-red-600 mr-3 rounded-full"></span>
                                3. Information Sharing
                            </h2>
                            <p className="mb-4">
                                <strong>We do not sell your personal data.</strong> We only share your information with trusted third parties under the following circumstances:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                <li><strong>Service Providers:</strong> Payment gateways and email delivery services required to complete your transactions.</li>
                                <li><strong>Legal Compliance:</strong> When required by law, subpoena, or other legal processes to protect the rights and safety of CINEFLIX, our users, or the public.</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                <span className="w-2 h-6 bg-red-600 mr-3 rounded-full"></span>
                                4. Data Security
                            </h2>
                            <p className="mb-4">
                                We implement industry-standard security measures, including SSL encryption and secure database architecture, to protect your personal information from unauthorized access, alteration, or destruction. However, no method of transmission over the Internet is 100% secure.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                <span className="w-2 h-6 bg-red-600 mr-3 rounded-full"></span>
                                5. Your Rights and Choices
                            </h2>
                            <p className="mb-4">
                                You have full control over your personal data. At any time, you may:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                <li>Access and update your profile information via the user dashboard.</li>
                                <li>Request a copy of the personal data we hold about you.</li>
                                <li>Request the deletion of your account and associated personal data by contacting our support team.</li>
                            </ul>
                        </section>

                    </div>
                    <div className="mt-16 pt-8 border-t border-gray-800 text-center">
                        <p className="text-gray-500 mb-2">Have concerns about your privacy?</p>
                        <p className="text-white font-medium">Contact our Data Protection Officer at <a href="mailto:privacy@cineflix.com" className="text-red-500 hover:text-red-400 underline transition-colors">privacy@cineflix.com</a></p>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}