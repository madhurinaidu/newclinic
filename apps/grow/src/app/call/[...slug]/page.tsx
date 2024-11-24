'use client';

import { Container, Jitsi } from '@grow/ui';
import { useRouter } from 'next/navigation';

export default function Call({ params }: { params: { slug: string[] } }) {
  const router = useRouter();

  return (
    <Container className="mt-4">
      <Jitsi
        roomName={params.slug[0]}
        name={params.slug[1]}
        onEnd={() => router.push('/')}
      />
    </Container>
  );
}
