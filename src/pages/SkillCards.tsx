import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import "./SkillCards.css";

const skills = [
  {
    id: "frontend",
    title: "Frontend Development",
    sub: "React · TypeScript · Tailwind · Vite",
    image: "/skill_frontend.png",
    className: "skill-card--frontend",
    num: "01",
  },
  {
    id: "backend",
    title: "Backend Development",
    sub: "Node.js · Django · Express · REST APIs",
    image: "/skill_backend.png",
    className: "skill-card--backend",
    num: "02",
  },
  {
    id: "data",
    title: "Data Analytics",
    sub: "Python · Pandas · NumPy · Power BI",
    image: "/skill_data.png",
    className: "skill-card--data",
    num: "03",
  },
  {
    id: "cloud",
    title: "Cloud Computing",
    sub: "AWS · Firebase · Vercel · CI/CD",
    image: "/skill_cloud.png",
    className: "skill-card--cloud",
    num: "04",
  },
];

/* ── Per-card with scroll-linked image parallax + hover effects ── */
const SkillCard = ({
  skill,
  index,
}: {
  skill: (typeof skills)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  /* scroll-linked vertical parallax on the image */
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const springY = useSpring(rawY, { stiffness: 80, damping: 20 });

  /* stagger entrance */
  const cardVariants = {
    hidden: { opacity: 0, y: 70, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.13,
      },
    },
  };

  /* title word-by-word */
  const words = skill.title.split(" ");
  const wordVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.13 + i * 0.07, ease: "easeOut" },
    }),
  };

  return (
    <motion.div
      ref={cardRef}
      className={`skill-card ${skill.className}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      whileHover="hover"
    >
      {/* Number badge */}
      <motion.span
        className="skill-card__num"
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.13 + 0.2 }}
      >
        {skill.num}
      </motion.span>

      {/* Text block */}
      <div className="skill-card__text">
        <h3 className="skill-card__title">
          {words.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ display: "inline-block", marginRight: "0.3em" }}
            >
              {word}
            </motion.span>
          ))}
        </h3>
        <motion.p
          className="skill-card__sub"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.13 + 0.4 }}
        >
          {skill.sub}
        </motion.p>
      </div>

      {/* Image with scroll parallax */}
      <motion.div
        ref={imgRef}
        className="skill-card__img-wrap"
        variants={{
          hover: { scale: 1.04, transition: { duration: 0.4, ease: "easeOut" } },
        }}
      >
        <motion.img
          src={skill.image}
          alt={skill.title}
          style={{ y: springY }}
        />
      </motion.div>

      {/* Shine sweep on hover */}
      <motion.div
        className="skill-card__shine"
        initial={{ x: "-100%" }}
        variants={{
          hover: {
            x: "200%",
            transition: { duration: 0.55, ease: "easeInOut" },
          },
        }}
      />
    </motion.div>
  );
};

/* ── Section ── */
const SkillCards = () => {
  return (
    <section className="skill-cards-section">
      {/* Section heading */}
      <motion.div
        className="skill-cards-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="skill-cards-section-label">Skills &amp; Expertise</span>
        <motion.div
          className="skill-cards-header-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      {/* Cards */}
      <div className="skill-stack-scroller">
        {skills.map((skill, i) => (
          <SkillCard key={skill.id} skill={skill} index={i} />
        ))}
      </div>
    </section>
  );
};

export default SkillCards;
