import { useGetSkipQuery } from '../redux/features/skip/skipApi';
import { lazy, Suspense } from 'react';
// import { data } from '../mock';
import { useAppDispatch, useAppSelector } from '../redux/app/hook';
import SkipCard from '../componenets/SkipCard';
import { Loader } from '../componenets/Loader';
import { setSelectedSkip } from '../redux/features/skip/skipSlice';
import AnimateComponent from '../shared/AnimateComponent';
import Breadcrumb from '../componenets/Breadcrumb';
const Modal = lazy(() => import('../shared/modal/Modal'));

const Skip = () => {
  const { selectedSkip, skipData } = useAppSelector((state) => state.skip);
  const dispatch = useAppDispatch();
  const { data, isFetching, isLoading, error, isError } = useGetSkipQuery({
    postcode: 'NR32',
    area: 'Lowestoft',
  });

  if (isError) {
    const errorMessage =
      error && 'status' in error
        ? `Error ${error.status}: ${JSON.stringify(error.data)}`
        : 'An unknown error occurred';
    return <div className="text-red-500 text-center py-5">{errorMessage}</div>;
  }

  return (
    <section className="container mx-auto py-10 px-5">
      <Breadcrumb />
      <div className="mt-10">
        <h2 className="text-2xl text-gray-700 font-bold text-center mb-4 lg:text-3xl font-Merriweather">
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
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 md:gap-x-4 md:gap-y-10 lg:grid-cols-3">
              {data &&
                data.map((skip) => (
                  <div key={skip.id}>
                    <SkipCard skip={skip} />
                  </div>
                ))}
            </div>
          )}
        </div>
        <div>
          {selectedSkip && (
            <Suspense fallback={<Loader />}>
              <Modal
                isOpen={selectedSkip}
                onClose={() => dispatch(setSelectedSkip(false))}
              >
                <div className="bg-gray-50 w-5xl max-w-3xl rounded-3xl">
                  <div className="rounded-3xl p-5 lg:p-10 leading-relaxed shadow-md shadow-blue-500/20 font-Montserrat cursor-pointer border border-gray-200 transition-all duration-500 ease-in-out">
                    <div className="border-b border-blue-300 pb-5 flex flex-col justify-between w-full lg:flex-row rounded-t-lg md:mb-3">
                      <p className="bg-blue-50 text-blue-500 border border-blue-300 text-lg lg:text-2xl w-fit h-full py-2 px-5 text-end font-medium self-end mb-1 rounded">
                        {skipData?.size} Yard Skip
                      </p>
                      <div className="flex items-end">
                        <h3 className="font-medium text-blue-600 tracking-wide text-md lg:text-2xl">
                          £{skipData?.price_before_vat}
                        </h3>
                        <span className="text-sm lg:text-base text-gray-500 ml-2">
                          per week
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 py-1">
                      <AnimateComponent
                        direction={{
                          initial_x: 0,
                          initial_y: 20,
                          duration: 0.5,
                        }}
                      >
                        <p className="flex items-center py-2 text-gray-700">
                          {' '}
                          <svg
                            className="w-3 h-3 text-blue-500  mr-2"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <polygon points="12,2 22,12 12,22 2,12"></polygon>
                          </svg>
                          £{skipData?.vat} VAT
                        </p>
                      </AnimateComponent>
                      {skipData?.transport_cost && (
                        <AnimateComponent
                          direction={{
                            initial_x: 0,
                            initial_y: 20,
                            duration: 0.5,
                          }}
                        >
                          <p className="flex items-center py-2 text-gray-700">
                            {' '}
                            <svg
                              className="w-3 h-3 text-blue-500  mr-2"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <polygon points="12,2 22,12 12,22 2,12"></polygon>
                            </svg>
                            £{skipData?.transport_cost} Transport Cost
                          </p>
                        </AnimateComponent>
                      )}

                      {skipData?.per_tonne_cost && (
                        <AnimateComponent
                          direction={{
                            initial_x: 0,
                            initial_y: 20,
                            duration: 0.6,
                          }}
                        >
                          <p className="flex items-center py-2 text-gray-700">
                            {' '}
                            <svg
                              className="w-3 h-3 text-blue-500  mr-2"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <polygon points="12,2 22,12 12,22 2,12"></polygon>
                            </svg>
                            £{skipData?.per_tonne_cost} Per Tonne Cost
                          </p>
                        </AnimateComponent>
                      )}
                      <AnimateComponent
                        direction={{
                          initial_x: 0,
                          initial_y: 20,
                          duration: 0.8,
                        }}
                      >
                        <p
                          className={`flex items-center py-2 text-gray-700 ${
                            !skipData?.forbidden ? '' : ''
                          }`}
                        >
                          <svg
                            className="w-3 h-3 text-blue-500  mr-2"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <polygon points="12,2 22,12 12,22 2,12"></polygon>
                          </svg>
                          {skipData?.forbidden ? 'Forbidden' : 'Allowed'}
                        </p>
                      </AnimateComponent>
                      <AnimateComponent
                        direction={{
                          initial_x: 0,
                          initial_y: 20,
                          duration: 0.9,
                        }}
                      >
                        <p className="flex items-center py-2 text-gray-700">
                          {' '}
                          <svg
                            className="w-3 h-3 text-blue-500  mr-2"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <polygon points="12,2 22,12 12,22 2,12"></polygon>
                          </svg>
                          {skipData?.postcode} Postcode
                        </p>
                      </AnimateComponent>
                      <AnimateComponent
                        direction={{
                          initial_x: 0,
                          initial_y: 20,
                          duration: 1,
                        }}
                      >
                        {skipData?.area && (
                          <p
                            className="flex items-center py-2 text-gray-700"
                            text-gray-700
                          >
                            {' '}
                            <svg
                              className="w-3 h-3 text-blue-500 mr-2"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <polygon points="12,2 22,12 12,22 2,12"></polygon>
                            </svg>
                            {skipData?.area && skipData?.area} Area
                          </p>
                        )}
                      </AnimateComponent>
                      <AnimateComponent
                        direction={{
                          initial_x: 0,
                          initial_y: 20,
                          duration: 1,
                        }}
                      >
                        <p className="flex items-center py-2 text-gray-700">
                          {' '}
                          <svg
                            className="w-3 h-3 text-blue-500 mr-2"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <polygon points="12,2 22,12 12,22 2,12"></polygon>
                          </svg>
                          {skipData?.hire_period_days} Days Hire Period
                        </p>
                      </AnimateComponent>
                      <AnimateComponent
                        direction={{
                          initial_x: 0,
                          initial_y: 20,
                          duration: 1.1,
                        }}
                      >
                        <div
                          className={`flex items-center w-full py-2 text-gray-700 ${
                            !skipData?.allows_heavy_waste ? 'text-red-500' : ''
                          }`}
                        >
                          <p>
                            {!skipData?.allows_heavy_waste ? (
                              <span className="pr-2">&#9888;</span>
                            ) : (
                              <svg
                                className="w-3 h-3 text-blue-500  mr-2"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <polygon points="12,2 22,12 12,22 2,12"></polygon>
                              </svg>
                            )}
                          </p>
                          {skipData?.allows_heavy_waste
                            ? 'Allows Heavy Waste'
                            : 'Does Not Allow Heavy Waste'}
                        </div>
                      </AnimateComponent>
                      <AnimateComponent
                        direction={{
                          initial_x: 0,
                          initial_y: 20,
                          duration: 1.2,
                        }}
                      >
                        <div
                          className={`flex items-center py-2 text-gray-700 ${
                            !skipData?.allowed_on_road ? 'text-yellow-500' : ''
                          }`}
                        >
                          <p>
                            {!skipData?.allowed_on_road ? (
                              <span className="pr-2">&#9888;</span>
                            ) : (
                              <svg
                                className="w-3 h-3 text-blue-500  mr-2"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <polygon points="12,2 22,12 12,22 2,12"></polygon>
                              </svg>
                            )}
                          </p>
                          {skipData?.allowed_on_road
                            ? 'Allowed On Road'
                            : 'Not Allowed On Road'}
                        </div>
                      </AnimateComponent>
                      <AnimateComponent
                        direction={{
                          initial_x: 0,
                          initial_y: 20,
                          duration: 1.3,
                        }}
                      >
                        <div className="flex flex-col justify-between items-start lg:items-center gap-4 mb-10 text-gray-600 lg:flex-row">
                          <p className="">
                            You have selected{' '}
                            <span className="text-lg font-medium tracking-wide">
                              {skipData?.size}
                            </span>{' '}
                            Yard Skip for a{' '}
                            <span className="text-lg font-medium tracking-wide">
                              {skipData?.hire_period_days}
                            </span>{' '}
                            day hire period.
                          </p>
                          <p className="text-gray-700 font-medium">
                            Total Cost:
                            <span className="text-lg pl-2 font-medium text-blue-600 tracking-wide lg:text-xl">
                              £
                              {skipData &&
                                skipData?.price_before_vat + skipData?.vat}{' '}
                            </span>
                          </p>
                        </div>
                      </AnimateComponent>
                      <div className="flex items-center justify-center gap-4 lg:gap-8">
                        <button
                          type="button"
                          className="py-1 px-3 border border-blue-500 text-blue-500 rounded-lg text-sm font-semibold lg:text-base lg:px-10 md:py-3 cursor-pointer hover:border-blue-500 hover:text-blue-500"
                          onClick={() => dispatch(setSelectedSkip(false))}
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          className="py-1 px-3 border border-blue-500 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:text-[#f7f8f9] lg:text-base lg:px-10 lg:py-3 cursor-pointer hover:border-[#f7f8f9]"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>
            </Suspense>
          )}
        </div>
      </section>
    </section>
  );
};

export default Skip;
