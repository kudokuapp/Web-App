import { useContext } from 'react';
import { DeviceContext } from '../../context/DeviceContext';
import type { IModalShowTransaction } from './index.d';
import ModalShowTransactionDesktop from './ModalShowTransactionDesktop';
import ModalShowTransactionMobile from './ModalShowTransactionMobile';

const ModalShowTransaction: React.FC<IModalShowTransaction> = ({
  transaction,
  isOpen,
  onCloseModal,
  token,
  accountType,
  onSaveEditFunction,
  onAddMerchant,
  merchantSubscription,
  getAllMerchant,
}) => {
  const { isDesktop } = useContext(DeviceContext);

  if (isDesktop) {
    return (
      <ModalShowTransactionDesktop
        transaction={transaction}
        isOpen={isOpen}
        onCloseModal={onCloseModal}
        token={token}
        accountType={accountType}
        onSaveEditFunction={onSaveEditFunction}
        onAddMerchant={onAddMerchant}
        merchantSubscription={merchantSubscription}
        getAllMerchant={getAllMerchant}
      />
    );
  } else {
    return (
      <ModalShowTransactionMobile
        transaction={transaction}
        isOpen={isOpen}
        onCloseModal={onCloseModal}
        token={token}
        accountType={accountType}
        onSaveEditFunction={onSaveEditFunction}
        onAddMerchant={onAddMerchant}
        merchantSubscription={merchantSubscription}
        getAllMerchant={getAllMerchant}
      />
    );
  }
};

export default ModalShowTransaction;
