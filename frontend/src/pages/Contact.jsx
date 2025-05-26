import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send } from 'lucide-react';
import emailjs from 'emailjs-com';  

const Contact = () => {
  useEffect(() => {
    document.title = 'Contact | Aila Manasa';
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.send(
      'service_1ylk6cm',      
      'template_covldvm',    
      formData,
      'EHLH1Eew3ZewlxSf9'         
    )
    .then(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setTimeout(() => setIsSubmitted(false), 5000);
    })
    .catch((error) => {
      console.error('Failed to send message:', error);
      setIsSubmitting(false);
    });
  };

  return (
    <div className="pt-24 pb-16 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold mb-5 leading-tight bg-gradient-to-r from-indigo-500 to-purple-400 bg-clip-text text-transparent">Get In Touch</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-purple-400">Contact Information</h2>
            <p className="text-slate-400 mb-8">
              Feel free to reach out through any of the following methods. I'm always open to discussing new projects, creative ideas, or opportunities.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                  <Mail className="text-blue-500" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-400">Email</h3>
                  <a href="mailto:manasaaila02@gmail.com" className="text-slate-400 hover:text-purple-400 transition-colors">
                    manasaaila02@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-400/20 p-3 rounded-lg mr-4">
                  <Phone className="text-purple-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-400">Phone</h3>
                  <a href="tel:+1234567890" className="text-slate-400 hover:text-purple-400 transition-colors">
                    +91 7093167509
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4 text-purple-400">Connect With Me</h3>
              <div className="flex space-x-4">
                {/* GitHub */}
                <a href="https://github.com/Manasa-Aila02" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-slate-700 transition-colors p-3 rounded-lg">
                  <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0112 6.84c.86.01 1.73.12 2.54.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.69 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.95.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.02 10.02 0 0022 12c0-5.52-4.48-10-10-10z" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="http://www.linkedin.com/in/manasa-aila-b54650308" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-slate-700 transition-colors p-3 rounded-lg">
                  <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.3c-1 0-1.7-.8-1.7-1.7 0-1 .8-1.7 1.7-1.7s1.7.8 1.7 1.7c0 .9-.8 1.7-1.7 1.7zm13.5 10.3h-3v-4.5c0-1.1 0-2.5-1.5-2.5s-1.7 1.2-1.7 2.4v4.6h-3v-9h2.9v1.2h.1c.4-.7 1.5-1.4 3-1.4 3.2 0 3.8 2.1 3.8 4.9v4.3z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-purple-400">Send me a Message</h2>
                <label className="block mb-2 text-sm font-medium text-purple-400">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-purple-400">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-purple-400">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-purple-400">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center bg-purple-400 hover:bg-purple-500 transition-colors px-6 py-3 rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Message
                <Send className="ml-2" size={20} />
              </button>
              {isSubmitted && (
                <p className="mt-4 text-green-400">Message sent successfully!</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

