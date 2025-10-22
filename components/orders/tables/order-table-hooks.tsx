import { useDebounce } from '@/hooks/use-debounce'
import { createQueryString } from '@/lib/utils'
import { PaginationState, SortingState } from '@tanstack/react-table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'

export function useProfilePagination() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    //* Search Params
    const page = parseInt(searchParams?.get('page') ?? '1')
    const limit = parseInt(searchParams?.get('limit') ?? '10')

    //* Handle server-side pagination
    const [{ pageIndex, pageSize }, setPagination] =
        React.useState<PaginationState>({
            pageIndex: Number(page) - 1,
            pageSize: Number(limit)
        })

    const pagination = React.useMemo(
        () => ({
            pageIndex: Number(page) - 1,
            pageSize: Number(limit)
        }),
        [page, limit]
    )

    React.useEffect(() => {
        setPagination({
            pageIndex: Number(page) - 1,
            pageSize: Number(limit)
        })
    }, [page, limit])

    // changed the route as well
    React.useEffect(() => {
        router.push(
            `${pathname}?${createQueryString(searchParams, {
                page: pageIndex + 1,
                limit: pageSize
            })}`
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize])

    return { pagination, setPagination }
}

export function useProfileSorting() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    //* Search Params
    const sort = searchParams?.get('sort') ?? 'id'
    const dir = searchParams?.get('dir') ?? 'desc'

    //* Handle server-side sorting
    const [[{ id, desc }], setSorting] = React.useState<SortingState>([
        { id: sort, desc: dir === 'desc' }
    ])

    const sorting = React.useMemo(
        () => [
            {
                id: sort,
                desc: dir === 'desc'
            }
        ],
        [sort, dir]
    )

    React.useEffect(() => {
        setSorting([{ id: sort, desc: dir === 'desc' }])
    }, [sort, dir])

    // changed the route as well
    React.useEffect(() => {
        if (id === 'id') return
        router.push(
            `${pathname}?${createQueryString(searchParams, {
                sort: id,
                dir: desc ? 'desc' : 'asc'
            })}`
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, desc])

    return { sorting, setSorting }
}

export function useProfileGlobalFilter() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    //* Search params
    const q = searchParams.get('q') ?? ''
    const [globalFilter, setGlobalFilter] = React.useState(q)
    const debouncedGlobalFilter = useDebounce(globalFilter, 750)

    React.useEffect(() => {
        setGlobalFilter(q)
    }, [q])

    // changed the route as well
    React.useEffect(() => {
        router.push(
            `${pathname}?${createQueryString(searchParams, {
                q: globalFilter,
                page: '1'
            })}`
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedGlobalFilter])

    return { globalFilter, debouncedGlobalFilter, setGlobalFilter }
}