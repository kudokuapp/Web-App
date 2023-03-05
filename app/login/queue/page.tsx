'use client';
import LoginButton from '$components/Button/LoginButton';
import TextInput from '$components/InputPlaceholder/TextInput';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEventHandler, useState } from 'react';
import toast from 'react-hot-toast';
import {
  checkIfAlreadyInvited,
  checkIfUsernameExist,
  checkKudos,
} from './promise';

export default function Page() {
  const router = useRouter();
  const [input, setInput] = useState('');

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    toast
      .promise(checkIfUsernameExist(input), {
        loading: 'Cek apakah ada username...',
        success: 'Kamu sudah bisa login!',
        error: 'Kamu belum bisa login!',
      })
      .then(
        () => {
          // ON FULFILLED
          router.push('/login');
        },
        () => {
          // ON REJECTED
          toast
            .promise(checkIfAlreadyInvited(input), {
              loading: 'Cek apakah kamu sudah diundang...',
              success: 'Kamu sudah diundang masuk!',
              error: 'Kamu belum diundang!',
            })
            .then(
              (data: any) => {
                // ON FULFILLED
                router.push(`/register/${data.userId}`);
              },
              () => {
                // ON REJECTED
                toast
                  .promise(checkKudos(input), {
                    loading: 'Cek apakah kamu Kudos...',
                    success: 'Kamu sudah jadi Kudos!',
                    error: 'Kamu belum jadi Kudos!',
                  })
                  .then(
                    (data) => {
                      //FULFILLED
                      router.push(`/login/queue/${data.email}`);
                    },
                    () => {
                      //REJECTED
                      router.push(`/login/queue/${input}`);
                    }
                  );
              }
            );
        }
      );
  };

  return (
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
  );
}
