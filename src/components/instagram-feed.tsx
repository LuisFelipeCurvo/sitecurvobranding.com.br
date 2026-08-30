import { ArrowUpRight, Images, Play } from "lucide-react";
import { getInstagramFeed } from "@/lib/instagram";

/**
 * "Instagram" — grade dos últimos posts, puxada do Behold no servidor (cache
 * de 1h). Fica depois do Workflow, então leva `z-[45] bg-obsidian` pra tapar a
 * constelação, igual as seções de cima. Se o feed falhar, a seção some (return
 * null) — nunca quebra a página.
 */
export async function InstagramFeed() {
  const data = await getInstagramFeed();
  if (!data) return null;

  const handle = data.username;
  const posts = data.posts.slice(0, 4);

  return (
    <section
      id="instagram"
      className="relative z-[45] bg-obsidian px-6 py-28 sm:px-14 sm:py-40"
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-12">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-ash">
            &gt;&gt; Instagram
          </p>
          <h2 className="text-[clamp(26px,4vw,42px)] font-medium uppercase leading-[1] tracking-[-0.02em]">
            @{handle}
          </h2>
        </div>
        <a
          href={`https://www.instagram.com/${handle}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 py-2 text-xs uppercase tracking-[0.16em] text-ghost"
        >
          <span className="border-b border-ghost/40 pb-1 transition-colors group-hover:border-ghost">
            Seguir
          </span>
          <ArrowUpRight
            className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.25}
          />
        </a>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {posts.map((post) => (
          <li key={post.id}>
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={
                post.caption
                  ? `Instagram: ${post.caption.slice(0, 90)}`
                  : "Ver post no Instagram"
              }
              className="group relative block aspect-square overflow-hidden border border-ash/25 transition-colors hover:border-coral"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.thumb}
                alt={post.caption.slice(0, 120) || "Post da Curvo Branding no Instagram"}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
              />
              {(post.isVideo || post.isAlbum) && (
                <span className="absolute right-2 top-2 text-obsidian [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.5))]">
                  {post.isVideo ? (
                    <Play className="size-4 fill-current" strokeWidth={0} />
                  ) : (
                    <Images className="size-4" strokeWidth={1.5} />
                  )}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-[10px] uppercase tracking-[0.14em] text-ash/50">
        feed via behold.so
      </p>
    </section>
  );
}
