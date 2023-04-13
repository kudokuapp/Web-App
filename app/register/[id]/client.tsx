'use client';
import LoginButton from '$components/Button/LoginButton';
import PasswordInput from '$components/InputPlaceholder/PasswordInput';
import TextInput from '$components/InputPlaceholder/TextInput';
import LottieFC from '$components/LottieFC';
import Checked from '$components/LottieFC/Checked';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import OtpInput from 'react-otp-input';
import { userSignUp } from './mutation';
import { checkIfUsernameIsAvailable } from './promise';
import { confirmEmailOtp, confirmWaOtp, getEmailOtp, getWaOtp } from './query';

export default function Client({ user }: { user: MongoDBUserData }) {
  const router = useRouter();

  const [progress, setProgress] = useState(1);
  const [jwtToken, setJwtToken] = useState('');
  const [otpWa, setOtpWa] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [usernameMinFiveChar, setUsernameMinFiveChar] = useState(false);
  const [usernameTakenError, setUsernameTakenError] = useState(false);

  const [passwordUppercase, setPasswordUppercase] = useState(false);
  const [passwordLowercase, setPasswordLowercase] = useState(false);
  const [passwordSymbol, setPasswordSymbol] = useState(false);
  const [passwordNumber, setPasswordNumber] = useState(false);
  const [passwordMinEightChar, setPasswordMinEightChar] = useState(false);

  const [passwordAndConfirmPassword, setPasswordAndConfirmPassword] =
    useState(false);

  const [allConditions, setAllConditions] = useState(false);

  const { firstName, lastName, email, whatsapp, kudosNo } = user;

  useEffect(() => {
    if (username === '') {
      setUsernameMinFiveChar(false);
    }
    if (username.length > 4) setUsernameMinFiveChar(true);
    else if (!(username.length > 4)) setUsernameMinFiveChar(false);

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
      username &&
      password &&
      confirmPassword &&
      usernameMinFiveChar &&
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
    username,
    confirmPassword,
    password,
    usernameMinFiveChar,
    passwordMinEightChar,
    passwordLowercase,
    passwordUppercase,
    passwordNumber,
    passwordSymbol,
    passwordAndConfirmPassword,
  ]);
  const renderProgress = () => {
    if (progress === 1) {
      return (
        <>
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-medium text-onPrimaryContainer dark:text-surfaceVariant">
              Selamat,{' '}
              <span className="text-primary dark:text-primaryDark">{`${firstName} ${lastName}`}</span>
              ,{' '}
              <span className="text-secondary dark:text-secondaryDark">
                Kudos No.{kudosNo}
              </span>{' '}
              kamu udah bisa cobain Kudoku!
            </h1>
            <p className="text-onPrimaryContainer dark:text-surfaceVariant">
              Sebelum nyobain aplikasi Kudoku, kamu harus buat username dan
              password dulu yaa! 😍
            </p>
          </div>
          <div className="w-full h-fit flex items-center justify-end">
            <LoginButton
              onClick={async () => {
                toast
                  .promise(getWaOtp(user.whatsapp), {
                    loading: 'Kirim OTP lewat SMS...',
                    success: 'Sukses kirim OTP!',
                    error: 'Error kirim OTP!',
                  })
                  .then(() => {
                    //FULFILLED
                    setProgress(2);
                  });
              }}
            >
              Mulai
            </LoginButton>
          </div>
          <motion.div
            className="mt-8 h-[5px] bg-primary dark:bg-primaryDark rounded-md"
            animate={{ width: '15%' }}
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
              Kudoku udah kirim sms ke{' '}
              <span className="text-primary dark:text-primaryDark">
                {whatsapp}
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
              onClick={() => {
                toast
                  .promise(
                    confirmWaOtp({ whatsapp: user.whatsapp, otp: otpWa }),
                    {
                      loading: 'Cek OTP...',
                      success: 'OTP benar!',
                      error: 'OTP salah!',
                    }
                  )
                  .then(() => {
                    //FULFILLED
                    toast
                      .promise(getEmailOtp(user.email), {
                        loading: 'Kirim OTP lewat email...',
                        success: 'Kirim OTP sukses!',
                        error: 'Gagal kirim OTP!',
                      })
                      .then(() => {
                        //FULFILLED
                        setProgress(3);
                      });
                  });
              }}
            >
              Lanjut
            </LoginButton>
          </div>
          <motion.div
            className="mt-8 h-[5px] bg-primary dark:bg-primaryDark rounded-md"
            animate={{ width: '30%' }}
            style={{
              width: '15%',
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
          <div className="flex flex-col gap-4">
            <h4 className="text-2xl font-medium text-onPrimaryContainer dark:text-surfaceVariant">
              Kudoku udah kirim <b>email</b> ke{' '}
              <span className="text-primary dark:text-primaryDark">
                {email}
              </span>
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
              onClick={() => {
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
                    setProgress(4);
                  });
              }}
            >
              Lanjut
            </LoginButton>
          </div>
          <motion.div
            className="mt-8 h-[5px] bg-primary dark:bg-primaryDark rounded-md"
            animate={{ width: '45%' }}
            style={{
              width: '30%',
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
              Buat PIN <b>Kudoku</b> kamu.
            </h4>
            <p className="text-onPrimaryContainer dark:text-surfaceVariant">
              PIN harus dalam berbentuk angka yaa!
            </p>
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-1">
                <p className="text-onPrimaryContainer dark:text-surfaceVariant text-sm">
                  PIN Kamu
                </p>
                <OtpInput
                  placeholder="696969"
                  value={pin}
                  onChange={setPin}
                  numInputs={6}
                  isInputNum={true}
                  containerStyle={
                    'w-full flex flex-row justify-between gap-1 font-medium text-xl'
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
              <div className="flex flex-col gap-1">
                <p className="text-onPrimaryContainer dark:text-surfaceVariant text-sm">
                  Konfirmasi PIN Kamu
                </p>
                <OtpInput
                  placeholder="696969"
                  value={confirmPin}
                  onChange={setConfirmPin}
                  numInputs={6}
                  isInputNum={true}
                  containerStyle={
                    'w-full flex flex-row justify-between gap-1 font-medium text-xl'
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
            </div>
          </div>
          <div className="w-full h-fit flex items-center justify-end">
            <LoginButton
              onClick={() => {
                setProgress(5);
              }}
              disabled={pin !== confirmPin || pin.length < 6}
            >
              Lanjut
            </LoginButton>
          </div>
          <motion.div
            className="mt-8 h-[5px] bg-primary dark:bg-primaryDark rounded-md"
            animate={{ width: '60%' }}
            style={{
              width: '45%',
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
              <b>Terakhir,</b> buat{' '}
              <span className="text-primary dark:text-primaryDark">
                username
              </span>{' '}
              dan{' '}
              <span className="text-secondary dark:text-secondaryDark">
                password
              </span>{' '}
              kamu yuk.
            </h4>
            <div className="flex flex-col gap-4">
              <div>
                <TextInput
                  placeholder="Username"
                  id="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUsernameTakenError(false);
                  }}
                  onKeyPress={(e) => {
                    if (!/^[a-zA-Z0-9]*$/g.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  required={true}
                  error={usernameTakenError}
                  errorMessage={`Username '${username}' tidak tersedia.`}
                />
                <div
                  className={`flex flex-nowrap gap-2 items-center mt-2 text-sm ${
                    usernameMinFiveChar
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {usernameMinFiveChar ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faXmark} />
                  )}

                  <p>Username min. 5 karakter</p>
                </div>
              </div>
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
                <LoginButton
                  disabled={!allConditions}
                  onClick={() => {
                    toast
                      .promise(checkIfUsernameIsAvailable(username), {
                        loading: 'Cek apakah username tersedia...',
                        success: 'Username tersedia!',
                        error: 'Username tidak tersedia!',
                      })
                      .then(() => {
                        //FULFILLED
                        toast
                          .promise(
                            userSignUp({
                              signupId: user._id,
                              username,
                              password,
                              pin,
                              jwtToken,
                            }),
                            {
                              loading: 'Daftarin kamu ke aplikasi Kudoku...',
                              success: 'Sukses!',
                              error: 'Error!',
                            }
                          )
                          .then(() => {
                            //FULFILLED
                            setProgress(6);
                          });
                      });
                  }}
                >
                  Lanjut
                </LoginButton>
              </div>
            </div>
          </div>
          <motion.div
            className="mt-8 h-[5px] bg-primary dark:bg-primaryDark rounded-md"
            animate={{ width: '80%' }}
            style={{
              width: '60%',
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
              Sukses registrasinya! Silahkan masuk lewat login page Kudoku!
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
