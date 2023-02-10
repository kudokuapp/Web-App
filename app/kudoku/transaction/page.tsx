'use client';
import {
  faCalendar,
  faSquareCaretDown,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

export default function Page() {
  const [className, setIsClassName] = useState(
    'flex flex-col w-7/12 gap-4 border-r-2 border-outline'
  );
  useEffect(() => {
    if (window.innerWidth <= 640) {
      setIsHiddenTransaction(false);
      setIsClassName('flex flex-col w-screen gap-4 border-r-2 border-outline');
    }
    if (window.innerWidth > 640) {
      setIsHiddenTransaction(true);
      setIsClassName('flex flex-col w-7/12 gap-4 border-r-2 border-outline');
    }
  }, []);
  const [isHidden, setIsHidden] = useState(true);
  const [isHiddenTransaction, setIsHiddenTransaction] = useState(true);
  return (
    <section className="flex bg-onPrimary h-screen">
      <div className={className}>
        <header className="bg-onPrimary p-4 border-b-2 border-outline flex justify-between align-middle items-center">
          <h2 className="text-primary font-bold text-xl">All Transaction</h2>
          <button className="border-2 border-outline py-1 px-2 rounded-md">
            + Add Transaction
          </button>
        </header>
        <div className="overflow-auto gap-4 flex flex-col">
          <div className="flex flex-col py-4">
            <div className="flex flex-row justify-between p-4 bg-onPrimary text-black border-y-2 border-black align-middle items-center">
              <h2>YESTERDAY</h2>
              <div className="flex flex-row gap-4 items-center align-middle">
                <h4>-Rp. 75.000</h4>
                <button
                  className="text-sm h-5 w-4"
                  onClick={() => setIsHidden((c) => !c)}
                >
                  <FontAwesomeIcon icon={faSquareCaretDown} size="lg" />
                </button>
              </div>
            </div>
            {isHidden ? (
              <table className="table-auto mt-4">
                <tbody>
                  <tr className="flex justify-between w-full gap-x-4 px-4 py-1">
                    <td>Ketoprak</td>
                    <td>Cash</td>
                    <td>Makanan & Minuman</td>
                    <td>-Rp. 25.000</td>
                  </tr>
                  <tr className="flex justify-between w-full gap-x-4 px-4 py-1">
                    <td>Ketoprak</td>
                    <td>Cash</td>
                    <td>Makanan & Minuman</td>
                    <td>-Rp. 25.000</td>
                  </tr>
                  <tr className="flex justify-between w-full gap-x-4 px-4 py-1">
                    <td>Ketoprak</td>
                    <td>Cash</td>
                    <td>Makanan & Minuman</td>
                    <td>-Rp. 25.000</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col py-4">
            <div className="flex flex-row justify-between p-4 bg-onPrimary text-black border-y-2 border-black align-middle items-center">
              <h2>THURSDAY, 1 APRIL</h2>
              <div className="flex flex-row gap-4 items-center align-middle">
                <h4>-Rp. 75.000</h4>
                <button
                  className="text-sm h-5 w-4"
                  onClick={() => setIsHidden((c) => !c)}
                >
                  <FontAwesomeIcon icon={faSquareCaretDown} size="lg" />
                </button>
              </div>
            </div>
            <table className="table-auto mt-4">
              <tbody>
                <tr className="flex justify-between w-full gap-x-4 px-4 py-1">
                  <td>Ketoprak</td>
                  <td>Cash</td>
                  <td>Makanan & Minuman</td>
                  <td>-Rp. 25.000</td>
                </tr>
                <tr className="flex justify-between w-full gap-x-4 px-4 py-1">
                  <td>Ketoprak</td>
                  <td>Cash</td>
                  <td>Makanan & Minuman</td>
                  <td>-Rp. 25.000</td>
                </tr>
                <tr className="flex justify-between w-full gap-x-4 px-4 py-1">
                  <td>Ketoprak</td>
                  <td>Cash</td>
                  <td>Makanan & Minuman</td>
                  <td>-Rp. 25.000</td>
                </tr>
              </tbody>
            </table>
            <div className="flex flex-col w-2/3 items-center self-center border-2 rounded-md border-primary mt-4 p-4">
              <h4>Overview</h4>
              <h4 className="text-black font-bold">Maret 2022</h4>
              <div className="flex justify-between flex-row w-full p-4">
                <div className="flex flex-col items-center">
                  <h3 className="text-secondary font-bold text-xl">
                    Rp.20.000.000
                  </h3>
                  <h3 className="text-outline font-bold">Total Income</h3>
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="text-black font-bold text-xl">
                    Rp.15.000.000
                  </h3>
                  <h3 className="text-outline font-bold">Total Spend</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col py-4">
            <div className="flex flex-row justify-between p-4 bg-onPrimary text-black border-y-2 border-black align-middle items-center">
              <h2>THURSDAY, 1 APRIL</h2>
              <div className="flex flex-row gap-4 items-center align-middle">
                <h4>-Rp. 75.000</h4>
                <button
                  className="text-sm h-5 w-4"
                  onClick={() => setIsHidden((c) => !c)}
                >
                  <FontAwesomeIcon icon={faSquareCaretDown} size="lg" />
                </button>
              </div>
            </div>
            <table className="table-auto mt-4">
              <tbody>
                <tr className="flex justify-between w-full gap-x-4 px-4 py-1">
                  <td>Ketoprak</td>
                  <td>Cash</td>
                  <td>Makanan & Minuman</td>
                  <td>-Rp. 25.000</td>
                </tr>
                <tr className="flex justify-between w-full gap-x-4 px-4 py-1">
                  <td>Ketoprak</td>
                  <td>Cash</td>
                  <td>Makanan & Minuman</td>
                  <td>-Rp. 25.000</td>
                </tr>
                <tr className="flex justify-between w-full gap-x-4 px-4 py-1">
                  <td>Ketoprak</td>
                  <td>Cash</td>
                  <td>Makanan & Minuman</td>
                  <td>-Rp. 25.000</td>
                </tr>
              </tbody>
            </table>
            <div className="flex flex-col w-2/3 items-center self-center border-2 rounded-md border-primary mt-4 p-4">
              <h4>Overview</h4>
              <h4 className="text-black font-bold">Maret 2022</h4>
              <div className="flex justify-between flex-row w-full p-4">
                <div className="flex flex-col items-center">
                  <h3 className="text-secondary font-bold text-xl">
                    Rp.20.000.000
                  </h3>
                  <h3 className="text-outline font-bold">Total Income</h3>
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="text-black font-bold text-xl">
                    Rp.15.000.000
                  </h3>
                  <h3 className="text-outline font-bold">Total Spend</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isHiddenTransaction ? (
        <div className="flex flex-col w-5/12 gap-4">
          <header className="bg-onPrimary p-4 border-b-2 border-outline flex justify-between align-middle items-center">
            <h2 className="text-primary font-bold text-xl">
              Transaction Detais
            </h2>
            <button className="border-2 text-error py-1 border-error px-2 rounded-md">
              <FontAwesomeIcon icon={faTrash} size="sm" />
            </button>
          </header>
          <div className="flex flex-row justify-start gap-8 p-4 mt-2">
            <div className="flex flex-col justify-start">
              <h4 className="text-outline text-sm">Account</h4>
              <h4>Cash</h4>
            </div>
            <div className="flex flex-col justify-start">
              <h4 className="text-outline text-sm">Transaction Type</h4>
              <h4>Expense</h4>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-2 p-4 mt-2">
            <h4 className="text-outline text-sm">
              <FontAwesomeIcon icon={faCalendar} size="lg" /> Friday, 2 April
              2022
            </h4>

            <div className="flex flex-row justify-between">
              <h4>Ketoprak</h4>
              <h4>-RP25.000</h4>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-2 p-4 mt-2">
            <h4 className="text-outline text-sm">Category</h4>
            <p>Makanan & Minuman</p>
          </div>
          <hr className="p-2 mx-4 text-outline" />
          <div className="flex flex-col justify-between gap-2 p-4 mt-2">
            <h4 className="text-outline text-sm">Notes</h4>
            <textarea
              name=""
              id=""
              cols={30}
              rows={10}
              className="bg-neutralBackground rounded-sm p-2"
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
}
