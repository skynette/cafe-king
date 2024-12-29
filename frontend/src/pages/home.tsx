import SearchBar, { SearchForm } from "@/components/searchbar"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate()
    
    const handleSearchSubmit = (searchFormValues: SearchForm) => {
        console.log("search submit then navigate")
        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`
        })
    }
    
    const handleResetFOrm = () => {}
    
    return (
        <div className="flex flex-col gap-12">
            <div className="bg-white md:px-32 rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16 z-10">
                <h1 className="text-5xl font-bold tracking-tight text-primary/95">
                    Tuck into a takeway today
                </h1>
                <span className="text-xl">Food is just a click away!</span>
                <SearchBar placeholder="search" onSubmit={handleSearchSubmit} onReset={handleResetFOrm}/>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
                <img src="/mobile.png" alt="Cafe King Hero 1"/>
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <span className="font-bold text-3xl tracking-tighter">
                        Order your favorite food
                    </span>
                    <span>
                        Download the app for amazing discounts 
                    </span>
                    <img src="/images/app-downloads.png" alt="App Store" className="w-1/2"/>
                </div>
            </div>
        </div>
    )
}

export default Home