export default async function Page({
  params,
}: {
  params: { id: string; accountType: string };
}) {
  return (
    <>
      <p>{params.id}</p>
      <p>{params.accountType}</p>
    </>
  );
}
