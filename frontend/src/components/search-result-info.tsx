import { Link } from "react-router-dom"

type SearchResultInfoProps = {
    total: number
    city: string
}

const SearchResultInfo = ({ city, total }: SearchResultInfoProps) => {

    return (
        <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
            <span>
                {total} Restautants found in  {city}
                <Link to={"/"} className="ml-2 text-sm font-semibold underline cursor-pointer text-primary">Change location</Link>
            </span>
            sorting dropdown here
        </div>
    )
}

export default SearchResultInfo