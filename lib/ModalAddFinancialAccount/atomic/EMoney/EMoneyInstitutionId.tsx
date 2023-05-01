import BNITapCash from '$public/logo/bank/bnitapcash.png';
import BRIBrizzi from '$public/logo/bank/bribrizzi.png';
import Flazz from '$public/logo/bank/flazz.png';
import MandiriEMoney from '$public/logo/bank/mandiriemoney.png';
import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Listbox, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Dispatch, Fragment, SetStateAction, useState } from 'react';

export const institutionIdList = [
  { name: 'Flazz BCA', picture: Flazz, mongoDbId: '6408f95f1ff428549fc7cbe4' },
  {
    name: 'Mandiri E-Money',
    picture: MandiriEMoney,
    mongoDbId: '642aca67936bd6b8d9428c26',
  },
  {
    name: 'BRI Brizzi',
    picture: BRIBrizzi,
    mongoDbId: '642acaa5936bd6b8d9428c27',
  },
  {
    name: 'BNI TapCash',
    picture: BNITapCash,
    mongoDbId: '642acad1936bd6b8d9428c28',
  },
];

export function EMoneyInstitutionId({
  institutionIdIndex,
  setInstitutionId,
}: {
  institutionIdIndex?: number;
  setInstitutionId: Dispatch<SetStateAction<string>>;
}) {
  const [selected, setSelected] = useState(
    institutionIdIndex
      ? institutionIdList[institutionIdIndex]
      : institutionIdList[0]
  );

  return (
    <div className="z-[999] w-full h-fit">
      <Listbox
        value={selected}
        onChange={(institution) => {
          setSelected(institution);
          setInstitutionId(institution.mongoDbId);
        }}
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <div className="flex items-center gap-2">
              <Image
                src={selected.picture}
                alt={`${selected.name} logo`}
                width={20}
                height={20}
                quality={100}
                draggable={false}
              />
              <span className="block truncate">{selected.name}</span>
            </div>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {institutionIdList.map((institution, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={institution}
                >
                  {({ selected }) => (
                    <>
                      <div className="flex items-center justify-start gap-2">
                        <Image
                          src={institution.picture}
                          alt={`${institution.name} logo`}
                          width={20}
                          height={20}
                          quality={100}
                          draggable={false}
                        />
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {institution.name}
                        </span>
                      </div>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
