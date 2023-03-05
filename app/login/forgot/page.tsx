'use client';
import LoginButton from '$components/Button/LoginButton';
import PasswordInput from '$components/InputPlaceholder/PasswordInput';
import TextInput from '$components/InputPlaceholder/TextInput';
import LottieFC from '$components/Lottie';
import Checked from '$components/Lottie/Checked';
import { censorEmail, censorNumber } from '$utils/helper/censor';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FormEventHandler, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import OtpInput from 'react-otp-input';
import { userSignUp } from './mutation';
import {
  confirmEmailOtp,
  confirmWaOtp,
  getEmailOtp,
  getUser,
  getWaOtp,
} from './query';

interface IUser {
  email: string;
  whatsapp: string;
}

export default function Page() {
  const router = useRouter();

  const [progress, setProgress] = useState(1);

  const [otpWa, setOtpWa] = useState('');
  const [otpEmail, setOtpEmail] = useState('');

  const [jwtToken, setJwtToken] = useState('');

  const [selectedOption, setSelectedOption] = useState('');

  const [username, setUsername] = useState('');

  const [user, setUser] = useState({} as IUser);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordUppercase, setPasswordUppercase] = useState(false);
  const [passwordLowercase, setPasswordLowercase] = useState(false);
  const [passwordSymbol, setPasswordSymbol] = useState(false);
  const [passwordNumber, setPasswordNumber] = useState(false);
  const [passwordMinEightChar, setPasswordMinEightChar] = useState(false);
  const [passwordAndConfirmPassword, setPasswordAndConfirmPassword] =
    useState(false);
  const [allConditions, setAllConditions] = useState(false);

  useEffect(() => {
    if (password === '') {
      setPasswordMinEightChar(false);
      setPasswordLowercase(false);
      setPasswordUppercase(false);
      setPasswordSymbol(false);
      setPasswordNumber(false);
      setPasswordAndConfirmPassword(false);
    }

    if (confirmPassword === '') setPasswordAndConfirmPassword(false);

    if (password.length > 7) setPasswordMinEightChar(true);
    else if (!(password.length > 7)) setPasswordMinEightChar(false);

    if (/[A-Z]/g.test(password)) setPasswordUppercase(true);
    else if (!/[A-Z]/g.test(password)) setPasswordUppercase(false);

    if (/[a-z]/g.test(password)) setPasswordLowercase(true);
    else if (!/[a-z]/g.test(password)) setPasswordLowercase(false);

    if (/[0-9]/g.test(password)) setPasswordNumber(true);
    else if (!/[0-9]/g.test(password)) setPasswordNumber(false);

    if (/[!@#$%^&*)\\/(+=._-]/g.test(password)) setPasswordSymbol(true);
    else if (!/[!@#$%^&*)\\/(+=._-]/g.test(password)) setPasswordSymbol(false);

    if (password === confirmPassword && confirmPassword !== '')
      setPasswordAndConfirmPassword(true);
    else if (password !== confirmPassword) setPasswordAndConfirmPassword(false);

    if (
      password &&
      confirmPassword &&
      passwordMinEightChar &&
      passwordLowercase &&
      passwordUppercase &&
      passwordNumber &&
      passwordSymbol &&
      passwordAndConfirmPassword
    )
      setAllConditions(true);
    else setAllConditions(false);
  }, [
    confirmPassword,
    password,
    passwordMinEightChar,
    passwordLowercase,
    passwordUppercase,
    passwordNumber,
    passwordSymbol,
    passwordAndConfirmPassword,
  ]);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    toast
      .promise(userSignUp({ password, jwtToken }), {
        loading: 'Ganti password kamu...',
        success: 'Pergantian password sukses!',
        error: 'Gagal ganti password kamu!',
      })
      .then(() => {
        //FULFILLED
        setProgress(6);
      });
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const renderProgress = () => {
    if (progress === 1) {
      return (
        <>
          <form
            className="flex flex-col gap-4"
            onSubmit={async (e) => {
              e.preventDefault();

              toast
                .promise(getUser(username), {
                  loading: 'Cek username kamu...',
                  success: 'Username ditemukan',
                  error: 'Username tidak ditemukan!',
                })
                .then((data) => {
                  //FULFILLED
                  setUser({ email: data.email, whatsapp: data.whatsapp });
                  setProgress(2);
                });
            }}
          >
            <h1 className="text-2xl font-medium text-onPrimaryContainer dark:text-surfaceVariant">
              <span className="text-primary dark:text-primaryDark">Lupa</span>{' '}
              <span className="text-secondary dark:text-secondaryDark">
                Password
              </span>
              ? Reset Password Kamu!
            </h1>

            <TextInput
              placeholder="Username"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              onKeyPress={(e) => {
                if (!/^[a-zA-Z0-9]*$/g.test(e.key)) {
                  e.preventDefault();
                }
              }}
              minLength={5}
              required={true}
            />

            <div className="w-full h-fit flex items-center justify-end mt-4">
              <LoginButton type="submit" disabled={!username}>
                Mulai
              </LoginButton>
            </div>
          </form>

          <motion.div
            className="mt-8 h-[5px] bg-primary dark:bg-primaryDark rounded-md"
            animate={{ width: '20%' }}
            style={{
              width: '0%',
            }}
            transition={{ duration: 2, type: 'spring' }}
          />
        </>
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
          <div className="flex flex-col gap-4">
            <h4 className="text-2xl font-medium text-onPrimaryContainer dark:text-surfaceVariant">
              Pilih metode kirim OTP yang kamu mau.
            </h4>
            <p className="text-onPrimaryContainer dark:text-surfaceVariant">
              Data-data ini data yang kamu masukkan saat registrasi Kudos
              pertama kali!
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center">
              <input
                type="radio"
                id="email"
                name="radio"
                value="email"
                checked={selectedOption === 'email'}
                onChange={handleOptionChange}
                className="hidden"
              />

              <label
                htmlFor="email"
                className={`flex items-center justify-center border border-gray-400 rounded-full w-6 h-6 transition-colors duration-200 ${
                  selectedOption === 'email'
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'hover:bg-gray-200'
                }`}
              >
                {selectedOption === 'email' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 19a9 9 0 110-18 9 9 0 010 18zm-1.414-8.828L6.586 9.172a1 1 0 111.414-1.414l1.414 1.414 5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </label>

              <span className="ml-3 text-onPrimaryContainer dark:text-surfaceVariant">
                Kirim OTP ke email <strong>{censorEmail(user.email)}</strong>
              </span>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="whatsapp"
                name="radio"
                value="whatsapp"
                checked={selectedOption === 'whatsapp'}
                onChange={handleOptionChange}
                className="hidden"
              />

              <label
                htmlFor="whatsapp"
                className={`flex items-center justify-center border border-gray-400 rounded-full w-6 h-6 transition-colors duration-200 ${
                  selectedOption === 'whatsapp'
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'hover:bg-gray-200'
                }`}
              >
                {selectedOption === 'whatsapp' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 19a9 9 0 110-18 9 9 0 010 18zm-1.414-8.828L6.586 9.172a1 1 0 111.414-1.414l1.414 1.414 5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </label>

              <span className="ml-3 text-onPrimaryContainer dark:text-surfaceVariant">
                Kirim OTP via SMS ke nomor{' '}
                <strong>{censorNumber(user.whatsapp)}</strong>
              </span>
            </div>
          </div>
          <div className="w-full h-fit flex items-center justify-end">
            <LoginButton
              onClick={() => {
                if (selectedOption === 'whatsapp') {
                  toast
                    .promise(getWaOtp(user.whatsapp), {
                      loading: 'Kirim OTP...',
                      success: 'Kirim OTP Sukses!',
                      error: 'Gagal kirim OTP!',
                    })
                    .then(() => {
                      //FULFILLED
                      setProgress(3);
                    });
                } else if (selectedOption === 'email') {
                  toast
                    .promise(getEmailOtp(user.email), {
                      loading: 'Kirim OTP...',
                      success: 'Kirim OTP Sukses!',
                      error: 'Gagal kirim OTP!',
                    })
                    .then(() => {
                      //FULFILLED
                      setProgress(4);
                    });
                }
              }}
              disabled={selectedOption === ''}
            >
              Lanjut
            </LoginButton>
          </div>
          <motion.div
            className="mt-8 h-[5px] bg-primary dark:bg-primaryDark rounded-md"
            animate={{ width: '35%' }}
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
          key={2}
        >
          <div className="flex flex-col gap-4">
            <h4 className="text-2xl font-medium text-onPrimaryContainer dark:text-surfaceVariant">
              Kudoku udah kirim sms ke{' '}
              <span className="text-primary dark:text-primaryDark">
                {censorNumber(user.whatsapp)}
              </span>
              .
            </h4>
            <p className="text-onPrimaryContainer dark:text-surfaceVariant">
              Masukkan kode otpnya dibawah yaa!
            </p>
            <OtpInput
              placeholder="123123"
              value={otpWa}
              onChange={setOtpWa}
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
          </div>
          <div className="w-full h-fit flex items-center justify-end">
            <LoginButton
              disabled={!otpWa || otpWa.length < 6}
              onClick={async () => {
                toast
                  .promise(
                    confirmWaOtp({ whatsapp: user.whatsapp, otp: otpWa }),
                    {
                      loading: 'Cek OTP...',
                      success: 'OTP benar!',
                      error: 'OTP salah!',
                    }
                  )
                  .then((data) => {
                    //FULFILLED
                    setJwtToken(data.token);
                    setProgress(5);
                  });
              }}
            >
              Lanjut
            </LoginButton>
          </div>
          <motion.div
            className="mt-8 h-[5px] bg-primary dark:bg-primaryDark rounded-md"
            animate={{ width: '50%' }}
            style={{
              width: '35%',
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
          key={3}
        >
          <div className="flex flex-col gap-4">
            <h4 className="text-2xl font-medium text-onPrimaryContainer dark:text-surfaceVariant">
              Kudoku udah kirim <b>email</b> ke{' '}
              {user.email && (
                <span className="text-primary dark:text-primaryDark">
                  {censorEmail(user.email)}
                </span>
              )}
              .
            </h4>
            <p className="text-onPrimaryContainer dark:text-surfaceVariant">
              Masukkan kode otpnya dibawah yaa!
            </p>
            <OtpInput
              placeholder="696969"
              value={otpEmail}
              onChange={setOtpEmail}
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
          </div>
          <div className="w-full h-fit flex items-center justify-end">
            <LoginButton
              disabled={!otpEmail || otpEmail.length < 6}
              onClick={async () => {
                toast
                  .promise(
                    confirmEmailOtp({ email: user.email, otp: otpEmail }),
                    {
                      loading: 'Cek OTP...',
                      success: 'OTP benar!',
                      error: 'OTP salah!',
                    }
                  )
                  .then((data) => {
                    //FULFILLED
                    setJwtToken(data.token);
                    setProgress(5);
                  });
              }}
            >
              Lanjut
            </LoginButton>
          </div>
          <motion.div
            className="mt-8 h-[5px] bg-primary dark:bg-primaryDark rounded-md"
            animate={{ width: '50%' }}
            style={{
              width: '35%',
            }}
            transition={{ duration: 2, type: 'spring' }}
          />
        </motion.div>
      );
    } else if (progress === 5) {
      return (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-8"
          key={4}
        >
          <div className="flex flex-col gap-4">
            <h4 className="text-2xl font-medium text-onPrimaryContainer dark:text-surfaceVariant">
              Sekarang,{' '}
              <strong className="text-primary dark:text-primaryDark">
                buat password baru
              </strong>{' '}
              kamu!
            </h4>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <PasswordInput
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required={true}
                />
                <div className="flex flex-wrap gap-4 mt-2">
                  <div
                    className={`flex flex-nowrap gap-2 items-center text-sm ${
                      passwordMinEightChar
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {passwordMinEightChar ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : (
                      <FontAwesomeIcon icon={faXmark} />
                    )}

                    <p>Password min. 8 karakter</p>
                  </div>
                  <div
                    className={`flex flex-nowrap gap-2 items-center text-sm ${
                      passwordLowercase
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {passwordLowercase ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : (
                      <FontAwesomeIcon icon={faXmark} />
                    )}

                    <p>Min. 1 lowercase</p>
                  </div>
                  <div
                    className={`flex flex-nowrap gap-2 items-center text-sm ${
                      passwordUppercase
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {passwordUppercase ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : (
                      <FontAwesomeIcon icon={faXmark} />
                    )}

                    <p>Min. 1 uppercase</p>
                  </div>
                  <div
                    className={`flex flex-nowrap gap-2 items-center text-sm ${
                      passwordNumber
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {passwordNumber ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : (
                      <FontAwesomeIcon icon={faXmark} />
                    )}

                    <p>Min. 1 angka</p>
                  </div>
                  <div
                    className={`flex flex-nowrap gap-2 items-center text-sm ${
                      passwordSymbol
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {passwordSymbol ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : (
                      <FontAwesomeIcon icon={faXmark} />
                    )}

                    <p>Min. 1 symbol</p>
                  </div>
                </div>
              </div>
              <div>
                <PasswordInput
                  placeholder="Confirm Password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  required={true}
                />
                <div
                  className={`flex flex-nowrap gap-2 items-center mt-2 text-sm ${
                    passwordAndConfirmPassword
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {passwordAndConfirmPassword ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faXmark} />
                  )}

                  <p>Password harus sama</p>
                </div>
              </div>
              <div className="w-full h-fit flex items-center justify-end mt-6">
                <LoginButton disabled={!allConditions}>Lanjut</LoginButton>
              </div>
            </form>
          </div>
          <motion.div
            className="mt-8 h-[5px] bg-primary dark:bg-primaryDark rounded-md"
            animate={{ width: '80%' }}
            style={{
              width: '50%',
            }}
            transition={{ duration: 2, type: 'spring' }}
          />
        </motion.div>
      );
    } else if (progress === 6) {
      return (
        <>
          <div className="flex flex-col justify-center items-center">
            <div className="w-[200px] h-fit">
              <LottieFC
                width={200}
                height={200}
                loop={false}
                animationData={Checked}
              />
            </div>
            <h6 className="text-onPrimaryContainer dark:text-surfaceVariant text-center text-xl">
              Reset password sukses! Silahkan masuk lewat login page Kudoku!
            </h6>
            <div className="w-full h-fit flex justify-end mt-10">
              <LoginButton onClick={() => router.push('/login')}>
                Login
              </LoginButton>
            </div>
          </div>
          <motion.div
            className="mt-8 h-[5px] bg-primary dark:bg-primaryDark rounded-md"
            animate={{ width: '100%' }}
            style={{
              width: '80%',
            }}
            transition={{ duration: 2, type: 'spring' }}
          />
        </>
      );
    }
  };

  return <div className="flex flex-col gap-8">{renderProgress()}</div>;
}
