import { ShieldAlert, CalendarClock } from "lucide-react";
import Header from "@/components/Header"; // Adjust import path if needed
import Footer from "@/components/Footer"; // Adjust import path if needed

export default function TermsOfService() {
    const lastUpdated = "April 15, 2026";

    return (
        <div className="flex flex-col min-h-screen bg-gray-950">
            <Header />
            <main className="flex-1 text-gray-300 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 border-b border-gray-800 pb-8">
                        <div className="flex items-center justify-center mb-4">
                            <ShieldAlert className="w-12 h-12 text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-white text-center tracking-tighter uppercase mb-4">
                            Terms of Service
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
                                1. Acceptance of Terms
                            </h2>
                            <p className="mb-4">
                                By accessing, registering for, or using the CINEFLIX platform (the "Service"), you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, you may not access the Service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                <span className="w-2 h-6 bg-red-600 mr-3 rounded-full"></span>
                                2. User Accounts
                            </h2>
                            <p className="mb-4">
                                To purchase tickets and snacks, you may be required to register for an account. You agree that:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                <li>You will provide accurate, current, and complete information during registration.</li>
                                <li>You are solely responsible for maintaining the confidentiality of your account and password.</li>
                                <li>You will notify us immediately of any unauthorized use of your account.</li>
                                <li>CINEFLIX reserves the right to suspend or terminate your account if any information provided proves to be false or deceptive.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                <span className="w-2 h-6 bg-red-600 mr-3 rounded-full"></span>
                                3. Ticketing and Purchases
                            </h2>
                            <p className="mb-4">
                                All ticket and concession sales are final. Please review your showtime, cinema location, and seat selection carefully before confirming your purchase.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                <li><strong>Pricing:</strong> All prices are listed in VND and include applicable taxes unless stated otherwise.</li>
                                <li><strong>Refunds:</strong> Tickets are strictly non-refundable within 30 minutes of the scheduled showtime.</li>
                                <li><strong>Seat Allocation:</strong> CINEFLIX reserves the right to alter seat allocations in the event of technical issues or theater maintenance.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                <span className="w-2 h-6 bg-red-600 mr-3 rounded-full"></span>
                                4. Cinema Rules of Conduct
                            </h2>
                            <p className="mb-4">
                                To ensure a premium viewing experience for all guests, we strictly enforce the following rules within our physical cinema locations:
                            </p>
                            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                                <ul className="list-none space-y-3 text-gray-400">
                                    <li className="flex items-start">
                                        <span className="text-red-500 font-bold mr-2">✗</span>
                                        No outside food or beverages are permitted inside the theaters.
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 font-bold mr-2">✗</span>
                                        The use of mobile phones, tablets, or any light-emitting devices is prohibited during the film.
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 font-bold mr-2">✗</span>
                                        Recording equipment (video or audio) is strictly prohibited. Violators will be reported to local authorities for piracy.
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 font-bold mr-2">✗</span>
                                        Management reserves the right to refuse admission or eject any patron whose conduct is deemed disruptive without a refund.
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                <span className="w-2 h-6 bg-red-600 mr-3 rounded-full"></span>
                                5. Limitation of Liability
                            </h2>
                            <p className="mb-4">
                                CINEFLIX shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                            </p>
                        </section>

                    </div>
                    <div className="mt-16 pt-8 border-t border-gray-800 text-center">
                        <p className="text-gray-500 mb-2">Questions about the Terms of Service?</p>
                        <p className="text-white font-medium">Contact us at <a href="mailto:legal@cineflix.com" className="text-red-500 hover:text-red-400 underline transition-colors">legal@cineflix.com</a></p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}