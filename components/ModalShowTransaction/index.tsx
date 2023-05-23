import { useContext } from 'react';
import { DeviceContext } from '../../context/DeviceContext';
import ModalShowTransactionDesktop from './ModalShowTransactionDesktop';
import ModalShowTransactionMobile from './ModalShowTransactionMobile';
import type { IModalShowTransaction } from './index.d';

const ModalShowTransaction: React.FC<IModalShowTransaction> = ({
  transaction,
  isOpen,
  onCloseModal,
  token,
  accountType,
  onSaveEditFunction,
  onDeleteFunction,
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
        onDeleteFunction={onDeleteFunction}
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
        onDeleteFunction={onDeleteFunction}
        onAddMerchant={onAddMerchant}
        merchantSubscription={merchantSubscription}
        getAllMerchant={getAllMerchant}
      />
    );
  }
};

export default ModalShowTransaction;
