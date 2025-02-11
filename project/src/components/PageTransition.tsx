import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
    backgroundColor: 'white',
    transform: 'scale(1.05)'
  },
  animate: {
    opacity: 1,
    position: 'relative',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    zIndex: 1,
    backgroundColor: 'white',
    transform: 'scale(1)'
  },
  exit: {
    opacity: 0,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
    backgroundColor: 'white',
    transform: 'scale(0.95)'
  }
};

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ 
        type: "tween",
        ease: [0.4, 0.0, 0.2, 1],
        duration: 0.4
      }}
      className="bg-gray-50"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition; 