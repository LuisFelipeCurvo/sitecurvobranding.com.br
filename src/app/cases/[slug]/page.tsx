import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";
import { CASES, getCase } from "@/lib/cases";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/cases/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) return {};

  const title = `${item.name} — Case`;
  const description = `Case de ${item.name}: criação de marca pela Curvo Branding, agência de branding em Cuiabá.`;

  return {
    title,
    description,
    alternates: { canonical: `/cases/${item.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: item.cover }],
    },
  };
}

export default async function CasePage({
  params,
}: PageProps<"/cases/[slug]">) {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) notFound();

  return (
    <main className="relative z-[45] min-h-screen bg-obsidian pb-32 pt-24 sm:pt-32">
      <div className="px-6 sm:px-14">
        <Link
          href="/#projetos"
          className="group mb-12 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-ash transition-colors hover:text-ghost"
        >
          <ArrowLeft
            className="size-4 transition-transform group-hover:-translate-x-0.5"
            strokeWidth={1.25}
          />
          Voltar pros cases
        </Link>

        <p className="mb-3 text-xs uppercase tracking-[0.16em] text-ash">
          &gt;&gt; Case
        </p>
        <h1 className="text-[clamp(30px,5.2vw,56px)] font-medium uppercase leading-[1] tracking-[-0.02em]">
          {item.name}
        </h1>
        {item.year ? (
          <p className="mt-4 text-xs uppercase tracking-[0.14em] text-ash">
            {item.year}
          </p>
        ) : null}
      </div>

      {/* galeria sangra a tela inteira — sem o container/padding acima, pra
          as fotos aparecerem no maior tamanho possível */}
      <div className="mt-14 flex flex-col gap-3 sm:mt-16 sm:gap-4">
        {item.images.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt={`${item.name} — ${i + 1}`}
            width={img.width}
            height={img.height}
            sizes="100vw"
            priority={i === 0}
            className="w-full h-auto"
          />
        ))}
      </div>

      <div className="px-6 sm:px-14">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-16 inline-flex items-center gap-2 py-2 text-xs uppercase tracking-[0.16em] text-ghost sm:mt-20"
        >
          <span className="border-b border-ghost/40 pb-1 transition-colors group-hover:border-ghost">
            Quero uma marca assim
          </span>
          <ArrowUpRight
            className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.25}
          />
        </a>
      </div>
    </main>
  );
}
