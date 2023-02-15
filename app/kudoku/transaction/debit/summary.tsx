import { authLinkToken, httpLink } from '$utils/graphql';
import { useLazyQuery } from '@apollo/client';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { queryAllDebitAccount } from 'app/kudoku/query';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

export default function SummaryDebit({
  setIsTransactionDebitEmpty,
}: {
  setIsTransactionDebitEmpty: any;
}) {
  const token = getCookie('token') as string;
  const [hideBalance, setIsHiddeBalance] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const rupiah = (number: any) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };
  const [accountDebitItems, setAccountDebitItems] = useState([
    {
      currency: '',
      balance: '',
      accountNumber: '',
    },
  ]);
  const [debitAccount, { client }] = useLazyQuery(queryAllDebitAccount);
  client.setLink(authLinkToken(token).concat(httpLink));
  const getAllDebitAccount = () => {
    return new Promise((resolve, reject) => {
      debitAccount()
        .then((res: any) => {
          let length = res.data.getAllDebitAccount.length;
          let data = res.data.getAllDebitAccount;
          let tempArray = [];

          if (length > 0) {
            for (let i = 0; i < length; i++) {
              tempArray.push({
                currency: data[i].balance,
                balance: data[i].balance,
                accountNumber: data[i].accountNumber,
              });
            }

            setAccountDebitItems(tempArray);
          } else if (length <= 0) {
            setIsEmpty(true);
            setIsTransactionDebitEmpty(true);
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
  }, []);

  return (
    <>
      {accountDebitItems.map((item) => (
        <div className="bg-background rounded text-onSurfaceVariant py-4 px-4 flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <h4>Account</h4>
            <h4>BCA {item.accountNumber}</h4>
          </div>
          <div className="flex flex-row justify-between">
            <h4>Current balance</h4>
            {hideBalance ? (
              <>
                <div className="flex flex-row items-center gap-4 w-full self-center justify-end">
                  <h3 className="font-bold text-center text-secondary dark:text-secondaryDark">
                    Rp *********
                  </h3>
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="cursor-pointer"
                    size="sm"
                    onClick={() => setIsHiddeBalance(false)}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-row items-center gap-4 w-full self-center justify-end">
                  <h3 className="font-bold text-center text-secondary dark:text-secondaryDark">
                    {rupiah(item.balance)}
                  </h3>
                  <FontAwesomeIcon
                    icon={faEye}
                    className="cursor-pointer"
                    size="sm"
                    onClick={() => setIsHiddeBalance(true)}
                  />
                </div>
              </>
            )}
          </div>
          <hr className="border-outline" />
        </div>
      ))}
    </>
  );
}