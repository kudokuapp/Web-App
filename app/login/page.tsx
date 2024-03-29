'use client';
import LoginButton from '$components/Button/LoginButton';
import PasswordInput from '$components/InputPlaceholder/PasswordInput';
import TextInput from '$components/InputPlaceholder/TextInput';
import { getCookie, setCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';
import { getUser, signIn } from './query';

export default function Page() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const token = getCookie('token');

  if (token) router.push('/kudoku/');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    toast
      .promise(signIn({ username, password }), {
        loading: 'Loading...',
        success: 'Sukses login!',
        error: 'Login gagal!',
      })
      .then((data) => {
        // FULFILLED

        setCookie('token', data.token, {
          domain:
            process.env.NODE_ENV === 'production'
              ? 'app.kudoku.id'
              : 'localhost',
          path: '/',
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
          // httpOnly: true, // Cannot use since this is client-side
          maxAge: 60 * 60 * 24 * 30,
        });

        getUser(username)
          .then((res) => {
            setCookie('user_id', res.id, {
              domain:
                process.env.NODE_ENV === 'production'
                  ? 'app.kudoku.id'
                  : 'localhost',
              path: '/',
              sameSite: 'strict',
              secure: process.env.NODE_ENV === 'production',
              maxAge: 60 * 60 * 24 * 30,
            });
            router.push('/kudoku/');
          })
          .catch(() => {
            toast.error('User gak nemu!');
          });
      });
  };

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-medium text-onPrimaryContainer dark:text-surfaceVariant">
        Kenalin{' '}
        <span className="text-primary dark:text-primaryDark">Kudoku</span>,
        aplikasi finansial yang serba ada.
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <TextInput
          placeholder="Username"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          minLength={5}
        />
        <div className="flex flex-col gap-2">
          <PasswordInput
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            minLength={8}
          />
          <Link
            href="/login/forgot"
            className="text-primary dark:text-primaryDark w-fit"
          >
            Lupa password?
          </Link>
        </div>
        <div className="w-full h-fit flex items-center justify-end mt-3">
          <LoginButton disabled={!username || !password}>Login</LoginButton>
        </div>
      </form>
      <div className="mt-4 w-fit h-fit">
        <h4 className="text-onPrimaryContainer dark:text-surfaceVariant">
          Belum punya username?{' '}
          <Link
            href="/login/queue"
            className="text-primary dark:text-primaryDark"
          >
            Check antrian
          </Link>
          .
        </h4>
      </div>
    </section>
  );
}
