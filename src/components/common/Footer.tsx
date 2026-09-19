import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, Camera, Share2, Video } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto px-4 xl:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Company Info */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-white text-primary p-2 rounded-xl font-bold text-2xl">IP</div>
            <div className="flex flex-col leading-tight">
              <span className="font-heading font-bold text-xl tracking-tight">IGNOU POWER</span>
              <span className="text-2xs text-accent font-bold tracking-widest uppercase">Student Support</span>
            </div>
          </div>
          <p className="text-white/80 leading-relaxed text-sm">
            Leading platform for IGNOU students providing high-quality study materials, solved assignments, and comprehensive project support for all courses.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cta hover:text-white transition-all duration-300"><MessageCircle size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cta hover:text-white transition-all duration-300"><Camera size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cta hover:text-white transition-all duration-300"><Share2 size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cta hover:text-white transition-all duration-300"><Video size={18} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-heading font-bold text-lg mb-8 border-l-4 border-accent pl-4 uppercase tracking-wider text-white">Quick Links</h3>
          <ul className="flex flex-col gap-4 text-white/75 text-sm">
            <li><Link href="/assignments" className="hover:text-accent transition-colors">Solved Assignments</Link></li>
            <li><Link href="/projects" className="hover:text-accent transition-colors">Project Work Help</Link></li>
            <li><Link href="/admission" className="hover:text-accent transition-colors">Admission Guidance</Link></li>
            <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            <li><Link href="/previous-papers" className="hover:text-accent transition-colors">Previous Year Papers</Link></li>
            <li><Link href="/practical-files" className="hover:text-accent transition-colors">Practical Files</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-heading font-bold text-lg mb-8 border-l-4 border-accent pl-4 uppercase tracking-wider text-white">Support</h3>
          <ul className="flex flex-col gap-4 text-white/75 text-sm">
            <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-accent transition-colors">FAQ Section</Link></li>
            <li><Link href="/terms" className="hover:text-accent transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
            <li><Link href="/refund" className="hover:text-accent transition-colors">Refund Policy</Link></li>
            <li><Link href="/dashboard" className="hover:text-accent transition-colors">Student Dashboard</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-heading font-bold text-lg mb-8 border-l-4 border-accent pl-4 uppercase tracking-wider text-white">Contact Info</h3>
          <ul className="flex flex-col gap-6 text-white/75 text-sm">
            <li className="flex gap-4">
              <MapPin className="text-accent shrink-0" size={20} />
              <span>Plot No. 45, Second Floor, Near IGNOU Road, Saket, New Delhi - 110017</span>
            </li>
            <li className="flex gap-4">
              <Phone className="text-accent shrink-0" size={20} />
              <span>+91 98765 43210 / +91 88776 65544</span>
            </li>
            <li className="flex gap-4">
              <Mail className="text-accent shrink-0" size={20} />
              <span>support@ignouhelping.com<br />help@ignouhelping.com</span>
            </li>
          </ul>
        </div>
      </div>

      <hr className="border-white/10 my-12 max-w-7xl mx-auto" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-white/60 text-sm">
        <p>© 2026 IGNOU Power Platform. All Rights Reserved.</p>
        <div className="flex items-center gap-2">
          <span>Developed with ❤️ for IGNOU Students</span>
        </div>
        <div className="flex gap-6">
          <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-6 opacity-80 hover:opacity-100 transition-all cursor-pointer" />
          <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-6 opacity-80 hover:opacity-100 transition-all cursor-pointer" />
          <img src="https://img.icons8.com/color/48/000000/upi.png" alt="UPI" className="h-6 opacity-80 hover:opacity-100 transition-all cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
