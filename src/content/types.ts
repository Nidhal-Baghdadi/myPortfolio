import type { StationId } from "@/scene/arena";

export type Action =
    | { kind: "station"; label: string; to: StationId }
    | { kind: "file"; label: string; href: `/${string}` }
    | { kind: "external"; label: string; href: `https://${string}` }
    | { kind: "email"; label: string; href: `mailto:${string}` }

export type StationContent = {
    heading: string;
    lede: string;
    actions: readonly Action[]

}

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

export type Section<Item> = StationContent & { items: readonly Item[] }

export type MyRecord<Keys extends string, Value> = { [K in Keys]: Value }