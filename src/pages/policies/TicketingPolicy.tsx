import { Ticket, CalendarClock } from "lucide-react";
import Header from "@/components/Header"; 
import Footer from "@/components/Footer"; 

export default function TicketingPolicy() {
    const lastUpdated = "April 15, 2026";

    return (
        <div className="flex flex-col min-h-screen bg-gray-950">
            <Header />
            <main className="flex-1 text-gray-300 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 border-b border-gray-800 pb-8">
                        <div className="flex items-center justify-center mb-4">
                            <Ticket className="w-12 h-12 text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-white text-center tracking-tighter uppercase mb-4">
                            Ticketing Policy
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
                                1. Purchasing & Pricing
                            </h2>
                            <p className="mb-4">
                                Tickets can be purchased online through our website, mobile app, or physically at the cinema box office.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                <li>All prices are listed in Vietnamese Dong (VND) and include Value Added Tax (VAT).</li>
                                <li>Ticket prices vary based on seat type (Standard, VIP, Couple), showtime (matinee vs. evening), and format (2D, 3D, IMAX).</li>
                                <li>A standard booking fee may apply to online purchases. This fee is non-refundable.</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                <span className="w-2 h-6 bg-red-600 mr-3 rounded-full"></span>
                                2. Age Restrictions & Ratings
                            </h2>
                            <p className="mb-4">
                                CINEFLIX strictly enforces movie age classifications set by the national censorship board. 
                            </p>
                            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                                <ul className="list-none space-y-3 text-gray-400">
                                    <li className="flex items-start">
                                        <span className="text-red-500 font-bold mr-2">!</span>
                                        <strong>P:</strong> General audiences. Suitable for all ages.
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 font-bold mr-2">!</span>
                                        <strong>K:</strong> Audiences under 13 must be accompanied by a parent or guardian.
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 font-bold mr-2">!</span>
                                        <strong>T13/T16/T18:</strong> Strictly limited to viewers aged 13, 16, or 18 and above, respectively.
                                    </li>
                                </ul>
                                <p className="mt-4 text-sm text-gray-500 italic">
                                    * Cinema staff reserve the right to request a valid photo ID (National ID, Student ID, or Passport) before granting entry. Tickets purchased for viewers who do not meet the age requirement will not be refunded.
                                </p>
                            </div>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                <span className="w-2 h-6 bg-red-600 mr-3 rounded-full"></span>
                                3. E-Tickets & Entry
                            </h2>
                            <p className="mb-4">
                                To reduce paper waste, CINEFLIX uses a fully digital e-ticketing system.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                <li>Upon successful payment, an e-ticket containing a QR code will be sent to your email and stored in your profile dashboard.</li>
                                <li>You do not need to print your ticket. Simply present the QR code on your mobile device to the usher at the theater entrance.</li>
                                <li>Please ensure your device has enough battery and screen brightness to be scanned.</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                <span className="w-2 h-6 bg-red-600 mr-3 rounded-full"></span>
                                4. Refunds & Exchanges
                            </h2>
                            <p className="mb-4">
                                We understand that plans change. Our refund and exchange policies are designed to be as fair as possible while managing theater capacity.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                <li><strong>Cancellations:</strong> Tickets can be cancelled for a full refund (excluding booking fees) up to <strong>1 hour</strong> before the scheduled showtime.</li>
                                <li><strong>No-Shows:</strong> If you fail to arrive for your showtime or attempt to cancel within 1 hour of the movie starting, no refund or exchange will be provided.</li>
                                <li><strong>CINEFLIX Cancellations:</strong> In the rare event of a technical failure or theater evacuation, affected guests will receive a full refund or complimentary vouchers for a future visit.</li>
                            </ul>
                        </section>

                    </div>
                    <div className="mt-16 pt-8 border-t border-gray-800 text-center">
                        <p className="text-gray-500 mb-2">Need help with a specific booking?</p>
                        <p className="text-white font-medium">Contact our ticketing support at <a href="mailto:tickets@cineflix.com" className="text-red-500 hover:text-red-400 underline transition-colors">tickets@cineflix.com</a></p>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}