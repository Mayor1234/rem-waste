import { Skip } from '../redux/features/skip/types';
import { useAppDispatch, useAppSelector } from '../redux/app/hook';
import { setSelectedSkip, setSkipData } from '../redux/features/skip/skipSlice';
import AnimateComponent from '../shared/AnimateComponent';

interface SkipCardProps {
  skip: Skip;
}

const SkipCard: React.FC<SkipCardProps> = ({ skip }) => {
  const dispatch = useAppDispatch();
  const { skipData, selectedSkip } = useAppSelector((state) => state.skip);

  const handleClick = () => {
    if (!selectedSkip) {
      dispatch(setSkipData(skip));
      dispatch(setSelectedSkip(true));
    } else {
      dispatch(setSkipData(null));
      dispatch(setSelectedSkip(false));
    }
  };
  console.log(skip);
  return (
    <>
      <AnimateComponent
        direction={{ initial_x: 0, initial_y: 50, duration: 0.5 }}
      >
        <div
          className={`rounded-lg leading-relaxed shadow-md shadow-blue-500/20 font-Montserrat cursor-pointer transition-all duration-500 ease-in-out hover:scale-105 ${
            skipData?.id === skip.id
              ? 'border border-blue-500 transition-transform duration-300 ease-in-out'
              : ''
          } ${
            !skip.allowed_on_road && !skip.allows_heavy_waste
              ? 'bg-neutral-200 opacity-50 pointer-events-none cursor-not-allowed cursor-'
              : ''
          } `}
          onClick={handleClick}
        >
          <div className="border-b border-blue-100 px-5 flex flex-col w-full py-3 rounded-t-lg">
            <p className="bg-blue-50 text-blue-500 border border-blue-300 text-2xl w-fit h-full py-2 px-5 text-end font-medium self-end rounded-3xl mb-3">
              {skip.size} Yard Skip
            </p>
            <div className="flex items-end mb-3 text-2xl">
              <h3
                className={`text-3xl font-medium text-blue-600 tracking-wide `}
              >
                £{skip.price_before_vat}
              </h3>
              <span className="text-sm text-gray-500 ml-2">per week</span>
            </div>
          </div>
          <div className="px-5 py-5 flex flex-col gap-1">
            <AnimateComponent
              direction={{ initial_x: 0, initial_y: 20, duration: 0.5 }}
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
                £{skip.vat} VAT
              </p>
            </AnimateComponent>
            {skip.transport_cost && (
              <AnimateComponent
                direction={{ initial_x: 0, initial_y: 20, duration: 0.5 }}
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
                  £{skip.transport_cost} Transport Cost
                </p>
              </AnimateComponent>
            )}

            {skip.per_tonne_cost && (
              <AnimateComponent
                direction={{ initial_x: 0, initial_y: 20, duration: 0.6 }}
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
                  £{skip.per_tonne_cost} Per Tonne Cost
                </p>
              </AnimateComponent>
            )}
            <AnimateComponent
              direction={{ initial_x: 0, initial_y: 20, duration: 0.8 }}
            >
              <p
                className={`flex items-center py-2 text-gray-700 ${
                  !skip.forbidden ? '' : ''
                }`}
              >
                <svg
                  className="w-3 h-3 text-blue-500  mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <polygon points="12,2 22,12 12,22 2,12"></polygon>
                </svg>
                {skip.forbidden ? 'Forbidden' : 'Allowed'}
              </p>
            </AnimateComponent>
            <AnimateComponent
              direction={{ initial_x: 0, initial_y: 20, duration: 0.9 }}
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
                {skip.postcode} Postcode
              </p>
            </AnimateComponent>
            <AnimateComponent
              direction={{ initial_x: 0, initial_y: 20, duration: 1 }}
            >
              {skip.area && (
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
                  {skip?.area && skip.area} Area
                </p>
              )}
            </AnimateComponent>
            <AnimateComponent
              direction={{ initial_x: 0, initial_y: 20, duration: 1 }}
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
                {skip.hire_period_days} Days Hire Period
              </p>
            </AnimateComponent>
            <AnimateComponent
              direction={{ initial_x: 0, initial_y: 20, duration: 1.1 }}
            >
              <div
                className={`flex items-center w-full py-2 text-gray-700 ${
                  !skip.allows_heavy_waste ? 'text-red-500' : ''
                }`}
              >
                <p>
                  {!skip.allows_heavy_waste ? (
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
                {skip.allows_heavy_waste
                  ? 'Allows Heavy Waste'
                  : 'Does Not Allow Heavy Waste'}
              </div>
            </AnimateComponent>
            <AnimateComponent
              direction={{ initial_x: 0, initial_y: 20, duration: 1.2 }}
            >
              <div
                className={`flex items-center py-2 text-gray-700 ${
                  !skip.allowed_on_road ? 'text-yellow-500' : ''
                }`}
              >
                <p>
                  {!skip.allowed_on_road ? (
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
                {skip.allowed_on_road
                  ? 'Allowed On Road'
                  : 'Not Allowed On Road'}
              </div>
            </AnimateComponent>

            <div className="py-5">
              {skipData?.id === skip.id ? (
                <button
                  type="button"
                  className="border border-blue-500 bg-transparent text-blue-500 w-full rounded-md py-3 mt-2 cursor-pointer font-medium"
                >
                  Selected
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-blue-500 text-white w-full rounded-md py-3 mt-2 cursor-pointer font-medium"
                >
                  Select This Skip
                </button>
              )}
            </div>
          </div>
        </div>
      </AnimateComponent>
    </>
  );
};

export default SkipCard;
