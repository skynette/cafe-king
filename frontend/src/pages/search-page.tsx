import { useSearchRestaurants } from '@/api/RestaurantApi'
import PaginationSelector from '@/components/pagination-selector';
import SearchResultInfo from '@/components/search-result-info';
import SearhResultsCard from '@/components/search-results-card';
import SearchBar, { SearchForm } from '@/components/searchbar';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { useParams } from 'react-router-dom'

export type SearchState = {
    searchQuery: string
    page: number
}

const SearchPage = () => {
    const { city } = useParams()
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1
    })
    const { results, isLoading } = useSearchRestaurants(searchState, city);

    if (isLoading) {
        return <span>Loading</span>
    }

    if (!results?.data || !city) {
        return <span>No results found</span>
    }

    const setPage = (page: number) => {
        setSearchState((prevState) => ({
            ...prevState,
            page
        }))
    }

    const setSearchQuery = async (searchFormData: SearchForm) => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery,
            page: 1,
        }))
    }

    const resetSearch = async () => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: "",
            page: 1,
        }))
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-[220px_1fr] gap-5'>
            <div id="cuisines-list">
                list of cuisines
            </div>

            <div id='main-content' className='flex flex-col gap-5'>
                <SearchBar
                    searchQuery={searchState.searchQuery}
                    onSubmit={setSearchQuery}
                    placeholder='search by cuisine or restaurant name'
                    onReset={resetSearch}
                />

                <SearchResultInfo total={results.pagination.total} city={city} />
                {results.data.map((restaurant, index) => (
                    <>
                        <SearhResultsCard restaurant={restaurant} key={index} />
                        {index < results.data.length - 1 && <Separator />}
                    </>
                ))}
                <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage} />
            </div>
        </div>
    )
}

export default SearchPage