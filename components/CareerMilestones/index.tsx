// components/CareerMilestones/index.tsx
"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { BsStars } from "react-icons/bs";
import { fadeInUp, staggerContainer } from "@/constants/animations";
import { careerMilestones } from "@/constants";
import { DetailModal } from "./DetailModal";
import { MilestoneCard } from "./MilestoneCard";
import { OngoingProjects } from "./OngoingProjects";
import { FutureGoals } from "./FutureGoals";
import styles from "./styles.module.css";
import { FiTrendingUp } from "react-icons/fi";
import type { Milestone } from "@/types";

export default function CareerMilestones() {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(
    null,
  );
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [
    0.8,
    1,
    1,
    0.8,
  ]);

  return (
    <section
      ref={containerRef}
      id="milestones"
      className={styles.careerMilestones}
    >
      {/* <BackgroundEffects /> */}

      <motion.div
        style={{ opacity, scale }}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={styles.container}
      >
        {/* Header Section */}
        <motion.div className={styles.header} variants={fadeInUp}>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className={styles.iconWrapper}
          >
            <BsStars className={styles.icon} />
          </motion.div>

          <h2 className={styles.title}>
            Career Journey & Future Vision
          </h2>

          <p className={styles.subtitle}>
            Tracking my progress and setting ambitious goals for the future of
            technology
          </p>
        </motion.div>

        {/* Completed Projects */}
        <div className={styles.completedProjects}>
          <motion.div variants={fadeInUp} className="col-span-2">
            <div className={styles.sectionHeader}>
              <FiTrendingUp className={styles.sectionIcon} />
              <h3 className={styles.sectionTitle}>
                Major Milestones
              </h3>
            </div>

            <div className={styles.milestonesGrid}>
              {careerMilestones.completed.map((milestone) => (
                <MilestoneCard
                  key={milestone.project}
                  milestone={milestone}
                  onClick={() => setSelectedMilestone(milestone)}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Ongoing Projects */}
        <OngoingProjects projects={careerMilestones.ongoing} />

        {/* Future Goals */}
        <FutureGoals goals={careerMilestones.futureGoals} />

        {/* Modal */}
        <AnimatePresence>
          {selectedMilestone && (
            <DetailModal
              milestone={selectedMilestone}
              onClose={() => setSelectedMilestone(null)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
