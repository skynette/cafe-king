import { useSearchRestaurants } from '@/api/RestaurantApi'
import SearchResultInfo from '@/components/search-result-info';
import SearhResultsCard from '@/components/search-results-card';
import { Separator } from '@/components/ui/separator';
import { useParams } from 'react-router-dom'

const SearchPage = () => {
    const { city } = useParams()
    const { results, isLoading } = useSearchRestaurants(city);

    if (isLoading) {
        return <span>Loading</span>
    }

    if (!results?.data || !city) {
        return <span>No results found</span>
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-[220px_1fr] gap-5'>
            <div id="cuisines-list">
                list of cuisines
            </div>

            <div id='main-content' className='flex flex-col gap-5'>
                <SearchResultInfo total={results.pagination.total} city={city} />
                {results.data.map((restaurant, index) => (
                    <>
                        <SearhResultsCard restaurant={restaurant} key={index} />
                        {index < results.data.length - 1 && <Separator />}
                    </>
                ))}
            </div>
        </div>
    )
}

export default SearchPage