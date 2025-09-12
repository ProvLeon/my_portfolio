"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experiencesDetails, techStack } from "@/constants";
import { use3DTilt } from "@/hooks/use3DTilt";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/shared/Card";
import { iconMap } from "@/constants/icons";
import { HiChip, HiCode, HiColorSwatch, HiDatabase } from "react-icons/hi";
import { IconType } from "react-icons";
import {
  ExperienceSectionProps,
  SkillItemProps,
  TechCategoryProps,
} from "@/types";

export default function Technologies() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const sectionIcons: Record<string, IconType> = {
    frontend: HiCode,
    backend: HiDatabase,
    tools: HiChip,
    design: HiColorSwatch,
  };

  // Enhanced animations
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section
      id="tech"
      className="py-24 relative overflow-hidden cursor-default"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-conic from-primary/10 via-secondary/10 to-accent/10 animate-spin-slow opacity-30" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-secondary/20 to-transparent rounded-full blur-[120px] animate-pulse-slow delay-1000" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background" />

        {/* Moving Gradient Lines */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute inset-0 bg-grid-pattern animate-grid" />
        </div>
      </div>

      <div className="container mx-auto px-4" ref={ref}>
        <SectionHeading
          title="Technical Expertise"
          subtitle="Building innovative solutions with cutting-edge technologies"
        />

        {/* Tech Categories Grid */}
        <motion.div
          variants={containerAnimation}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {Object.entries(techStack).map((
            [category, { title, skills }],
            index,
          ) => (
            <TechCategory
              key={category}
              category={category}
              title={title}
              skills={skills}
              index={index}
              Icon={sectionIcons[category as keyof typeof sectionIcons]}
            />
          ))}
        </motion.div>

        {/* Experience Progress */}
        <ExperienceSection isInView={isInView} />
      </div>
    </section>
  );
}

function TechCategory(
  { category, title, skills, index, Icon }: TechCategoryProps,
) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tilt = use3DTilt(cardRef);

  return (
    <motion.div
      ref={cardRef}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: "preserve-3d",
      }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Card className="h-full backdrop-blur-md hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
        <div className="space-y-6">
          {/* Category Header */}
          <div className="flex items-center gap-4 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="p-4 rounded-xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10
                        border border-primary/10 group-hover:border-primary/20 transition-all duration-300"
            >
              <Icon className="w-7 h-7 text-primary group-hover:text-primary/80 transition-colors" />
            </motion.div>
            <div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {title}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                {skills.length} Technologies
              </p>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill, skillIndex) => (
              <SkillItem
                key={skill}
                skill={skill}
                index={skillIndex}
                delay={index * 0.1 + skillIndex * 0.05}
              />
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// Enhanced SkillItem component with better glow effects
function SkillItem({ skill, delay }: SkillItemProps) {
  const Icon = iconMap[skill];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.2 }}
      className="group/skill relative"
    >
      <motion.div
        whileHover={{
          scale: 1.05,
          rotateZ: [0, -2, 2, 0],
        }}
        className="relative flex items-center gap-3 p-3 rounded-lg
                  bg-gray-800/30 hover:bg-gray-800/50
                  border border-gray-700/30 hover:border-primary/30
                  transition-all duration-300
                  overflow-hidden"
      >
        {/* Enhanced Icon Glow Effect */}
        {Icon && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50 blur-xl opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 p-1.5 rounded-lg bg-gray-800/50 group-hover/skill:bg-gray-800/70 transition-colors">
              <Icon className="w-5 h-5 text-gray-400 group-hover/skill:text-primary transition-all duration-300" />
            </div>
          </div>
        )}

        <span className="text-xs md:text-sm font-medium text-gray-300 group-hover/skill:text-white transition-colors duration-300">
          {skill}
        </span>

        {/* Enhanced Hover Glow */}
        <motion.div
          className="absolute inset-0 -z-10 opacity-0 group-hover/skill:opacity-100 transition-all duration-500"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-lg blur-xl" />
        </motion.div>

        {/* Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-[-10px] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shine" />
        </div>
      </motion.div>
    </motion.div>
  );
}

// Enhanced ExperienceSection with better animations
function ExperienceSection({ isInView }: ExperienceSectionProps) {
  const experiences = experiencesDetails;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: 0.4 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="backdrop-blur-md">
        <h4 className="text-2xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-8 text-center">
          Experience Overview
        </h4>
        <div className="space-y-8">
          {experiences.map((item, index) => (
            <div key={item.skill} className="relative">
              <div className="flex justify-between items-center mb-3">
                <h5 className="sm:text-md md:text-lg font-medium text-gray-200">
                  {item.skill}
                </h5>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                  className="text-sm text-gray-400 font-medium"
                >
                  {item.years} years
                </motion.span>
              </div>

              <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView
                    ? { width: `${(item.years / 4) * 100}%` }
                    : { width: 0 }}
                  transition={{
                    duration: 1.5,
                    delay: 0.5 + index * 0.2,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className={`relative h-full rounded-full ${item.color}`}
                >
                  {/* Animated Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: index * 0.2,
                    }}
                  />

                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent blur-sm" />
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
