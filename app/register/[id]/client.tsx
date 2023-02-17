'use client';
import LoginButton from '$components/Button/LoginButton';
import PasswordInput from '$components/InputPlaceholder/PasswordInput';
import TextInput from '$components/InputPlaceholder/TextInput';
import LottieFC from '$components/Lottie';
import Checked from '$components/Lottie/Checked';
import unavailableusername from '$utils/data/unavailableusername';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ObjectId } from 'mongodb';
import { useRouter } from 'next/navigation';
import { FormEventHandler, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import OtpInput from 'react-otp-input';

interface IUser {
  _id: ObjectId;
  username?: string | undefined;
  password?: string | undefined;
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
  kudos: number;
}

export default function Client({ user }: { user: IUser }) {
  const router = useRouter();

  const [progress, setProgress] = useState(1);
  const [otpWa, setOtpWa] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  const querySignup = gql`
    mutation Mutation($signupId: ID!, $username: String!, $password: String!) {
      signup(id: $signupId, username: $username, password: $password) {
        token
      }
    }
  `;

  const [
    userSignup,
    {
      // loading: userSignupLoading,
      // eslint-disable-next-line no-unused-vars
      error: userSignupError,
      // data: userSignupData,
    },
  ] = useMutation(querySignup, {
    variables: {
      signupId: user._id,
      username: username,
      password: password,
    },
  });

  const queryGetUsername = gql`
    query Getalluser {
      getalluser {
        username
      }
    }
  `;

  // eslint-disable-next-line no-unused-vars
  const [getUsername, { data: allUsername }] = useLazyQuery(queryGetUsername);

  const { firstName, lastName, email, whatsapp, kudos } = user;

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

  const handleVerifyWa = () => {
    const confirmWaCode = () => {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const { data } = await axios.post('/api/verify/confirmcode', {
              receiver: `+${whatsapp}`,
              code: otpWa,
            });
            if (!data.valid || Object.keys(data).length === 0)
              throw new Error('Invalid OTP');
            resolve(data);
          } catch (e) {
            reject();
          }
        })();
      });
    };

    const getEmailCode = () => {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const { data } = await axios.post('/api/verify/getcode', {
              receiver: email,
              type: 'email',
            });
            if (!data || Object.keys(data).length === 0) throw new Error();
            resolve(data);
          } catch (e) {
            console.error(e);
            reject();
          }
        })();
      });
    };

    toast
      .promise(confirmWaCode(), {
        loading: 'Loading...',
        success: 'Sukses verifikasi OTP',
        error: 'Kode OTP salah',
      })
      .then(() => {
        toast
          .promise(getEmailCode(), {
            loading: 'Loading...',
            success: 'Sukses kirim OTP ke email',
            error: 'Servernya error',
          })
          .then(() => setProgress(3));
      });
  };

  const handleVerifyEmail = async () => {
    const confirmEmailCode = () => {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const { data } = await axios.post('/api/verify/confirmcode', {
              receiver: email,
              code: otpEmail,
            });
            if (!data || Object.keys(data).length === 0) throw new Error();
            resolve(data);
          } catch (e) {
            reject();
          }
        })();
      });
    };

    toast
      .promise(confirmEmailCode(), {
        loading: 'Loading...',
        success: 'Sukses verifikasi OTP',
        error: 'Kode OTP salah',
      })
      .then(() => setProgress(4));
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const getUsernamePromise = () => {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            // iterate through all username from graphql
            const {
              data: { getalluser },
            } = await getUsername();
            for (const element of getalluser) {
              if (element.username === username) {
                reject('Username not available');
              }
            }
            // iterate through all username from unavailable username
            for (const element of unavailableusername) {
              if (element === username) {
                reject('Username not available');
              }
            }
            resolve('Username available');
          } catch (e) {
            reject(e);
          }
        })();
      });
    };

    const signupPromise = () => {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const { data } = await userSignup();
            if (Object.keys(data).length === 0) reject();
            resolve(data);
          } catch (e) {
            reject(e);
          }
        })();
      });
    };
    toast
      .promise(getUsernamePromise(), {
        loading: 'Check apakah username tersedia...',
        success: 'Username tersedia!',
        error: 'Username tidak tersedia!',
      })
      .then(
        () => {
          setUsernameTakenError(false);
          toast
            .promise(signupPromise(), {
              loading: 'Registering...',
              success: 'Sukses registrasi!',
              error: 'Servernya error',
            })
            .then(() => {
              setProgress(5);
            });
        },
        () => {
          setUsernameTakenError(true);
        }
      );
  };

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
                Kudos No.{kudos}
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
              onClick={() => {
                const myPromise = () => {
                  return new Promise((resolve, reject) => {
                    (async () => {
                      try {
                        const { data } = await axios.post(
                          '/api/verify/getcode',
                          {
                            receiver: `+${whatsapp}`,
                            type: 'sms',
                          }
                        );
                        resolve(data);
                      } catch (e) {
                        reject();
                      }
                    })();
                  });
                };
                toast.promise(
                  myPromise().then(() => setProgress(2)),
                  {
                    loading: 'Loading...',
                    success: 'Sukses kirim otp',
                    error: 'Servernya error',
                  }
                );
              }}
            >
              Mulai
            </LoginButton>
          </div>
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
            <LoginButton onClick={handleVerifyWa}>Lanjut</LoginButton>
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
            <LoginButton onClick={handleVerifyEmail}>Lanjut</LoginButton>
          </div>
          <motion.div
            className="mt-8 h-[5px] bg-primary dark:bg-primaryDark rounded-md"
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                <LoginButton disabled={!allConditions}>Lanjut</LoginButton>
              </div>
            </form>
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
    } else if (progress === 5) {
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
