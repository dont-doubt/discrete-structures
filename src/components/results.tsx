import { Children } from '@/utils/types';
import { motion } from 'framer-motion';
import { Key } from 'react';

export default function Results({result, children}: {result?: Key | null} & Children) {
  return (
    <motion.div
      key={result}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="mt-40 rounded-xl px-28 py-2 bg-emerald-300/[4%] border border-emerald-500"
    >
      {children}
    </motion.div>
  )
}
