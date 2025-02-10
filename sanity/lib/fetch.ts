import { createClient } from "next-sanity";

const client = createClient({
    projectId: "cijmx044",
    dataset: "production",
    useCdn: true,
    apiVersion: "2025-01-13",
})

export async function SanityFetch({query, params = {}}: {query: string, params?: any}) {
    return await client.fetch(query, params)
}