import { motion } from 'framer-motion';
import { forwardRef, PropsWithChildren, Ref } from 'react';

type Props = PropsWithChildren<{
  className: string
}>;

const FadeDiv = forwardRef(({className, children}: Props, ref: Ref<HTMLDivElement>) => {
  
  return (
    <motion.div
      className={className}
      ref={ref}
      initial={{opacity: 0, scale: 1.2}}
      animate={{opacity: 1, scale: 1.0}}
      exit={{opacity: 0, scale: 0.8}}
    >
      {children}
    </motion.div>
  );
});

export default FadeDiv;
