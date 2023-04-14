'use client';

import BCA from '$public/logo/bank/bca.png';
import KlikBCA from '$public/logo/bank/klikbca.png';
import MyBCA from '$public/logo/bank/mybca.png';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Footer } from '../other/Footer';

export default function BCAMenu({
  onClickKlikBca,
  onClickMyBcaInternet,
  onClickMyBcaMobile,
}: {
  onClickKlikBca: () => void;
  onClickMyBcaInternet: () => void;
  onClickMyBcaMobile: () => void;
}) {
  const menuItems = [
    {
      logo: KlikBCA,
      name: 'Klik BCA Internet Banking',
      description: 'Connect BCA via KlikBCA',
      subname: 'Bank BCA',
      brickInstitutionId: 2,
    },
    {
      logo: MyBCA,
      name: 'MyBCA Internet Banking',
      description: 'Connect BCA via MyBCA Internet',
      subname: 'Bank BCA',
      brickInstitutionId: 37,
    },
    {
      logo: MyBCA,
      name: 'MyBCA Mobile Banking',
      description: 'Connect BCA via MyBCA Mobile',
      subname: 'Bank BCA',
      brickInstitutionId: 38,
    },
  ];

  return (
    <motion.section
      className="max-w-[400px] flex flex-col gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col items-center justify-center gap-1">
        <Image
          src={BCA}
          alt={`Logo BCA`}
          width={30}
          height={30}
          quality={100}
          draggable={false}
          className="w-[30px] h-[30px]"
        />
        <h4 className="text-xl w-fit h-fit select-none font-bold text-onPrimaryContainer dark:text-onPrimaryContainerDark">
          BCA
        </h4>
        <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
          Pilih metode buat konek ke BCA.
        </h6>
      </div>

      <section className="flex flex-col gap-4 mb-8 mt-4">
        {menuItems.map((value, index) => {
          return (
            <section
              key={index}
              className="flex justify-between gap-4 items-center"
            >
              <section className="flex gap-2">
                <Image
                  src={value.logo}
                  alt={`Icon ${value.name}`}
                  width={30}
                  height={30}
                  quality={100}
                  draggable={false}
                  className="w-[30px] h-[30px]"
                />
                <section className="flex flex-col gap-0">
                  <p className="font-bold text-lg text-onPrimaryContainer dark:text-onPrimaryContainerDark">
                    {value.name}
                  </p>
                  <p className="max-w-[250px] text-onPrimaryContainer dark:text-onPrimaryContainerDark text-sm">
                    {value.description}
                  </p>
                </section>
              </section>

              <button
                className={`px-2 py-1 w-fit h-fit font-medium text-base rounded-md shadow-lg bg-primary dark:bg-primaryDark hover:bg-secondary dark:hover:bg-secondaryDark text-onPrimary dark:text-onPrimaryDark`}
                onClick={() => {
                  switch (value.brickInstitutionId) {
                    case 2:
                      onClickKlikBca();
                      break;

                    case 37:
                      onClickMyBcaInternet();
                      break;

                    case 38:
                      onClickMyBcaMobile();
                      break;
                  }
                }}
              >
                Connect
              </button>
            </section>
          );
        })}
      </section>

      <Footer />
    </motion.section>
  );
}
