'use client';
import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sendEmail } from '../actions';
import { siteConfig } from '../config/site';
import { ContactFormData } from '../lib/validation';

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [isPending, setIsPending] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
    const formRef = useRef<HTMLFormElement>(null);
    const contactRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Scrubbed Parallax Effect
        gsap.fromTo(contactRef.current,
            { opacity: 0.2, y: 50 },
            {
                opacity: 1,
                y: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: contactRef.current,
                    start: 'top bottom',
                    end: 'top 40%',
                    scrub: true,
                }
            }
        );

        const inputs = gsap.utils.toArray<HTMLInputElement | HTMLTextAreaElement>('.form-field');
        inputs.forEach(input => {
            ScrollTrigger.create({
                trigger: input,
                start: 'top 90%',
                toggleClass: 'input-primary',
                toggleActions: 'play none none reverse'
            });
        });
    }, { scope: formRef });


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
                }
                setToastMessage(result.error || 'Failed to send message.');
                setToastType('error');
            }

            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch (error) {
            console.error('Contact form submission error:', error);
            setToastMessage('Network error. Please try again later.');
            setToastType('error');
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <section id="contact" className="py-20 bg-base-200" ref={contactRef}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold font-montserrat tracking-[0.2em] uppercase text-base-content">Get In Touch</h2>
                    <div className="w-12 h-0.5 bg-primary/40 mx-auto mt-4 mb-8"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    <div className="card bg-base-100 shadow-xl glass-card">
                        <div className="card-body">
                            <h3 className="card-title text-2xl font-bold">Contact Information</h3>
                            <div className="space-y-4 mt-6">
                                <p><i className="fas fa-envelope mr-2 text-primary"></i> <a href={`mailto:${siteConfig.contact.email}`} className="link link-hover">{siteConfig.contact.email}</a></p>
                                <p><i className="fas fa-phone-alt mr-2 text-primary"></i> +63 985 906 5880</p>
                                <p><i className="fas fa-location-dot mr-2 text-primary"></i> Tingub Mandaue City</p>
                                <p><i className="fab fa-github mr-2 text-primary"></i> <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="link link-hover">{siteConfig.links.github.replace('https://', '')}</a></p>
                            </div>
                            <div className="mt-6">
                                <h4 className="font-bold text-lg mb-4">Connect with me</h4>
                                <div className="flex gap-4">
                                    <a href={siteConfig.links.facebook} className="btn btn-circle btn-primary" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                    <a href="https://www.instagram.com/ron.gzls/" className="btn btn-circle btn-primary" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                    <a href={siteConfig.links.linkedin} className="btn btn-circle btn-primary" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                    <a href={siteConfig.links.github} className="btn btn-circle btn-primary" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-github"></i>
                                    </a>
                                    <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-primary" title="View CV">
                                        <i className="fas fa-file-pdf"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl glass-card">
                        <div className="card-body">
                            <h3 className="card-title text-2xl font-bold">Send me a message</h3>
                            <form className="space-y-4 mt-6" onSubmit={handleSubmit} ref={formRef}>
                                <div className="form-control">
                                    <input type="text" name="name" placeholder="Your Name" className={`input input-bordered w-full form-field ${fieldErrors.name ? 'input-error' : ''}`} required />
                                    {fieldErrors.name && <label className="label"><span className="label-text-alt text-error">{fieldErrors.name}</span></label>}
                                </div>
                                <div className="form-control">
                                    <input type="email" name="email" placeholder="Your Email" className={`input input-bordered w-full form-field ${fieldErrors.email ? 'input-error' : ''}`} required />
                                    {fieldErrors.email && <label className="label"><span className="label-text-alt text-error">{fieldErrors.email}</span></label>}
                                </div>
                                <div className="form-control">
                                    <input type="text" name="subject" placeholder="Subject" className={`input input-bordered w-full form-field ${fieldErrors.subject ? 'input-error' : ''}`} required />
                                    {fieldErrors.subject && <label className="label"><span className="label-text-alt text-error">{fieldErrors.subject}</span></label>}
                                </div>
                                <div className="form-control">
                                    <textarea name="message" className={`textarea textarea-bordered h-32 w-full form-field ${fieldErrors.message ? 'textarea-error' : ''}`} placeholder="Your message here..." required></textarea>
                                    {fieldErrors.message && <label className="label"><span className="label-text-alt text-error">{fieldErrors.message}</span></label>}
                                </div>
                                <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
                                    {isPending ? <span className="loading loading-spinner"></span> : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {showToast && (
                <div className="toast toast-top toast-center z-[100] mt-16">
                    <div className={`alert ${toastType === 'success' ? 'alert-success' : 'alert-error'}`}>
                        <span>{toastMessage}</span>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ContactForm;