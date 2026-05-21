"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

interface AnimatedNumberProps {
  value: number;
  format?: (value: number) => string;
  className?: string;
}

export function AnimatedNumber({
  value,
  format = (n) => n.toString(),
  className,
}: AnimatedNumberProps) {
  const spring = useSpring(value, { stiffness: 90, damping: 18, mass: 0.6 });
  const display = useTransform(spring, (latest) => format(latest));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span className={className}>{display}</motion.span>;
}
