import { useSearchRestaurants } from '@/api/RestaurantApi'
import CuisineFilter from '@/components/cuisine-filter';
import PaginationSelector from '@/components/pagination-selector';
import SearchResultInfo from '@/components/search-result-info';
import SearhResultsCard from '@/components/search-results-card';
import SearchBar, { SearchForm } from '@/components/searchbar';
import SortOptionsDropDown from '@/components/sort-options-dropdown';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { useParams } from 'react-router-dom'

export type SearchState = {
    searchQuery: string
    page: number
    selectedCuisines: string[]
    sortOption: string
}

const SearchPage = () => {
    const { city } = useParams()
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOption: 'bestMatch',
    })

    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    const { results, isLoading } = useSearchRestaurants(searchState, city);

    if (isLoading) {
        return <span>Loading</span>
    }

    if (!results?.data || !city) {
        return <span>No results found</span>
    }

    const setSortOption = (sortOption: string) => {
        setSearchState((prevState) => ({
            ...prevState,
            sortOption,
            page: 1
        }))
    }

    const setSelectedCuisines = (selectedCuisines: string[]) => {
        setSearchState((prevState) => ({
            ...prevState,
            selectedCuisines,
            page: 1,
        }))
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
        <div className='grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-5'>
            <div id="cuisines-list">
                <CuisineFilter
                    isExpanded={isExpanded}
                    onExpandedClick={() => setIsExpanded((prev) => !prev)}
                    selectedCuisines={searchState.selectedCuisines}
                    onChange={setSelectedCuisines}
                />
            </div>

            <div id='main-content' className='flex flex-col gap-5'>
                <SearchBar
                    searchQuery={searchState.searchQuery}
                    onSubmit={setSearchQuery}
                    placeholder='search by cuisine or restaurant name'
                    onReset={resetSearch}
                />

                <div className='flex justify-between flex-col gap-3 lg:flex-row'>
                    <SearchResultInfo total={results.pagination.total} city={city} />
                    <SortOptionsDropDown sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)} />
                </div>

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