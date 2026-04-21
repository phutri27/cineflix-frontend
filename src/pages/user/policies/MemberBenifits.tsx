import { Crown, Star, Sparkles, Gift, Zap, Gem } from "lucide-react";
import Header from "@/components/Header"; 
import Footer from "@/components/Footer"; 

export default function MemberBenefits() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-950">
            <Header />
            <main className="flex-1 text-gray-300 py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 border-b border-gray-800 pb-8">
                        <div className="flex items-center justify-center mb-4">
                            <Crown className="w-12 h-12 text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-white text-center tracking-tighter uppercase mb-4">
                            CINEFLIX Elite Rewards
                        </h1>
                        <p className="text-center text-gray-400 max-w-2xl mx-auto">
                            Join our loyalty program and turn every movie night into a rewarding experience. 
                            Earn points, unlock exclusive perks, and experience cinema like a true VIP.
                        </p>
                    </div>
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <span className="w-2 h-6 bg-red-600 mr-3 rounded-full"></span>
                            How It Works
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 text-center">
                                <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Star className="w-6 h-6 text-red-500" />
                                </div>
                                <h3 className="text-white font-bold mb-2">1. Register</h3>
                                <p className="text-sm text-gray-400">Create a free CINEFLIX account to instantly become a Copper member.</p>
                            </div>
                            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 text-center">
                                <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Zap className="w-6 h-6 text-amber-500" />
                                </div>
                                <h3 className="text-white font-bold mb-2">2. Earn Points</h3>
                                <p className="text-sm text-gray-400">Earn reward points for every VND spent on tickets and concessions.</p>
                            </div>
                            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 text-center">
                                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Gift className="w-6 h-6 text-purple-500" />
                                </div>
                                <h3 className="text-white font-bold mb-2">3. Redeem</h3>
                                <p className="text-sm text-gray-400">Use your points for free movie tickets, popcorn combos, and exclusive merchandise.</p>
                            </div>
                        </div>
                    </section>
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <span className="w-2 h-6 bg-red-600 mr-3 rounded-full"></span>
                            Membership Tiers
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-orange-900/20 to-gray-900 border border-orange-900/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                                <div className="md:w-1/3 text-center md:text-left z-10">
                                    <h3 className="text-3xl font-black text-orange-400 uppercase tracking-widest mb-2">Copper</h3>
                                    <p className="text-gray-400 text-sm">Default Tier</p>
                                    <p className="text-orange-300 font-medium mt-4">Entry Level Access</p>
                                </div>
                                <div className="md:w-2/3 z-10">
                                    <ul className="space-y-3">
                                        <li className="flex items-center text-gray-300">
                                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                                            Earn 5% points on all ticket purchases.
                                        </li>
                                        <li className="flex items-center text-gray-300">
                                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                                            Access to digital e-tickets and booking history.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-gradient-to-r from-gray-700/20 to-gray-900 border border-gray-600/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                                <div className="md:w-1/3 text-center md:text-left z-10">
                                    <h3 className="text-3xl font-black text-gray-300 uppercase tracking-widest mb-2">Silver</h3>
                                    <p className="text-gray-400 text-sm">Spend 5,000,000 VND</p>
                                    <p className="text-gray-300 font-medium mt-4">Enhanced Rewards</p>
                                </div>
                                <div className="md:w-2/3 z-10">
                                    <ul className="space-y-3">
                                        <li className="flex items-center text-gray-300">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                                            Earn 7% points on all purchases (Tickets & Snacks).
                                        </li>
                                        <li className="flex items-center text-gray-300">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                                            1 Free 2D ticket per year.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-gradient-to-r from-amber-600/20 to-gray-900 border border-amber-500/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                                <Sparkles className="absolute right-[-20px] top-[-20px] w-32 h-32 text-amber-500/10" />
                                <div className="md:w-1/3 text-center md:text-left z-10">
                                    <h3 className="text-3xl font-black text-amber-500 uppercase tracking-widest mb-2">Gold</h3>
                                    <p className="text-gray-400 text-sm">Spend 10,000,000 VND</p>
                                    <p className="text-amber-400 font-medium mt-4">The Ultimate VIP Experience</p>
                                </div>
                                <div className="md:w-2/3 z-10">
                                    <ul className="space-y-3">
                                        <li className="flex items-center text-gray-300">
                                            <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                                            Earn a massive 10% points on all purchases.
                                        </li>
                                        <li className="flex items-center text-gray-300">
                                            <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                                            2 Free 2D/3D tickets per year.
                                        </li>
                                        <li className="flex items-center text-gray-300">
                                            <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                                            Exclusive invitations to VIP Premiere Screenings.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-gradient-to-r from-cyan-900/20 to-gray-900 border border-cyan-700/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.15)]">
                                <Gem className="absolute right-[-20px] top-[-20px] w-32 h-32 text-cyan-500/10" />
                                <div className="md:w-1/3 text-center md:text-left z-10">
                                    <h3 className="text-3xl font-black text-cyan-400 uppercase tracking-widest mb-2">Diamond</h3>
                                    <p className="text-gray-400 text-sm">Spend 20,000,000 VND</p>
                                    <p className="text-cyan-400 font-medium mt-4">The Pinnacle of Cinema Luxury</p>
                                </div>
                                <div className="md:w-2/3 z-10">
                                    <ul className="space-y-3">
                                        <li className="flex items-center text-gray-300">
                                            <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                                            Earn 15% points on all purchases (Tickets & Concessions).
                                        </li>
                                        <li className="flex items-center text-gray-300">
                                            <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                                            4 Free 2D/3D tickets per year.
                                        </li>
                                        <li className="flex items-center text-gray-300">
                                            <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                                            Automatic upgrade to VIP Seating (subject to availability).
                                        </li>
                                        <li className="flex items-center text-gray-300">
                                            <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                                            20% discount on all Concessions purchases.
                                        </li>
                                        <li className="flex items-center text-gray-300">
                                            <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                                            Priority lane at Cinema Box Office.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </main>
            <Footer />
        </div>
    );
}