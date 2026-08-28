import { Hero } from "@/components/hero";
import { ClientSurfer } from "@/components/client-surfer";
import { BrandIntelligence } from "@/components/brand-intelligence";
import { Workflow } from "@/components/workflow";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <ClientSurfer />
      <BrandIntelligence />
      <Workflow />
    </main>
  );
}
