import RenderMerchantImage from '../../RenderMerchantImage';
import SearchMerchant from '../../SearchMerchant';
import { ISearchMerchant } from '../../SearchMerchant/index.d';
import { IEditableTransaction } from '../index.d';

interface IRenderMerchant {
  isEdit: boolean;
  data: IEditableTransaction;
  isMerchantName: boolean;
  searchMerchant: ISearchMerchant;
}

export const RenderMerchant: React.FC<IRenderMerchant> = ({
  isEdit,
  data,
  isMerchantName,
  searchMerchant,
}) => {
  if (isEdit) {
    return (
      <>
        <SearchMerchant
          token={searchMerchant.token}
          firstMerchant={searchMerchant.firstMerchant}
          onSelectMerchant={searchMerchant.onSelectMerchant}
          onAddMerchant={searchMerchant.onAddMerchant}
          merchantSubscription={searchMerchant.merchantSubscription}
          getAllMerchant={searchMerchant.getAllMerchant}
        />
      </>
    );
  } else {
    if (!isMerchantName) {
      return (
        <div className="flex gap-2 items-center justify-start">
          <RenderMerchantImage
            merchantId={data.merchantId}
            merchantName={data.merchantName}
            size={40}
          />
          <p className="text-onPrimaryContainer dark:text-surfaceVariant text-xl">
            {data.merchantName}
          </p>
        </div>
      );
    } else {
      return <></>;
    }
  }
};
