'use client';
/* eslint-disable @next/next/no-head-element */
import { ModalAddFinancialAccount } from '$components/ModalAddFinancialAccount/index';
import { ModalReconcile } from '$components/ModalReconcile';
import Sidebar from '$components/Sidebar/[menu]/page';
import '$styles/globals.css';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isHidden, setIsHidden] = useState(true);
  const [isHideBtn, setIsHideBtn] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [addAcount, setIsAddAccount] = useState(false);
  const [reconcile, setIsReconcile] = useState(false);

  const token = getCookie('token') as string;

  if (!token) router.push('/login');

  useEffect(() => {
    if (window.innerWidth <= 640) {
      setIsHidden(false);
      setIsHideBtn(false);
    }
    if (window.innerWidth > 640) {
      setIsHidden(true);
      setIsHideBtn(false);
    }
  }, []);

  return (
    <>
      <Sidebar setIsAddAccount={setIsAddAccount} />
      <div className="sm:ml-64">{children}</div>
      {addAcount ? (
        <ModalAddFinancialAccount setIsAddAccount={setIsAddAccount} />
      ) : (
        <></>
      )}
      {reconcile ? <ModalReconcile setIsReconcile={setIsReconcile} /> : <></>}
    </>
  );
}
