import { authLinkToken, httpLink } from '$utils/graphql';
import { useLazyQuery } from '@apollo/client';
import { queryAllDebitAccount } from 'app/[kudoku]/query';
import { getCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DebitTransaction() {
  const token = getCookie('token') as string;
  const searchParamsDebit = useSearchParams().get('debitAccount');
  const [isEmpty, setIsEmpty] = useState(false);
  const rupiah = (number: any) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };
  const [accountDebitItems, setAccountDebitItems] = useState({
    currency: '',
    balance: '',
  });
  const [debitAccount, { client }] = useLazyQuery(queryAllDebitAccount);
  client.setLink(authLinkToken(token).concat(httpLink));
  const getAllDebitAccount = () => {
    return new Promise((resolve, reject) => {
      debitAccount()
        .then((res: any) => {
          let length = res.data.getAllDebitAccount.length;
          let data = res.data.getAllDebitAccount;
          let tempArray = { currency: '', balance: '' };

          if (length > 0) {
            for (let i = 0; i < length; i++) {
              if (data[i].accountNumber === searchParamsDebit) {
                tempArray = {
                  currency: data[i].balance,
                  balance: data[i].balance,
                };
              }
            }

            setAccountDebitItems(tempArray);
          } else if (length <= 0) {
            setIsEmpty(true);
          }

          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  useEffect(() => {
    getAllDebitAccount();
  }, [searchParamsDebit]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl">
          Saldo saat ini :{' '}
          <span className="text-secondary dark:text-secondaryDark font-bold">
            {rupiah(accountDebitItems.balance)}
          </span>
        </h1>
        <h2>
          Halam ini sedang dalam pengembangan dikarenakan kami belum mendapatkan
          data transaksi untuk akun ini.
        </h2>
      </div>
    </>
  );
}
