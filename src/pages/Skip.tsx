import { useGetSkipQuery } from '../redux/features/skip/skipApi';
// import { data } from '../mock';
import { useAppSelector } from '../redux/app/hook';
import SkipCard from '../componenets/SkipCard';
import { Loader } from '../componenets/Loader';
import { motion, AnimatePresence } from 'framer-motion';

const Skip = () => {
  const { selectedSkip, skipData } = useAppSelector((state) => state.skip);

  const { data, isFetching, isLoading, error, isError } = useGetSkipQuery({
    postcode: 'NR32',
    area: 'Lowestoft',
  });

  if (isError) {
    const errorMessage =
      error && 'status' in error
        ? `Error ${error.status}: ${JSON.stringify(error.data)}`
        : 'An unknown error occurred';
    return <div className="text-red-500 text-center">{errorMessage}</div>;
  }

  const modalVariants = {
    hidden: {
      y: '20vh',
    },
    visible: {
      y: 0,
      transition: {
        type: 'tween',
        duration: 0.5,
        stiffness: 200,
        damping: 20,
      },
    },
    exit: {
      y: '20vh',
      transition: {
        type: 'tween',
        duration: 0.3,
      },
    },
  };

  return (
    <div className="container mx-auto py-20 px-5 lg:px-0">
      <div className="">
        <h2 className="text-3xl text-gray-700 font-bold text-center mb-4 font-Merriweather">
          Choose Your Skip Size
        </h2>
        <p className="text-lg text-gray-500 mb-10 text-center">
          Select the skip size that best suits your needs
        </p>
      </div>
      <section>
        <div>
          {isLoading && isFetching ? (
            <div>
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              {data &&
                data.map((skip) => (
                  <div key={skip.id}>
                    <SkipCard skip={skip} />
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* bottom div fixed */}
        <div>
          <AnimatePresence>
            {selectedSkip && (
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="z-40 min-h-20 h-20 w-full px-5 fixed bottom-0 left-0 bg-neutral-100/95 lg:px-0"
              >
                <div className="container mx-auto flex items-center justify-between gap-4 lg:gap-8 w-full h-full">
                  <div className="flex items-center gap-4">
                    <p className="hidden text-gray-700 font-medium lg:block">
                      You have selected{' '}
                      <span className="text-xl font-mediumtracking-wide">
                        {skipData?.size}
                      </span>{' '}
                      Yard Skip for a{' '}
                      <span className="text-xl font-mediumtracking-wide">
                        {skipData?.hire_period_days}
                      </span>{' '}
                      day hire period.
                    </p>
                    <p className="text-gray-700">
                      (
                      <span className="text-lg font-medium text-blue-600 tracking-wide lg:text-xl">
                        £
                        {skipData && skipData?.price_before_vat + skipData?.vat}{' '}
                      </span>
                      Total Cost)
                    </p>
                  </div>
                  <div className="flex items-center gap-4 lg:gap-8">
                    <button
                      type="button"
                      className="py-1 px-3 border border-blue-500 text-blue-500 rounded-[50px] text-sm font-semibold lg:text-base lg:px-10 md:py-3 cursor-pointer hover:border-blue-500 hover:text-blue-500"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="py-1 px-3 border border-blue-500 bg-blue-500 text-white rounded-[50px] text-sm font-semibold hover:text-[#f7f8f9] lg:text-base lg:px-10 md:py-3 cursor-pointer hover:border-[#f7f8f9]"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Skip;
