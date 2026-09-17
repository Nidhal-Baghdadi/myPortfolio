import type { StationId } from "@/scene/arena";

export type Action =
    | { kind: "station"; label: string; to: StationId }
    | { kind: "file"; label: string; href: `/${string}` }
    | { kind: "external"; label: string; href: `https://${string}` }
    | { kind: "email"; label: string; href: `mailto:${string}` }

export type BaseContent = { heading: string; lede: string; actions: readonly Action[] }

export type Section<Kind extends string, Item> = BaseContent & { kind: Kind; items: readonly Item[] }

export type StationContent =
    | (BaseContent & { kind: "plain" })     // Gate, Postern: no list
    | Section<"paragraphs", string>         // Podium
    | Section<"skills", string>             // Tool rack
    | Section<"projects", Project>          // Plinths
    | Section<"roles", Role>                // Statues



export type ProjectStatus = "Live" | "In development" | "Prototype";

/** An image with the text a reader needs: alt describes it, caption explains it. */
export type Figure = { src: `/${string}`; alt: string; caption: string };

export type Project = {
    slug: string;
    title: string;
    /** One line, shown under the title on the project page. */
    tagline: string;
    /** Short summary for the card on the Plinths panel. */
    description: string;
    tags: readonly string[];
    image: `/${string}`;
    facts: { role: string; period: string; status: ProjectStatus };
    /** Why the project exists. */
    problem: string;
    /** "How it works", in order. */
    steps: readonly string[];
    highlights: readonly { title: string; text: string }[];
    stack: readonly { area: string; items: readonly string[] }[];
    gallery: readonly Figure[];
    /** Public links only; a private repository is simply left out. */
    links: readonly Action[];
}

export type Role = {
    title: string;
    place: string;
    dates: string;
    description: string;
}



export type MyRecord<Keys extends string, Value> = { [K in Keys]: Value }