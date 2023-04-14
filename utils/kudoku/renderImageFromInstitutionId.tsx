import BCALogo from '$public/logo/bank/bca.png';
import FlazzLogo from '$public/logo/bank/flazz.png';
import GojekLogo from '$public/logo/bank/gojek.png';
import Image from 'next/image';

export default function renderImageFromInstitutionId({
  institutionId,
  height,
}: {
  institutionId: string;
  height: number;
}) {
  switch (institutionId) {
    /**
     * BCA
     */
    case '63d8bb09a2b49c686d736525':
      return (
        <Image
          src={BCALogo}
          width={height}
          height={height}
          alt="Logo BCA"
          layout="fixed"
          priority={true}
        />
      );

    /**
     * Gojek
     */
    case '63d94170d3e050940af0caf2':
      return (
        <Image
          width={height}
          src={GojekLogo}
          height={height}
          alt="Logo Gojek"
          layout="fixed"
          priority={true}
        />
      );

    /**
     * Flazz
     */

    case '6408f95f1ff428549fc7cbe4':
      return (
        <Image
          width={height}
          src={FlazzLogo}
          height={height}
          alt="Logo Flazz"
          layout="fixed"
          priority={true}
        />
      );
  }
}
