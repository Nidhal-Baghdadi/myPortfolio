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



export type Project = {
    title: string;
    description: string;
    tags: readonly string[];
    image: `/${string}`;
    repo: `https://${string}`;
}

export type Role = {
    title: string;
    place: string;
    dates: string;
    description: string;
}



export type MyRecord<Keys extends string, Value> = { [K in Keys]: Value }