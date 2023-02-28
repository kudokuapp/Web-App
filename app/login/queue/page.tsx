'use client';
import LoginButton from '$components/Button/LoginButton';
import TextInput from '$components/InputPlaceholder/TextInput';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEventHandler, useState } from 'react';
import toast from 'react-hot-toast';

export default function Page() {
  const router = useRouter();
  const [input, setInput] = useState('');

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    const firstPromise = () => {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const { data } = await axios.get('/api/mongodb/checkuserexist', {
              params: {
                email: input,
              },
            });

            if (Object.keys(data).length === 0) throw new Error();

            if (data.hasUsername) {
              router.push('/login');
              reject('Already Kudos');
            } else if (data.exist) {
              router.push(`/register/${data.userId}`);
            }
            resolve(data);
          } catch (e) {
            router.push(`/login/queue/${input}`);
            console.error(e);
            reject();
          }
        })();
      });
    };

    const secondPromise = () => {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const { data } = await axios.get('/api/postgres/checkkudos', {
              params: {
                email: input,
              },
            });
            if (Object.keys(data).length === 0) throw new Error();
            router.push(`/login/queue/${input}`);
            resolve(data);
          } catch (e) {
            console.error(e);
            reject();
          }
        })();
      });
    };

    toast
      .promise(firstPromise(), {
        loading: 'Check antrian...',
        success: 'Kamu diundang masuk Kudoku',
        error: 'Udah ada username / Belom diundang',
      })
      .then(
        (data: any) => {
          toast.loading('Redirecting...', { duration: 2000 });
          router.push(`/register/${data.userId}`);
        },
        (e) => {
          if (e !== 'Already Kudos') {
            toast.promise(secondPromise(), {
              loading: 'Check antrian lagi...',
              success: 'Kamu sudah jadi Kudos',
              error: 'Kamu belum jadi Kudos',
            });
          }
        }
      );
  };

  return (
    <>
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-medium text-onPrimaryContainer dark:text-surfaceVariant">
          Hi, Kudos! Check antrian kamu disini.
        </h1>
        <div className="flex flex-col gap-3">
          <TextInput
            placeholder="Email"
            id="email"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            required={true}
          />

          <p className="text-justify text-xs text-onPrimaryContainer dark:text-surfaceVariant">
            Dengan mengisi email dan meng-klik ikon, kamu menyadari bahwa kamu
            telah membaca, mengerti, dan setuju dengan{' '}
            <Link
              href="https://kudoku.id/terms"
              target="_blank"
              className="hover:text-primary dark:hover:text-primaryDark"
            >
              Syarat dan Ketentuan
            </Link>{' '}
            dan{' '}
            <Link
              href="https://kudoku.id/privacy"
              target="_blank"
              className="hover:text-primary dark:hover:text-primaryDark"
            >
              Kebijakan Privasi
            </Link>{' '}
            Kudoku.
          </p>
          <div className="w-full h-fit flex items-center justify-end mt-3">
            <LoginButton
              disabled={
                !input ||
                !(input.length > 3) ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)
              }
              onClick={handleClick}
            >
              Check
            </LoginButton>
          </div>
        </div>
        <div className="mt-4 w-fit h-fit">
          <h4 className="text-onPrimaryContainer dark:text-surfaceVariant">
            Udah punya username?{' '}
            <Link href="/login" className="text-primary dark:text-primaryDark">
              Masuk
            </Link>
            .
          </h4>
        </div>
      </section>
    </>
  );
}
