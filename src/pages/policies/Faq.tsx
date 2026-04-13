import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import Header from "@/components/Header"; 
import Footer from "@/components/Footer"; 

const faqs = [
    {
        question: "How do I book a ticket online?",
        answer: "Simply browse our 'Now Showing' or 'Coming Soon' movies, select your preferred cinema and showtime, pick your seats from the interactive map, and proceed to checkout. Once payment is successful, your e-ticket will be emailed to you and saved in your profile."
    },
    {
        question: "Do I need to print my e-ticket?",
        answer: "No, CINEFLIX is completely paperless! Just open the e-ticket QR code from your email or your account dashboard and scan it at the theater entrance."
    },
    {
        question: "Can I cancel or refund my ticket?",
        answer: "Yes, you can cancel your tickets for a full refund (excluding the standard online booking fee) up to 1 hour before your scheduled showtime. Cancellations within 1 hour of the showtime are not permitted."
    },
    {
        question: "Can I bring my own food and drinks?",
        answer: "No outside food or beverages are allowed inside CINEFLIX theaters. We offer a wide variety of fresh popcorn, hot snacks, and cold beverages at our concession stands."
    },
    {
        question: "How does the CINEFLIX membership work?",
        answer: "Our Elite Rewards program has three tiers: Copper, Silver, and Gold. You automatically become a Copper member upon registering. You earn points for every VND spent, which can be redeemed for free tickets and snacks. Reach higher tiers by meeting annual spending goals to unlock bigger point multipliers and VIP perks."
    },
    {
        question: "What do the age rating symbols mean?",
        answer: "We strictly follow national censorship boards. P means suitable for all ages. K means under 13 must be with an adult. T13, T16, and T18 mean strictly limited to viewers aged 13, 16, or 18 and above. Valid photo ID may be required."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0); 

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-950">
            <Header />
            <main className="flex-1 text-gray-300 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 border-b border-gray-800 pb-8">
                        <div className="flex items-center justify-center mb-4">
                            <HelpCircle className="w-12 h-12 text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-white text-center tracking-tighter uppercase mb-4">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-center text-gray-400 max-w-2xl mx-auto">
                            Need help? We've got you covered. Find answers to our most common questions below.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div 
                                    key={index} 
                                    className={`border rounded-lg transition-all duration-300 ${
                                        isOpen ? "bg-gray-900 border-red-600/50" : "bg-gray-900/50 border-gray-800 hover:border-gray-700"
                                    }`}
                                >
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                                        aria-expanded={isOpen}
                                    >
                                        <span className={`font-bold text-lg transition-colors ${isOpen ? "text-white" : "text-gray-300"}`}>
                                            {faq.question}
                                        </span>
                                        <ChevronDown 
                                            className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                                                isOpen ? "text-red-500 rotate-180" : "text-gray-500"
                                            }`} 
                                        />
                                    </button>
                                    <div 
                                        className={`grid transition-all duration-300 ease-in-out ${
                                            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="p-5 pt-0 text-gray-400 leading-relaxed border-t border-gray-800/50 mt-2">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-16 pt-8 border-t border-gray-800 text-center">
                        <p className="text-gray-500 mb-2">Still can't find what you're looking for?</p>
                        <p className="text-white font-medium">Contact our support team at <a href="mailto:support@cineflix.com" className="text-red-500 hover:text-red-400 underline transition-colors">support@cineflix.com</a></p>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}