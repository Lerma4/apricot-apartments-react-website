import fs from "node:fs/promises";
import path from "node:path";
import fm from "front-matter";

// Definisce dove si trovano le cartelle con i file markdown
const contentPath = path.join(process.cwd(), "app", "content", "apartments");

export interface ApartmentData {
    slug: string;
    title: string;
    price: string;
    coverImage: string;
    capacity: string;
    features: string[];
}

export interface FullApartmentData extends ApartmentData {
    body: string;
}

/**
 * Legge la cartella dei contenuti e ritorna i metadati essenziali (frontmatter)
 * di tutti gli appartamenti per popolare liste o card.
 */
export async function getAllApartments(): Promise<ApartmentData[]> {
    try {
        const files = await fs.readdir(contentPath);
        const mdxFiles = files.filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"));

        const apartments = await Promise.all(
            mdxFiles.map(async (fileName) => {
                const filePath = path.join(contentPath, fileName);
                const fileContent = await fs.readFile(filePath, "utf-8");
                const { attributes } = fm<Partial<ApartmentData>>(fileContent);

                return {
                    slug: fileName.replace(/\.mdx?$/, ""),
                    title: attributes.title || "Unknown",
                    price: attributes.price || "",
                    coverImage: attributes.coverImage || "",
                    capacity: attributes.capacity || "",
                    features: attributes.features || [],
                };
            })
        );

        return apartments;
    } catch (error) {
        console.error("Errore durante la lettura degli appartamenti:", error);
        return [];
    }
}

/**
 * Legge un file markdown specifico in base allo slug e ritorna metadati + contenuto.
 */
export async function getApartment(slug: string): Promise<FullApartmentData | null> {
    try {
        const filePath = path.join(contentPath, `${slug}.mdx`);

        // Potrebbe anche usare .md invece di .mdx
        let fileContent: string;
        try {
            fileContent = await fs.readFile(filePath, "utf-8");
        } catch {
            fileContent = await fs.readFile(path.join(contentPath, `${slug}.md`), "utf-8");
        }

        const { attributes, body } = fm<Partial<ApartmentData>>(fileContent);

        return {
            slug,
            title: attributes.title || "Unknown",
            price: attributes.price || "",
            coverImage: attributes.coverImage || "",
            capacity: attributes.capacity || "",
            features: attributes.features || [],
            body,
        };
    } catch (error) {
        console.error(`Errore durante la lettura dell'appartamento ${slug}:`, error);
        return null;
    }
}
