import Image from 'next/image';

import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import mesh2 from '@/images/mesh2.png';

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-blue-600 py-32"
    >
      <Image className="" fill="cover" src={mesh2} alt="" unoptimized />
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Get started today
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            It&apos;s time to take control of your web3 data.
          </p>
          <Button href="/auth/signin" color="white" className="mt-10">
            Create your first invoice
          </Button>
        </div>
      </Container>
    </section>
  );
}
