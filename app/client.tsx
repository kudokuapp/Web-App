'use client';
import client from '$utils/graphql';
import { ApolloProvider } from '@apollo/client';
import { useEffect, useState } from 'react';

export function ApolloNextClient({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export function InstallDiv({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  /* 
  @important Change this state to true on Dev!!

  Change to false on prod!!
  */
  const [hasInstall, setHasInstall] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setHasInstall(true);
    }
  }, []);

  return <body>{hasInstall ? <>{children}</> : <RenderedComp />}</body>;
}

function RenderedComp() {
  return (
    <>
      <h1>Kontoooool</h1>
    </>
  );
}
