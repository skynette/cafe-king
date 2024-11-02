
const Home = () => {
    return (
        <div className="flex flex-col gap-12">
            <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16 z-10">
                <h1 className="text-5xl font-bold tracking-tight text-primary/95">
                    Tuck into a takeway today
                </h1>
                <span className="text-xl">Food is just a click away!</span>
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