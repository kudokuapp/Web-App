'use client';

import { useSubscription } from '@apollo/client';
import { faCircleQuestion, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { ChangeEventHandler, useEffect, useState } from 'react';
import ModalAddMerchant from '../ModalAddMerchant';
import RenderMerchantImage from '../RenderMerchantImage';
import type { IMerchant, ISearchMerchant } from './index.d';

const SearchMerchant: React.FC<ISearchMerchant> = ({
  token,
  firstMerchant,
  onSelectMerchant,
  onAddMerchant,
  merchantSubscription,
  getAllMerchant,
}) => {
  const [query, setQuery] = useState('');
  const [urlMerchant, setUrlMerchant] = useState('');
  const [results, setResults] = useState<IMerchant[]>([]);
  const [merchants, setMerchants] = useState<IMerchant[]>([]);
  const [showAddMerchant, setShowAddMerchant] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState<IMerchant | null>(
    firstMerchant
  );

  let [isOpen, setIsOpen] = useState(false);

  const variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const { data } = useSubscription(merchantSubscription);

  useEffect(() => {
    setLoading(true);

    (async () => {
      const merchants = await getAllMerchant(token); // get all merchant  first render
      setMerchants(
        merchants.map((v) => {
          return { id: v.id, name: v.name };
        })
      );
    })();

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (data) {
      const { newMerchantLive } = data;
      newMerchantLive as IMerchant;

      const array = [
        { id: newMerchantLive.id, name: newMerchantLive.name },
        ...merchants,
      ];

      setMerchants(array);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (firstMerchant.id !== '63d8b775d3e050940af0caf1') {
      // undefined merchant
      setQuery(firstMerchant.name);
      setSelectedMerchant(firstMerchant);
    }
  }, [firstMerchant]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSelectedMerchant(null);
    const query = event.target.value;
    setQuery(query);
    if (query.length > 0) {
      const filteredMerchants = merchants.filter((merchant) =>
        merchant.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredMerchants);
      setShowAddMerchant(filteredMerchants.length === 0);
    } else {
      setResults([]);
      setShowAddMerchant(false);
    }
  };

  const handleSelectMerchant = (merchant: IMerchant) => {
    setQuery(merchant.name);
    setSelectedMerchant(merchant);
    onSelectMerchant(merchant);
  };

  useEffect(() => {
    if (firstMerchant.id !== selectedMerchant?.id) {
      setSelectedMerchant(selectedMerchant);
      setQuery(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMerchant]);

  const handleAddMerchant = () => {
    // Handle add merchant logic here
    setIsOpen(true);
  };

  return (
    <>
      <motion.div
        className="relative w-full"
        animate={{
          rotate: [0, -10, 10, -10, 10, -5, 5, -5, 0],
          y: [0, -10, 10, -10, 10, -5, 5, -5, 0],
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">
              {selectedMerchant ? (
                <div className="w-[20px] h-[20px]">
                  <RenderMerchantImage
                    merchantId={selectedMerchant.id}
                    merchantName={selectedMerchant.name}
                    size={20}
                  />
                </div>
              ) : (
                <FontAwesomeIcon
                  icon={faCircleQuestion}
                  className="text-gray-500"
                  size={'xl'}
                />
              )}
            </span>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md leading-5 bg-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search for a merchant"
            value={query}
            onChange={handleInputChange}
          />
        </div>
        <AnimatePresence>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {results.length > 0 && !selectedMerchant && (
              <motion.ul className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md w-full shadow-lg">
                {loading && <LoadingSpinner />}
                {results.map((merchant) => (
                  <li
                    key={merchant.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-4 flex-nowrap items-center"
                    onClick={() => {
                      handleSelectMerchant(merchant);
                      onSelectMerchant(merchant);
                    }}
                  >
                    <div className="w-[20px] h-[20px]">
                      <RenderMerchantImage
                        merchantId={merchant.id}
                        merchantName={merchant.name}
                        size={20}
                      />
                    </div>
                    <span>{merchant.name}</span>
                  </li>
                ))}
              </motion.ul>
            )}

            {showAddMerchant && (
              <button
                className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md w-full shadow-lg px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-4 flex-nowrap items-center"
                onClick={handleAddMerchant}
              >
                <div className="w-[20px] h-[20px] border-2 border-primary rounded-sm flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="text-primary"
                    size={'sm'}
                  />
                </div>
                <span>Add merchant &apos;{query}&apos;</span>
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <ModalAddMerchant
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        query={query}
        setQuery={setQuery}
        urlMerchant={urlMerchant}
        setUrlMerchant={setUrlMerchant}
        onAddMerchant={onAddMerchant}
        token={token}
      />
    </>
  );
};

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-6 h-6 border-4 border-gray-400 rounded-full animate-spin"></div>
    </div>
  );
};

export default SearchMerchant;
