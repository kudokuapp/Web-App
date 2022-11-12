'use client';
import LoginButton from '$components/Button/LoginButton';
import WaInput from '$components/InputPlaceholder/WaInput';
import { ifNumIsSixtyTwo, ifNumIsZero } from '$utils/helper/cleanNum';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEventHandler, useState } from 'react';
import toast from 'react-hot-toast';

export default function Page() {
  const router = useRouter();
  const [input, setInput] = useState('');

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    let whatsapp: string;
    e.preventDefault();

    if (input.charAt(0) === '0') whatsapp = ifNumIsZero(input);
    else if (input.charAt(0) === '6') whatsapp = ifNumIsSixtyTwo(input);
    else whatsapp = input;

    const firstPromise = () => {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const { data } = await axios.get('/api/mongodb/checkuserexist', {
              params: {
                //Add '62' to whatsapp number here
                wa: `62${whatsapp}`,
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
            router.push(`/login/queue/62${whatsapp}`);
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
                //Add '62' to whatsapp number here
                wa: `62${whatsapp}`,
              },
            });
            if (Object.keys(data).length === 0) throw new Error();
            router.push(`/login/queue/62${whatsapp}`);
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
          <WaInput
            placeholder="WhatsApp kamu"
            id="whatsapp"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <p className="text-justify text-xs text-onPrimaryContainer dark:text-surfaceVariant">
            Dengan mengisi nomor WhatsApp dan meng-klik ikon, kamu menyadari
            bahwa kamu telah membaca, mengerti, dan setuju dengan{' '}
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
            <LoginButton disabled={!input} onClick={handleClick}>
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
