import Banner from "./Banner"
import Coming_Soon from "./Coming_Soon"
import Is_showing from "./Is_showing"
const Home_Page = () => {
    return (
        <>
            <Banner />
            <div className="container mx-auto p-4">
                <Is_showing />
                <hr className="my-4 border-t border-[#5C687F]" />
                <Coming_Soon />
            </div>
        </>
    )
}

export default Home_Page