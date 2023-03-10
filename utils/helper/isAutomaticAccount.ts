/**
 * Return if an account is tracked automatically or manual
 * From Kudoku's institutionId
 * @param institutionId - Kudoku's institutionId from MongoDB Database
 * @returns {boolean}
 */
export default function isAutomaticAccount(institutionId: string) {
  switch (institutionId) {
    case '63d8bb09a2b49c686d736525':
      return true;

    case '63d94170d3e050940af0caf2':
      return true;

    default:
      return false;
  }
}
