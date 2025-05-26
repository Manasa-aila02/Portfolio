import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../components/BaseUrl';
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Projects | Aila Manasa';

    fetch(`${API_BASE_URL}/api/projects`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch projects');
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-24 pb-16 bg-black min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold mb-5 leading-tight bg-gradient-to-r from-indigo-500 to-purple-400 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here's a collection of my recent work. Each project represents a unique challenge and solution.
          </p>
        </motion.div>

        {error && <p className="text-center text-red-500">{error}</p>}

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="bg-[#1b1b1b] border border-purple-600 rounded-lg p-6 text-gray-300 mb-6 shadow-[0_0_15px_5px_rgba(128,90,213,0.3)] transform"
            >
              <div className="relative overflow-hidden rounded-lg mb-4 group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-200 flex items-end px-4 pb-4">
                  <div className="w-full flex justify-between items-center">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white border border-purple-500 px-3 py-1 rounded-md text-sm font-medium hover:bg-purple-600 transition-colors"
                      >
                        View Repo
                      </a>
                    )}
                    {(project.id === 1 || project.id === 2) && project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white border border-purple-500 px-3 py-1 rounded-md text-sm font-medium hover:bg-purple-600 transition-colors"
                      >
                        View Screenshots
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-purple-400">{project.title}</h3>
              <p className="mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-purple-600/30 text-white px-2 py-1 rounded font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
