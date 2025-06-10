import React from "react";
import { motion } from "framer-motion";
import { LiaLinkedinIn } from "react-icons/lia";
const AboutUs = () => {
  return (
    <div className="max-w-4xl  mx-auto px-4 py-10 space-y-8 	base-content-800">
      <motion.h1
        className="text-5xl text-center font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📘 About Us
      </motion.h1>
      <p>
        Welcome to <strong>KnowledgeNest</strong> – Empowering Minds Through
        Shared Wisdom
      </p>
      <p>
        At KnowledgeNest, we believe that knowledge grows when shared. In
        today’s fast-paced digital era, students, learners, and professionals
        crave a space where ideas can be exchanged freely, thoughts can be
        expressed confidently, and insights can be appreciated globally. That’s
        why we created KnowledgeNest – a vibrant, student-centric platform for
        article publishing and open discussion.
      </p>

      <motion.section
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold">🎯 Our Mission</h2>
        <p>
          To build a bridge between learners and ideas. Whether it's a
          thought-provoking article on technology, a guide on mental well-being,
          or creative storytelling in literature – we want to be the platform
          where every voice matters, and every insight can make an impact.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold">🧠 What We Offer</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>📝 Article Publishing:</strong> Post your knowledge-rich
            articles in various categories like Technology, Science, Arts, and
            more.
          </li>
          <li>
            <strong>💬 Discussion & Comments:</strong> Share your perspective,
            ask questions, and engage in meaningful dialogues.
          </li>
          <li>
            <strong>🔐 Safe & Secure Authentication:</strong> Powered by
            Firebase, ensuring your data and account remain protected.
          </li>
          <li>
            <strong>📱 Responsive Design:</strong> Seamless user experience
            across mobile, tablet, and desktop.
          </li>
          <li>
            <strong>🧑‍💻 Personalized Features:</strong> Access "My Articles",
            edit/delete posts, comment on topics you love, and explore
            category-based content tailored to your interests.
          </li>
        </ul>
      </motion.section>

      <section>
        <h2 className="text-2xl font-semibold">💡 Why We Built This</h2>
        <p>
          We noticed a gap — a lack of dedicated platforms for students to share
          what they know, get feedback, and build an intellectual portfolio.
          Platforms like Dev.to are amazing, but they’re often focused on
          professionals. We wanted something for students, by students, and
          about students.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">👨‍💻 Built With 💻</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Frontend:</strong> React.js + Tailwind CSS
          </li>
          <li>
            <strong>Backend:</strong> Node.js + Express.js
          </li>
          <li>
            <strong>Authentication:</strong> Firebase
          </li>
          <li>
            <strong>Database:</strong> MongoDB Atlas
          </li>
          <li>
            <strong>Hosting:</strong> Vercel (Client) & Render (Backend Hosting)
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">🌍 Our Vision for the Future</h2>
        <p>
          We’re not just building a blog. We’re building a community of
          thinkers.
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Launch a user profile system</li>
          <li>Add markdown support with a rich text editor</li>
          <li>Introduce peer review and article rating</li>
          <li>Host weekly writing challenges and rewards</li>
          <li>Enable following authors and saving favorite articles</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">🤝 Join Us</h2>
        <p>
          Whether you're a science enthusiast, a passionate coder, a creative
          writer, or just someone who loves to read — there's a place for you at
          KnowledgeNest. This platform is yours to explore, express, and evolve.
        </p>
        <p>Let’s build a world where knowledge isn’t kept — it’s shared.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">📬 Contact Us</h2>
        <ul className="space-y-1">
          <li>📧 Email: alvinmonir411@gamil.com</li>

          <li className="flex  justify-start">
            <LiaLinkedinIn /> https://www.linkedin.com/in/alvin-monir/
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUs;
