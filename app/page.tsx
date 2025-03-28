import Hero from "@/components/hero"
import Features from "@/components/features"
import HowItWorks from "@/components/how-it-works"
import Demo from "@/components/demo"
import CTA from "@/components/cta"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white overflow-hidden">
      <Navbar />
      <Hero />
      <Demo />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  )
}

