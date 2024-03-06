import { CloseIconNew } from '@/components/icons/close-icon';
import { HandSign } from '@/components/icons/hand-sign';
import { StarIconNew } from '@/components/icons/star-icon';
import {
  useModalAction,
  useModalState,
} from '@/components/modal-views/context';
import routes from '@/config/routes';
import { REVIEW_POPUP_MODAL_KEY } from '@/lib/constants';
import rangeMap from '@/lib/range-map';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useCallback } from 'react';

const ReviewModal = () => {
  const {
    isOpen,
    data: { tracking_number },
  } = useModalState();
  const { closeModal } = useModalAction();
  const closeModalAction = useCallback(() => {
    Cookies.set(REVIEW_POPUP_MODAL_KEY, 'true', {
      expires: 1,
    });
    closeModal();
  }, []);
  return isOpen ? (
    <div className="fixed lg:bottom-4 bottom-16 right-2 shadow-400 lg:right-4 rounded-xl bg-light dark:bg-dark-250 max-w-full z-50 sm:max-w-md sm:w-ful text-dark dark:text-light">
      <div className="flex justify-between relative px-4 py-5 border-b border-light-400 dark:border-dark-300 lg:text-xl sm:text-lg text-base">
        <h2>
          You last order <span className="text-brand">{tracking_number}</span>{' '}
          is completed successfully!
        </h2>
        <button
          onClick={closeModalAction}
          aria-label="Close panel"
          className="inline-block outline-none focus:outline-0 px-3"
        >
          <CloseIconNew />
        </button>
      </div>
      <div className="p-4">
        <Link
          href={`${routes.orderUrl(tracking_number)}/payment`}
          className="hover:text-brand transition-colors lg:text-2xl text-xl mb-3 flex items-center gap-3"
        >
          <span>Rate your experience here.</span>
          <div className="relative">
            <div className="w-4 h-4 relative top-[1.875rem] left-[1.1875rem]">
              {rangeMap(4, (i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: [0, 1, 0], scale: 1.5 }}
                  exit={{ opacity: 0.3, scale: 1.7 }}
                  className="absolute rounded-full border dark:border-dark-300 border-light"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(0, 153, 123, 0.2) 0%, rgba(1, 97, 78, 0.2) 100%)',
                    width: `${100 + i * 50}%`,
                    height: `${100 + i * 50}%`,
                    zIndex: 4 - i,
                    top: `-${20 + i * 4}px`,
                    left: `-${20 + i * 4}px`,
                  }}
                  transition={{
                    duration: 3.4 + i,
                    repeat: Infinity,
                    delay: i * 1,
                    // repeatDelay: 4 - i,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </div>
            <HandSign className="text-brand" />
          </div>
        </Link>
        <div className="flex items-center gap-2">
          {rangeMap(5, (i) => (
            <motion.div
              key={`star-${i}`}
              transition={{
                duration: 1,
                repeatType: 'reverse',
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.2,
              }}
              initial={{ opacity: 0.2 }}
              animate={{ scale: [0.8, 1.2, 1], opacity: [0, 1] }}
              exit={{ opacity: 0 }}
            >
              <StarIconNew className="text-[#FFE03A] lg:text-xl text-base" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    ''
  );
};

export default ReviewModal;
