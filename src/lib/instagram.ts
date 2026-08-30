/**
 * Feed do Instagram via Behold (JSON API — não o widget). Buscado no servidor
 * com `revalidate: 3600`, então o consumo é ~24 chamadas/dia independente do
 * tráfego — cabe folgado no plano grátis do Behold (1.200/mês).
 * Feed: https://feeds.behold.so/EXFSBMMqw4FSiRNJUNlB
 */

const BEHOLD_FEED_URL = "https://feeds.behold.so/EXFSBMMqw4FSiRNJUNlB";

export interface InstagramPost {
  id: string;
  permalink: string;
  caption: string;
  /** capa quadrada (proxy do Behold, URL estável) */
  thumb: string;
  isVideo: boolean;
  isAlbum: boolean;
}

interface BeholdSize {
  mediaUrl: string;
}
interface BeholdPost {
  id: string;
  permalink: string;
  caption?: string;
  prunedCaption?: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  sizes?: { small?: BeholdSize; medium?: BeholdSize; large?: BeholdSize };
}
interface BeholdFeed {
  username: string;
  followersCount: number;
  posts: BeholdPost[];
}

export interface InstagramData {
  username: string;
  followersCount: number;
  posts: InstagramPost[];
}

export async function getInstagramFeed(): Promise<InstagramData | null> {
  try {
    const res = await fetch(BEHOLD_FEED_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = (await res.json()) as BeholdFeed;
    if (!data?.posts?.length) return null;

    return {
      username: data.username,
      followersCount: data.followersCount,
      posts: data.posts.slice(0, 8).map((p) => ({
        id: p.id,
        permalink: p.permalink,
        caption: (p.prunedCaption ?? p.caption ?? "").trim(),
        thumb:
          p.sizes?.medium?.mediaUrl ??
          p.sizes?.large?.mediaUrl ??
          p.sizes?.small?.mediaUrl ??
          p.mediaUrl,
        isVideo: p.mediaType === "VIDEO",
        isAlbum: p.mediaType === "CAROUSEL_ALBUM",
      })),
    };
  } catch {
    return null;
  }
}
