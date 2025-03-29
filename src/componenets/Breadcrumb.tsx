import { motion } from 'framer-motion';
import {
  MapPin,
  Trash,
  Truck,
  Shield,
  Calendar,
  CreditCard,
} from 'lucide-react';

const steps = [
  { label: 'Postcode', icon: MapPin, completed: true },
  { label: 'Waste Type', icon: Trash, completed: true },
  { label: 'Select Skip', icon: Truck, completed: true },
  { label: 'Permit Check', icon: Shield, completed: false },
  { label: 'Choose Date', icon: Calendar, completed: false },
  { label: 'Payment', icon: CreditCard, completed: false },
];

const Breadcrumb = () => {
  return (
    <section className="grid place-content-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 rounded-lg bg-black p-6 gap-3">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`flex items-center space-x-2 ${
              step.completed ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <step.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{step.label}</span>
          </motion.div>

          {index < steps.length - 1 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '2.5rem' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative h-[2px] mx-2 hidden sm:block ${
                step.completed ? 'bg-blue-500' : 'bg-gray-400'
              }`}
            >
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                className={`absolute -top-1 left-0 w-2 h-2 rounded-full hidden sm:block ${
                  step.completed ? 'bg-blue-500' : 'bg-gray-400'
                }`}
              />
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                className={`absolute -top-1 right-0 w-2 h-2 rounded-full hidden sm:block ${
                  step.completed ? 'bg-blue-500' : 'bg-gray-400'
                }`}
              />
            </motion.div>
          )}
        </div>
      ))}
    </section>
  );
};

export default Breadcrumb;
