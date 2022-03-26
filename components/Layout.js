import Navbar from "./Navbar";


export default function Layout({ children }) {

    return (
        <>
            <div id="app" className="flex flex-col container mb-36 max-h-[100%]  max-w-[100%] ">

                {/* <div className="lg:w-1/5 mt-10  border-r-2 border-gray-500 lg:px-6 px-8 py-2 flex flex-col justify-between">
                    <Sidebar />
                </div> */}


                <div className="flex flex-col h-[100%] w-[100%]">

                    <div className="border shadow-b-md">
                        <Navbar />
                    </div>

                    <div className="flex justify-center">
                        <div className="mt-6 w-full">
                            {children}
                        </div>
                    </div>

                </div >

                <div className="mt-20">
                    <footer className="mt-24 text-gray-700 body-font">
                        <div className="bg-gray-200">
                            <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                                <p className="text-gray-500 text-sm text-center sm:text-left">© 2022 Xpace —
                                    <a href="https://twitter.com/thexovc" className="text-gray-600 ml-1" target="_blank" rel="noopener noreferrer">@thexovc</a>
                                </p >
                            </div >
                        </div >
                    </footer >

                </div >

            </div >
        </>
    )
}