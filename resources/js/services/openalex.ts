export interface JournalItem {
    id: string;
    title: string;
    publicationYear: number;
    doi: string | null;
    pdfUrl: string | null;
    authors: string[];
    abstract: string;
}

export interface OpenAlexRawWork {
    id: string;
    display_name: string;
    publication_year: number;
    doi: string;
    open_access: {
        is_oa: boolean;
        oa_url: string | null;
    };
    authorships: Array<{
        author: {
            display_name: string;
        };
    }>;
    abstract_inverted_index?: Record<string, number[]>;
}

export function reconstructAbstract(
    invertedIndex?: Record<string, number[]>,
): string {
    if (!invertedIndex) return 'Abstrak tidak tersedia untuk jurnal ini.';

    const words: string[] = [];
    for (const [word, positions] of Object.entries(invertedIndex)) {
        positions.forEach((pos) => {
            words[pos] = word;
        });
    }
    return words.join(' ').trim() || 'Abstrak tidak tersedia untuk jurnal ini.';
}

export async function fetchJournals(
    query: string,
    page: number = 1,
    yearFilter: string = '',
): Promise<{ results: JournalItem[]; totalPages: number }> {
    const mailto = import.meta.env.VITE_OPENALEX_MAILTO;

    let url = `https://api.openalex.org/works?search=${encodeURIComponent(query)}&filter=is_oa:true&per_page=6&page=${page}`;

    if (mailto) {
        url += `&mailto=${encodeURIComponent(mailto)}`;
    }

    if (yearFilter) {
        url = url.replace(
            '&filter=is_oa:true',
            `&filter=is_oa:true,publication_year:${yearFilter}`,
        );
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch journals from OpenAlex (${response.status})`,
        );
    }

    const data = await response.json();

    const results: JournalItem[] = data.results.map((work: OpenAlexRawWork) => {
        return {
            id: work.id,
            title: work.display_name || 'No Title',
            publicationYear: work.publication_year,
            doi: work.doi,
            pdfUrl: work.open_access?.oa_url || null,
            authors: work.authorships?.map((a) => a.author.display_name) || [],
            abstract: reconstructAbstract(work.abstract_inverted_index),
        };
    });

    return {
        results,
        totalPages: Math.ceil((data.meta.count || 0) / 6),
    };
}
