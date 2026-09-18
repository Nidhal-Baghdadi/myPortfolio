import type { StationId } from "@/scene/arena";

export type Action =
    | { kind: "station"; label: string; to: StationId }
    | { kind: "file"; label: string; href: `/${string}` }
    | { kind: "external"; label: string; href: `https://${string}` }
    | { kind: "email"; label: string; href: `mailto:${string}` }

export type BaseContent = { heading: string; lede: string; actions: readonly Action[] }

export type Section<Kind extends string, Item> = BaseContent & { kind: Kind; items: readonly Item[] }

/** A labelled one-liner, e.g. "Based in: Tunisia". */
export type Fact = { label: string; value: string }

/** Skills of one kind, e.g. every back-end framework. */
export type SkillGroup = { area: string; items: readonly string[] }

export type StationContent =
    | (BaseContent & { kind: "plain" })                                        // Gate: no list
    | (BaseContent & { kind: "contact" })                                      // Postern: the contact form
    | (Section<"paragraphs", string> & { facts: readonly Fact[] })             // Podium
    | (Section<"skills", SkillGroup> & { core: readonly string[] })            // Tool rack: core is highlighted
    | Section<"projects", Project>                                             // Plinths
    | Section<"roles", Role>                                                  // Statues



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
    /** What kind of entry this is: shown in the timeline; the Statues stand for the latest Work entries. */
    type: "Work" | "Project" | "Education";
    title: string;
    place: string;
    dates: string;
    description: string;
}



export type MyRecord<Keys extends string, Value> = { [K in Keys]: Value }