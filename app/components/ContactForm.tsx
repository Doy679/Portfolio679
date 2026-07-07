'use client';
import React, { useState } from 'react';
import { sendEmail } from '../actions';
import { siteConfig } from '../config/site';
import { ContactFormData } from '../lib/validation';
import HackerText from './HackerText';
import { Icon } from '../lib/icons';

const ContactForm = () => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [isPending, setIsPending] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);
        setFieldErrors({});
        const formData = new FormData(e.currentTarget);
        try {
            const result = await sendEmail(formData);
            if (result.success) {
                setToastMessage('Message sent successfully!');
                setToastType('success');
                (e.target as HTMLFormElement).reset();
            } else {
                if (result.fieldErrors) {
                    setFieldErrors(result.fieldErrors);
                    const firstError = Object.values(result.fieldErrors)[0];
                    setToastMessage(`Validation Error: ${firstError}`);
                } else {
                    setToastMessage(result.error || 'Failed to send message.');
                }
                setToastType('error');
            }
            setShowToast(true);
            setTimeout(() => setShowToast(false), 5000);
        } catch (error: any) {
            setToastMessage(`Network error: ${error?.message || 'Please try again later.'}`);
            setToastType('error');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 5000);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <section id="contact" className="pt-10 pb-24 bg-base-200 relative z-30">
            <div className="container mx-auto px-6 md:px-10 lg:px-20 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-montserrat tracking-[0.2em] uppercase text-base-content">
                        <HackerText text="Get In Touch" />
                    </h2>
                    <div className="w-16 h-1 bg-primary/40 mx-auto mt-4 mb-8 shadow-[0_0_15px_rgba(var(--p),0.4)]"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="card bg-base-100 shadow-xl border border-base-content/10">
                        <div className="card-body p-8 md:p-10">
                            <h3 className="card-title text-2xl md:text-3xl font-black font-montserrat uppercase tracking-tight">Contact Info</h3>
                            <div className="space-y-6 mt-8">
                                <p className="flex items-center gap-4"><Icon name="fa-envelope" className="text-primary text-xl" /> <a href={`mailto:${siteConfig.contact.email}`} className="text-lg font-medium hover:text-primary transition-colors">{siteConfig.contact.email}</a></p>
                                <p className="flex items-center gap-4"><Icon name="fa-phone-alt" className="text-primary text-xl" /> <span className="text-lg font-medium">+63 985 906 5880</span></p>
                                <p className="flex items-center gap-4"><Icon name="fa-location-dot" className="text-primary text-xl" /> <span className="text-lg font-medium">Tingub Mandaue City</span></p>
                            </div>
                            <div className="mt-10">
                                <h4 className="font-black text-sm uppercase tracking-widest mb-6 text-base-content/40">Connect with me</h4>
                                <div className="flex flex-wrap gap-4">
                                    {[
                                        { href: siteConfig.links.facebook, icon: "fab fa-facebook-f", label: "Facebook" },
                                        { href: "https://www.instagram.com/ron.gzls/", icon: "fab fa-instagram", label: "Instagram" },
                                        { href: siteConfig.links.linkedin, icon: "fab fa-linkedin-in", label: "LinkedIn" },
                                        { href: siteConfig.links.github, icon: "fab fa-github", label: "GitHub" },
                                        { href: "/cv.pdf", icon: "fas fa-file-pdf", title: "View CV", label: "Download CV" }
                                    ].map((social, idx) => (
                                        <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="btn btn-circle btn-primary btn-outline hover:btn-primary border-primary/20" title={social.title}>
                                            <Icon name={social.icon} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl border border-base-content/10">
                        <div className="card-body p-8 md:p-10">
                            <h3 className="card-title text-2xl md:text-3xl font-black font-montserrat uppercase tracking-tight">Send a Message</h3>
                            <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
                                <div className="form-control"><input type="text" name="name" placeholder="Your Name" className={`input input-bordered w-full py-7 px-6 bg-base-200/50 border-base-content/10 focus:border-primary/50 transition-all ${fieldErrors.name ? 'input-error' : ''}`} required /></div>
                                <div className="form-control"><input type="email" name="email" placeholder="Your Email" className={`input input-bordered w-full py-7 px-6 bg-base-200/50 border-base-content/10 focus:border-primary/50 transition-all ${fieldErrors.email ? 'input-error' : ''}`} required /></div>
                                <div className="form-control"><input type="text" name="subject" placeholder="Subject" className={`input input-bordered w-full py-7 px-6 bg-base-200/50 border-base-content/10 focus:border-primary/50 transition-all ${fieldErrors.subject ? 'input-error' : ''}`} required /></div>
                                <div className="form-control"><textarea name="message" className={`textarea textarea-bordered h-40 w-full p-6 bg-base-200/50 border-base-content/10 focus:border-primary/50 transition-all ${fieldErrors.message ? 'textarea-error' : ''}`} placeholder="Your message here..." required></textarea></div>
                                <button type="submit" className="btn btn-primary w-full h-16 text-lg font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform" disabled={isPending}>{isPending ? <span className="loading loading-spinner"></span> : 'Send Message'}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {showToast && (
                <div className="toast toast-bottom toast-end fixed z-[100] mb-8 mr-4 md:mr-8">
                    <div className={`alert ${toastType === 'success' ? 'alert-success' : 'alert-error'} shadow-2xl`}>
                        <Icon name={toastType === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} className="mr-2" />
                        <span>{toastMessage}</span>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ContactForm;