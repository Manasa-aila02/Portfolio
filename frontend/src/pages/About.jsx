import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, BookOpen } from "lucide-react";
import { API_BASE_URL } from "../components/BaseUrl";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const About = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    document.title = "About | My Portfolio";
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/profile`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return <div className="text-center pt-24">Loading...</div>;
  }

  const groupedSkills = profile.skills.reduce((acc, skill) => {
    if (!acc[skill.type]) acc[skill.type] = [];
    acc[skill.type] = acc[skill.type].concat(skill.items);
    return acc;
  }, {});

  return (
    <div className="pt-24 pb-16 bg-[#121212] text-white min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-5xl font-extrabold mb-5 leading-tight bg-gradient-to-r from-indigo-500 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-center">
            Get to know more about my background, skills, and experience.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          whileHover={{
            scale: 1.03,
            boxShadow: "0px 8px 24px rgba(128, 90, 213, 0.3)",
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="bg-[#1b1b1b] border border-purple-500 rounded-xl p-6 shadow-lg max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">
            Who I Am
          </h2>
          <p className="text-gray-300 mb-6">
            {profile.aboutme ||
              "I’m a passionate and curious software developer who enjoys building intuitive and user-friendly web applications. With a background in computer science and hands-on experience in full-stack development, I love bringing ideas to life through clean, efficient code."}
          </p>

          <motion.div
            className="flex justify-center"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-full transition-all duration-300"
            >
              <Download size={18} /> Download Resume
            </a>
          </motion.div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-20"
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-center text-purple-400 mb-12">My Skills</h2>
          <div className="max-w-3xl mx-auto space-y-12">
            {Object.entries(groupedSkills).map(([type, names], index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold mb-6 text-purple-300">{type}</h3>
                <div className="flex flex-wrap gap-4">
                  {names.map((name, i) => (
                    <motion.button
                      key={i}
                      className="cursor-default px-4 py-2 rounded-full border border-purple-400 bg-transparent text-purple-300 hover:bg-purple-500 hover:text-white transition-colors duration-150"
                      whileHover={{
                        scale: 1.12,
                        boxShadow: "0 6px 20px rgba(128, 90, 213, 0.5)",
                      }}
                      transition={{ duration: 0.15 }}
                    >
                      {name}
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-20"
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center text-purple-400 mb-12">Education</h2>
          <div className="space-y-8 max-w-3xl mx-auto">
            {profile.education.map((edu, index) => (
              <motion.div
                key={index}
                className="relative pl-8 bg-[#1b1b1b] border border-purple-500 rounded-xl p-6 shadow-md transition-transform duration-300 ease-in-out"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0px 8px 24px rgba(128, 90, 213, 0.3)",
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <div className="absolute left-0 top-0 bg-purple-500/20 p-1.5 rounded-lg">
                  <BookOpen className="text-purple-400" size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                <div className="flex items-center text-gray-400 mb-2">
                  <span className="mr-2">{edu.institution}</span>
                  <span className="text-sm bg-purple-500/30 px-2 py-0.5 rounded text-white">
                    {edu.from} - {edu.to}
                  </span>
                </div>
                <p className="text-gray-300">CGPA: {edu.cgpa}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
