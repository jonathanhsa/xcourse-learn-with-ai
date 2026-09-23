import { Head, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { useState, useEffect, useCallback } from 'react';
import { fetchJournals, type JournalItem } from '@/services/openalex';
import {
    Search,
    Brain,
    BookOpen,
    AlertCircle,
    FileText,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useStagger } from '@/hooks/use-anime';
import { animateHoverEnter, animateHoverLeave } from '@/lib/anime';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Material Repository',
        href: '/material-repository',
    },
];

// Simple debounce hook
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export default function MaterialRepository() {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 500);
    const [year, setYear] = useState<string>('all');
    const [page, setPage] = useState(1);

    const [journals, setJournals] = useState<JournalItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);

    const containerRef = useStagger<HTMLDivElement>(
        '.journal-card',
        [journals],
        {
            duration: 600,
            staggerMs: 80,
            yOffset: 20,
            delay: 50,
        },
    );

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        animateHoverEnter(e.currentTarget, -3, 1.01);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        animateHoverLeave(e.currentTarget);
    };

    const loadJournals = useCallback(
        async (searchQuery: string, searchYear: string, pageNum: number) => {
            setIsLoading(true);
            setError(null);
            try {
                // Default query if empty, as OpenAlex needs some query or it returns random/recent works
                const q = searchQuery.trim() || 'artificial intelligence';
                const y = searchYear === 'all' ? '' : searchYear;

                const response = await fetchJournals(q, pageNum, y);
                setJournals(response.results);
                setTotalPages(Math.min(response.totalPages, 100)); // Cap pages for sanity
            } catch (err: any) {
                setError(err.message || 'Failed to fetch journals');
                setJournals([]);
                setTotalPages(1);
            } finally {
                setIsLoading(false);
            }
        },
        [],
    );

    // Reset to page 1 when search or filter changes
    useEffect(() => {
        setPage(1);
    }, [debouncedQuery, year]);

    useEffect(() => {
        loadJournals(debouncedQuery, year, page);
    }, [debouncedQuery, year, page, loadJournals]);

    const handleTanyaAI = (journal: JournalItem) => {
        const prompt = `Tolong bantu saya memahami paper ini:\n\n*Judul:* ${journal.title}\n*Penulis:* ${journal.authors.join(', ')}\n*Tahun:* ${journal.publicationYear}\n\n*Abstrak:*\n${journal.abstract}\n\nJelaskan poin-poin utamanya secara sederhana.`;

        if (typeof window !== 'undefined') {
            localStorage.setItem('ai-pending-query', prompt);
        }
        router.visit('/ai-agents');
    };

    return (
        <>
            <Head title="Material Repository" />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-8">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Material Repository
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            Cari dan pelajari paper ilmiah secara real-time dari
                            OpenAlex.
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col items-center gap-4 rounded-xl border border-border/60 bg-card p-4 shadow-sm sm:flex-row">
                    <div className="relative w-full flex-1">
                        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Cari topik, judul, atau kata kunci..."
                            className="w-full bg-background pl-9"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex w-full shrink-0 items-center gap-2 sm:w-48">
                        <div className="hidden text-sm font-medium text-muted-foreground sm:block">
                            Tahun:
                        </div>
                        <Select
                            value={year}
                            onValueChange={(val: string) =>
                                setYear(val || 'all')
                            }
                        >
                            <SelectTrigger className="bg-background">
                                <SelectValue placeholder="Semua Tahun" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Tahun</SelectItem>
                                <SelectItem value="2026">2026</SelectItem>
                                <SelectItem value="2025">2025</SelectItem>
                                <SelectItem value="2024">2024</SelectItem>
                                <SelectItem value="2023">2023</SelectItem>
                                <SelectItem value="2022">2022</SelectItem>
                                <SelectItem value="2021">2021</SelectItem>
                                <SelectItem value="2020">2020</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Main Content */}
                <div className="min-h-[400px] w-full">
                    {isLoading ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <Card
                                    key={i}
                                    className="flex h-[320px] flex-col"
                                >
                                    <CardHeader className="gap-2">
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <Skeleton className="h-full w-full" />
                                    </CardContent>
                                    <CardFooter className="gap-2">
                                        <Skeleton className="h-10 w-1/2" />
                                        <Skeleton className="h-10 w-1/2" />
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="flex h-[400px] flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 text-center">
                            <AlertCircle className="mb-4 size-10 text-destructive" />
                            <h3 className="text-lg font-semibold">
                                Gagal Memuat Data
                            </h3>
                            <p className="mt-2 max-w-md text-muted-foreground">
                                {error}
                            </p>
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => loadJournals(query, year, page)}
                            >
                                Coba Lagi
                            </Button>
                        </div>
                    ) : journals.length === 0 ? (
                        <div className="flex h-[400px] flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 text-center">
                            <BookOpen className="mb-4 size-10 text-muted-foreground" />
                            <h3 className="text-lg font-semibold">
                                Tidak ada jurnal ditemukan
                            </h3>
                            <p className="mt-2 max-w-md text-muted-foreground">
                                Coba gunakan kata kunci yang berbeda atau ubah
                                filter tahun.
                            </p>
                        </div>
                    ) : (
                        <div
                            ref={containerRef}
                            className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                        >
                            {journals.map((journal) => (
                                <Card
                                    key={journal.id}
                                    className="journal-card flex h-full cursor-default flex-col justify-between overflow-hidden bg-card transition-shadow hover:shadow-md"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div className="flex flex-col">
                                        <CardHeader className="pb-3">
                                            <div className="mb-2 flex items-start justify-between gap-4">
                                                <Badge
                                                    variant="secondary"
                                                    className="border-primary/20 bg-primary/10 text-primary hover:bg-primary/20"
                                                >
                                                    Open Access
                                                </Badge>
                                                <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                                                    {journal.publicationYear}
                                                </span>
                                            </div>
                                            <CardTitle
                                                className="line-clamp-2 text-lg leading-tight"
                                                title={journal.title}
                                            >
                                                {journal.title}
                                            </CardTitle>
                                            <CardDescription className="line-clamp-1 text-xs">
                                                {journal.authors.length > 0
                                                    ? journal.authors.join(', ')
                                                    : 'Unknown Authors'}
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="pb-4">
                                            <div className="relative line-clamp-4 text-sm text-muted-foreground">
                                                {journal.abstract}
                                            </div>
                                        </CardContent>
                                    </div>

                                    <CardFooter className="mt-auto flex items-center gap-2 pt-0">
                                        {journal.pdfUrl ? (
                                            <Button
                                                variant="outline"
                                                className="flex h-9 flex-1 items-center justify-center text-xs"
                                                onClick={() =>
                                                    window.open(
                                                        journal.pdfUrl!,
                                                        '_blank',
                                                    )
                                                }
                                            >
                                                <FileText className="mr-1.5 size-3.5" />
                                                Baca PDF
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                className="flex h-9 flex-1 items-center justify-center text-xs"
                                                disabled
                                            >
                                                <FileText className="mr-1.5 size-3.5" />
                                                No PDF
                                            </Button>
                                        )}

                                        <Button
                                            variant="default"
                                            className="flex h-9 flex-1 items-center justify-center text-xs"
                                            onClick={() =>
                                                handleTanyaAI(journal)
                                            }
                                        >
                                            <Brain className="mr-1.5 size-3.5" />
                                            Tanya AI
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {!isLoading && journals.length > 0 && totalPages > 1 && (
                        <div className="mt-10 mb-4 flex items-center justify-center gap-1.5">
                            <Button
                                variant="outline"
                                size="icon"
                                disabled={page === 1}
                                onClick={() =>
                                    setPage((p) => Math.max(1, p - 1))
                                }
                                className="size-9 bg-card"
                            >
                                <ChevronLeft className="size-4" />
                            </Button>

                            {Array.from(
                                { length: Math.min(5, totalPages) },
                                (_, i) => {
                                    let startPage = Math.max(1, page - 2);
                                    let endPage = Math.min(
                                        totalPages,
                                        startPage + 4,
                                    );
                                    if (endPage - startPage < 4) {
                                        startPage = Math.max(1, endPage - 4);
                                    }

                                    const p = startPage + i;
                                    if (p > totalPages) return null;

                                    return (
                                        <Button
                                            key={p}
                                            variant={
                                                page === p
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            className={`size-9 ${page === p ? '' : 'bg-card text-muted-foreground hover:text-foreground'}`}
                                            onClick={() => setPage(p)}
                                        >
                                            {p}
                                        </Button>
                                    );
                                },
                            )}

                            <Button
                                variant="outline"
                                size="icon"
                                disabled={page === totalPages}
                                onClick={() =>
                                    setPage((p) => Math.min(totalPages, p + 1))
                                }
                                className="size-9 bg-card"
                            >
                                <ChevronRight className="size-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

MaterialRepository.layout = {
    breadcrumbs,
};
