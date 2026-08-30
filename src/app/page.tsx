import { Hero } from "@/components/hero";
import { ClientSurfer } from "@/components/client-surfer";
import { BrandIntelligence } from "@/components/brand-intelligence";
import { Workflow } from "@/components/workflow";
import { ScrollToHash } from "@/components/scroll-to-hash";

export default function Home() {
  return (
    <main className="relative">
      <ScrollToHash />
      <Hero />
      <ClientSurfer />
      <BrandIntelligence />
      <Workflow />
    </main>
  );
}
