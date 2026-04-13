import { Link } from "react-router";
import { Film, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-950 border-t border-red-900/30 pt-16 pb-8 text-gray-400 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div className="flex flex-col space-y-4">
                        <Link to="/" className="flex items-center text-3xl font-black tracking-tighter text-red-600 uppercase group">
                            <Film className="w-8 h-8 mr-2 drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]" />
                            CINEFLIX
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-500">
                            Experience the magic of cinema with state-of-the-art visual and audio technology. 
                            Your ultimate destination for blockbuster movies, premium seating, and unforgettable entertainment.
                        </p>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <h3 className="footer-info">
                            Customer Support
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start">
                                <Phone className="footer-items" />
                                <div>
                                    <span className="footer-support">Hotline (24/7)</span>
                                    <a href="tel:19006868" className="text-gray-300 hover:text-white font-medium transition-colors">1900 6868</a>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <Mail className="footer-items" />
                                <div>
                                    <span className="footer-support">Email</span>
                                    <a href="mailto:cineflixsupport@gmail.com" className="text-gray-300 hover:text-white transition-colors">support@cineflix.com</a>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <MapPin className="footer-items mt-0.5" />
                                <span className="text-gray-300">
                                    100 Ve Ho,<br />
                                    Tay Ho Ward, Ha Noi City
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <h3 className="footer-info">
                            Cinema Rules
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="flex items-center">
                                <span className="footer-rule"></span>
                                No outside food or drinks allowed.
                            </li>
                            <li className="flex items-center">
                                <span className="footer-rule"></span>
                                Please silence your mobile devices.
                            </li>
                            <li className="flex items-center">
                                <span className="footer-rule"></span>
                                Recording inside the theater is strictly prohibited.
                            </li>
                            <li className="flex items-center">
                                <span className="footer-rule"></span>
                                Children under 13 must be accompanied by an adult.
                            </li>
                            <li className="flex items-center">
                                <span className="footer-rule"></span>
                                Tickets are non-refundable 30 minutes before showtime.
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <h3 className="footer-info">
                            Legal & Policies
                        </h3>
                        <ul className="space-y-2 text-sm flex flex-col">
                            <Link to="/default/terms" className="footer-policies">Terms of Service</Link>
                            <Link to="/default/privacy" className="footer-policies">Privacy Policy</Link>
                            <Link to="/default/ticketing-policy" className="footer-policies">Ticketing Policy</Link>
                            <Link to="/default/member-benefits" className="footer-policies">Membership Benefits</Link>
                            <Link to="/default/faq" className="footer-policies">Frequently Asked Questions</Link>
                        </ul>
                    </div>

                </div>
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                    <p>&copy; {currentYear} CINEFLIX Entertainment. All rights reserved.</p>
                </div>

            </div>
        </footer>
    );
}