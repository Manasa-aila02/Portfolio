import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TypeAnimation } from 'react-type-animation';
import { Layout, Code, Database, Briefcase } from 'lucide-react';
import { API_BASE_URL } from '../components/BaseUrl';
const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const fadeInSlowUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.8,
      ease: 'easeOut',
    },
  },
};

const btnVariants = {
  rest: { scale: 1, boxShadow: 'none' },
  hover: {
    scale: 1.08,
    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.5)',
    transition: { duration: 0.3 },
  },
  tap: { scale: 0.95 },
};

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const servicesControl = useAnimation();
  const projectsControl = useAnimation();

  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/profile`);
        const data = await response.json();
        setProfile(data);
        document.title = `${data.name} | Portfolio`;
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/projects`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProfile();
    fetchProjects();
  }, []);

  useEffect(() => {
    if (servicesInView) servicesControl.start('visible');
    if (projectsInView) projectsControl.start('visible');
  }, [servicesInView, projectsInView, servicesControl, projectsControl]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        {/* <p className="text-white">Loading...</p> */}
      </div>
    );
  }

  const snippetLength = 50;
  const objective = profile.objective || '';
  const shortObjective =
    objective.length > snippetLength
      ? objective.slice(0, snippetLength) + '...'
      : objective;

  const trimDescription = (desc) => {
    const maxLen = 150;
    return desc.length > maxLen ? desc.slice(0, maxLen) + '...' : desc;
  };

  const iconMap = {
    'UI/UX Design': <Layout className="text-purple-300/30" size={32} />,
    'Web Development': <Code className="text-purple-400" size={32} />,
    'Backend Development': <Database className="text-purple-400" size={32} />,
    Consulting: <Briefcase className="text-purple-400" size={32} />,
  };

  const btnPrimary =
    'bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2';
  const btnSecondary =
    'bg-transparent border-2 border-purple-600 text-purple-600 font-semibold py-3 px-6 rounded-full hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2';

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-28 pb-20 container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center w-full">
          <motion.div
            className="md:w-1/2 mb-12 md:mb-0"
            initial="hidden"
            animate="visible"
            variants={fadeInLeft}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-5xl font-extrabold mb-5 leading-tight bg-gradient-to-r from-indigo-500 to-purple-400 bg-clip-text text-transparent">
              Hi, I'm {profile.name}
            </h1>

            <div className="text-3xl text-white-800 mb-6 h-20">
              <TypeAnimation
                sequence={[
                  'Frontend Developer',
                  1200,
                  'Full Stack Engineer',
                  1200,
                  'UI/UX Designer',
                  1200,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                style={{ color: 'text-purple-500' }}
              />
            </div>
            <p className="text-white text-lg max-w-lg mb-8">
              {shortObjective}
              {objective.length > snippetLength && (
                <Link
                  to="/about"
                  className="text-purple-400 hover:underline ml-2"
                >
                  Read More
                </Link>
              )}
            </p>
            <div className="flex gap-6 flex-wrap">
              <motion.div whileHover="hover" whileTap="tap" initial="rest" variants={btnVariants}>
                <Link to="/projects" className={btnPrimary}>
                  View My Work
                </Link>
              </motion.div>
              <motion.div whileHover="hover" whileTap="tap" initial="rest" variants={btnVariants}>
                <Link to="/contact" className={btnSecondary}>
                  Get In Touch
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2 flex justify-center relative"
            initial="hidden"
            animate="visible"
            variants={fadeInRight}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
                className="relative w-[500px] h-[500px] flex items-center justify-center"
                animate={{
                  filter: [
                    'drop-shadow(0 0 5px rgba(123, 31, 162, 0.5))',
                    'drop-shadow(0 0 20px rgba(123, 31, 162, 0.8))',
                    'drop-shadow(0 0 5px rgba(123, 31, 162, 0.5))',
                  ],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Abstract purple blob shape behind the image */}
                <svg
                  className="absolute w-[520px] h-[520px] -z-10"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <path
                    fill="#7B1FA2"
                    fillOpacity="0.7"
                    d="M421.5,289Q446,328,426.5,371Q407,414,360.5,433.5Q314,453,270.5,438Q227,423,197,392Q167,361,140,320.5Q113,280,132.5,237Q152,194,195,180.5Q238,167,279.5,180.5Q321,194,350.5,231.5Q380,269,421.5,289Z"
                    filter="url(#blurFilter)"
                  />
                  <defs>
                    <filter id="blurFilter" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
                      <feDropShadow dx="0" dy="0" stdDeviation="30" floodColor="#7B1FA2" floodOpacity="0.7" />
                    </filter>
                  </defs>
                </svg>

                {/* Transparent profile image */}
                <div className="relative w-[480px] h-[480px] z-10">
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    className="w-full h-full object-contain"
                    style={{ backgroundColor: 'transparent' }}
                  />
                </div>
              </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 bg-black">
        <motion.div
          className="container mx-auto px-4 md:px-6"
          initial="hidden"
          animate={servicesControl}
          variants={fadeInSlowUp}
        >
          <h2 className="section-title text-center text-5xl font-extrabold mb-5 leading-tight bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
            What I Do
          </h2>
          <p className="text-white text-center max-w-2xl mx-auto mb-14">
            I specialize in creating modern, responsive websites and applications
            using the latest technologies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {profile.whatIDo?.length > 0 ? (
              profile.whatIDo.map((service, idx) => (
                <motion.div
                  key={idx}
                  className="bg-[#1a1a1a] rounded-xl p-7 flex flex-col items-center text-center shadow-lg"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)',
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="mb-4">{iconMap[service.title] || <Briefcase size={32} className="text-purple-400" />}</div>
                  <h3 className="text-xl font-semibold mb-2 text-purple-600">{service.title}</h3>
                  <p className="text-gray-300">{service.description}</p>
                </motion.div>
              ))
            ) : (
              <p className="text-white text-center">No services to show.</p>
            )}
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-20 container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate={projectsControl}
          variants={fadeInSlowUp}
        >
          <h2 className="section-title text-center mb-4 text-4xl font-bold text-purple-600">
            Projects
          </h2>

          <p className="text-white text-center max-w-2xl mx-auto mb-14">
            Here are some of my latest projects showcasing my skills and experience.
          </p>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {projects.map((project, idx) => (
                <motion.div
                  key={project.id || idx}
                  className="bg-[#1a1a1a] rounded-lg shadow-lg overflow-hidden flex flex-col"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 15px 30px rgba(139, 92, 246, 0.4)',
                    transition: { duration: 0.3 },
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 object-cover"
                    loading="lazy"
                  />
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-purple-500 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 flex-grow">{trimDescription(project.description)}</p>
                    <motion.button
                      whileHover="hover"
                      whileTap="tap"
                      variants={btnVariants}
                      onClick={() => navigate('/projects')}
                      className={`mt-5 self-start ${btnSecondary}`}
                      aria-label={`View more about ${project.title}`}
                    >
                      View More
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-white text-center">No projects available.</p>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default Home;