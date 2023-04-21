import Head from 'next/head';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { PrimaryFeatures } from '../components/PrimaryFeatures';
import { SecondaryFeatures } from '../components/SecondaryFeatures';
import { CallToAction } from '../components/CallToAction';
import { Testimonials } from '../components/Testimonials';
import { Pricing } from '../components/Pricing';
import { Faqs } from '../components/Faqs';

export default function Home() {
  return (
    <>
      <Head>
        <title>Web3Pal - Crytpo Invoicing</title>
        <meta
          name="description"
          content="Making getting paid in crypto easier and faster."
        />
      </Head>
      <div className="">
        <Header />
        <Hero />
      </div>
      <main>
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        {/* <Testimonials /> */}
        {/* <Pricing /> */}
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
