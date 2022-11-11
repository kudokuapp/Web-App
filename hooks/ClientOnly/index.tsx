'use client';
import React, { useEffect, useState } from 'react';

const ClientOnly = ({
  children,
  ...delegated
}: {
  children: React.ReactNode;
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <React.Fragment {...delegated}>{children}</React.Fragment>;
};

export default ClientOnly;
