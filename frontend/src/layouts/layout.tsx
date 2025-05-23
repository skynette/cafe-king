import Footer from "@/components/footer";
import Header from "@/components/Header";
import Hero from "@/components/hero";
// import ColorPaletteDisplay from "@/components/color";

type Props = {
    children: React.ReactNode;
    showHero?: boolean;
}

const layout = ({ children, showHero }: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            {showHero && <Hero />}

            <div className="container mx-auto flex-1 py-10">
                {/* <ColorPaletteDisplay /> */}
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default layout