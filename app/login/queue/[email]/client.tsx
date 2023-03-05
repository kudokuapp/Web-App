'use client';
import LoginButton from '$components/Button/LoginButton';
import CalCom from '$lib/CalCom';
import AldiAvatar from '$public/avatar/aldi.png';
import FurqonAvatar from '$public/avatar/furqon.png';
import RizqyAvatar from '$public/avatar/rizqy.png';
import '$styles/animation.css';
import axios from 'axios';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import OtpInput from 'react-otp-input';
import { cekOtpEmail, getCodeEmail } from './promise';
import { Typeform } from './Typeform';

const fetchLastKudos = async () => {
  const host =
    process.env.NODE_ENV === 'production'
      ? 'https://app.kudoku.id'
      : 'http://localhost:3000';

  const url = new URL('/api/postgres/lastkudos', host);
  try {
    const { data } = await axios.get(url.href);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const useFetchLastKudos = (interval: number) => {
  const [data, setData] = useState<number | null>(null);

  useEffect(() => {
    const fetchDataInterval = setInterval(async () => {
      const data = await fetchLastKudos();
      setData(data);
    }, interval);

    return () => clearInterval(fetchDataInterval);
  }, [interval]);

  return data;
};

export default function Client({
  kudos,
  user,
  email,
}: {
  kudos: boolean;
  user: PostgresDataKudokuUser;
  email: string;
}) {
  const [progress, setProgress] = useState(1);
  const [otp, setOtp] = useState('');

  const lastKudos = useFetchLastKudos(2000);

  const caldata = [
    {
      name: 'Furqon Wilogo',
      title: 'Co-CEO',
      avatar: FurqonAvatar,
      calLink: 'furqon/kudoku',
    },
    {
      name: 'Rizqy Fachri',
      title: 'Co-CEO',
      avatar: RizqyAvatar,
      calLink: 'rizqy-fachri/kudoku',
    },
    {
      name: 'Aldi Megantara',
      title: 'CTO',
      avatar: AldiAvatar,
      calLink: 'aldi-megantara-arifin/30min',
    },
  ];

  const renderLastKudos = () => {
    if (!lastKudos) {
      return (
        <span className="px-2 py-1 bg-gradient-to-br from-primary to-secondary dark:from-primaryDark dark:to-secondaryDark dark:text-onPrimaryContainer text-surfaceVariant rounded-md shadow-md">
          Loading...
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 bg-gradient-to-br from-primary to-secondary dark:from-primaryDark dark:to-secondaryDark dark:text-onPrimaryContainer text-surfaceVariant rounded-md shadow-md">
          Kudos No. {lastKudos}
        </span>
      );
    }
  };

  const renderProgress = () => {
    if (kudos) {
      if (progress === 1) {
        return (
          <section className="flex flex-col gap-4">
            <h4 className="text-2xl font-medium text-onPrimaryContainer dark:text-surfaceVariant">
              Halo,{' '}
              <span className="text-primary dark:text-primaryDark">
                {user.firstname}
              </span>
              , Kudos{' '}
              <span className="text-secondary dark:text-secondaryDark">
                No. {user.id}
              </span>
              ! <span className="wave">👋🏼</span>
            </h4>
            <p className="text-onPrimaryContainer dark:text-surfaceVariant">
              Sepertinya kamu masih dalam antrian untuk menggunakan Kudoku 😞
            </p>
            <p className="text-onPrimaryContainer dark:text-surfaceVariant">
              Kudoku bakal kasih tau kapan giliranmu untuk pake app kita melalui
              email kamu di <b>{user.email}</b> ya!
            </p>
            <div className="w-full h-fit flex flex-col items-end justify-end mt-4 gap-2">
              <p className="text-xs text-onPrimaryContainer dark:text-surfaceVariant">
                Mau di invite lebih cepat?
              </p>
              <LoginButton onClick={() => setProgress(2)}>Mau!</LoginButton>
            </div>

            <motion.div
              className="mt-8 h-[5px] bg-primary dark:bg-primaryDark rounded-md"
              animate={{ width: '40%' }}
              style={{
                width: '0',
              }}
              transition={{ duration: 2, type: 'spring' }}
            />
          </section>
        );
      } else if (progress === 2) {
        return (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8"
            key={2}
          >
            <h4 className="text-2xl font-medium text-onPrimaryContainer dark:text-surfaceVariant">
              Kudoku tau lo,{' '}
              <span className="text-primary dark:text-primaryDark">
                {user.firstname}
              </span>
              , udah gak sabar banget pake app kita.
            </h4>
            <p className="text-onPrimaryContainer dark:text-surfaceVariant">
              Biar lo makin cepet pake app-nya, yuk ceritain ke founders Kudoku{' '}
              <b className="text-primary dark:text-primaryDark">
                kenapa Kudoku bakal bantu lo banget untuk ngatur keuangan lo?
              </b>
            </p>
            <p className="text-onPrimaryContainer dark:text-surfaceVariant">
              Langsung aja gas buat janji untuk meeting (pake Google Meet) sama
              founders Kudoku.
            </p>
            <div className="flex flex-col gap-4">
              {caldata.map((value, index) => {
                return <CalCom founders={value} user={user} key={index} />;
              })}
            </div>

            <motion.div
              className="mt-8 h-[5px] bg-primary dark:bg-primaryDark rounded-md"
              animate={{ width: '100%' }}
              style={{
                width: '40%',
              }}
              transition={{ duration: 2, type: 'spring' }}
            />
          </motion.div>
        );
      }
    } else {
      if (progress === 1) {
        return (
          <section className="flex flex-col gap-8">
            <h4 className="text-2xl font-medium text-onPrimaryContainer dark:text-surfaceVariant">
              Halo,{' '}
              <span className="text-primary dark:text-primaryDark">
                siapapun kamu
              </span>{' '}
              yang punya email{' '}
              <span className="text-secondary dark:text-secondaryDark">
                {email}
              </span>
            </h4>
            <p className="text-onPrimaryContainer dark:text-surfaceVariant">
              Nampaknya kamu belum jadi Kudos. Yuk daftar biar kamu jadi Kudos!
            </p>
            <div className="w-full flex justify-center items-center">
              <p className="text-onPrimaryContainer dark:text-surfaceVariant">
                Kamu akan jadi {renderLastKudos()}
              </p>
            </div>
            <div className="w-full h-fit flex items-center justify-end mt-4">
              <LoginButton
                onClick={() => {
                  toast
                    .promise(getCodeEmail(email), {
                      loading: 'Loading...',
                      success: 'Sukses kirim otp',
                      error: 'Servernya error',
                    })
                    .then(() => {
                      setProgress(2);
                    });
                }}
              >
                Daftar
              </LoginButton>
            </div>

            <p className="text-xs text-onPrimaryContainer dark:text-surfaceVariant mt-4">
              Kudos adalah panggilan untuk user Kudoku
            </p>

            <motion.div
              className="mt-8 h-[5px] bg-primary dark:bg-primaryDark rounded-md"
              animate={{ width: '20%' }}
              style={{
                width: '0%',
              }}
              transition={{ duration: 2, type: 'spring' }}
            />
          </section>
        );
      } else if (progress === 2) {
        return (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8"
            key={2}
          >
            <h4 className="text-2xl font-medium text-onPrimaryContainer dark:text-surfaceVariant">
              Pertama-tama, Kudoku udah kirim kode OTP ke email{' '}
              <span className="text-primary dark:text-primaryDark">
                {email}
              </span>
              !
            </h4>
            <p className="text-onPrimaryContainer dark:text-surfaceVariant">
              Isi kode OTPnya dibawah ini yaa!
            </p>
            <OtpInput
              placeholder="123123"
              value={otp}
              onChange={setOtp}
              numInputs={6}
              isInputNum={true}
              containerStyle={
                'w-full flex flex-row justify-between gap-1 mt-2 font-medium text-xl'
              }
              focusStyle={{ border: '2px solid #BA1B1B', outline: 'none' }}
              inputStyle={{
                backgroundColor: '#d6e3ff',
                borderRadius: '0.375rem',
                padding: '0.5rem',
                color: '#001a40',
                width: '100%',
                maxWidth: '60px',
                border: '2px solid #d6e3ff',
              }}
            />
            <div className="w-full h-fit flex items-center justify-end mt-4">
              <LoginButton
                onClick={() => {
                  toast
                    .promise(cekOtpEmail({ email, otp }), {
                      loading: 'Loading...',
                      success: 'Kode OTP benar!',
                      error: 'Kode OTP salah',
                    })
                    .then(() => {
                      setProgress(3);
                    });
                }}
                disabled={!otp || otp.length < 6}
              >
                Lanjut
              </LoginButton>
            </div>

            <motion.div
              className="mt-8 h-[5px] bg-primary dark:bg-primaryDark rounded-md"
              animate={{ width: '40%' }}
              style={{
                width: '20%',
              }}
              transition={{ duration: 2, type: 'spring' }}
            />
          </motion.div>
        );
      } else if (progress === 3) {
        return (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8"
            key={3}
          >
            <h4 className="text-2xl font-medium text-onPrimaryContainer dark:text-surfaceVariant">
              Nah sekarang, yuk isi{' '}
              <span className="text-primary dark:text-primaryDark">
                Form Registrasi{' '}
              </span>
              Kudoku!
            </h4>
            <p className="text-onPrimaryContainer dark:text-surfaceVariant">
              Klik tombol dibawah untuk isi formnya yaa!
            </p>
            <Typeform email={email} handleSubmit={() => setProgress(4)} />

            <motion.div
              className="mt-12 h-[5px] bg-primary dark:bg-primaryDark rounded-md"
              animate={{ width: '60%' }}
              style={{
                width: '40%',
              }}
              transition={{ duration: 2, type: 'spring' }}
            />
          </motion.div>
        );
      } else if (progress === 4) {
        return (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8"
            key={5}
          >
            <h4 className="text-2xl font-medium text-onPrimaryContainer dark:text-surfaceVariant">
              Terima kasih sudah isi form-nya! Kamu sudah resmi jadi{' '}
              <span className="text-primary dark:text-primaryDark">Kudos</span>!
            </h4>
            <p className="text-onPrimaryContainer dark:text-surfaceVariant">
              Kita akan undang lo buat make app secepatnya. Pantengin terus
              email dari Kudoku yaa.
            </p>
            <div className="w-full h-fit flex items-center justify-end mt-4">
              <Link href="https://kudoku.id" passHref target="_self">
                <LoginButton>Ke website</LoginButton>
              </Link>
            </div>

            <motion.div
              className="mt-12 h-[5px] bg-primary dark:bg-primaryDark rounded-md"
              animate={{ width: '100%' }}
              style={{
                width: '40%',
              }}
              transition={{ duration: 2, type: 'spring' }}
            />
          </motion.div>
        );
      }
    }
  };

  return <>{renderProgress()}</>;
}
