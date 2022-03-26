import Layout from "../components/Layout";
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import Link from 'next/link'

const Navbar = () => {
    const [userDetails, setUserDetails] = useState([]);
    const [toggle, setToggle] = useState(false)


    useEffect(async () => {

        const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();

        try {


            const resp = await window.solana.connect();
            const address = resp.publicKey.toString()
            // console.log(address)

            if (address) {
                const user = await app.logIn(credentials);
                const myDetails = await user.functions.xpaceGetUser(address);
                setUserDetails(() => myDetails);
            } else {
                router.push({
                    pathname: `/`,
                });
            }

        } catch (error) {
            console.error(error);
        }


    }, [userDetails]);

    const LogOut = async () => {
        try {
            await window.solana.disconnect()


            router.push({
                pathname: `/`,
            });


        } catch (err) {
            // { code: 4001, message: 'User rejected the request.' }
            console.log(err)
        }
    }

    const onToggle = () => {
        setToggle(!toggle)
    }


    return (


        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800" >
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link href="/profile" className="flex items-center">
                    <>
                        <img src="/assets/svg.svg" className="mr-3 h-6 sm:h-9" alt="Xpace Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Xpace</span>
                    </>
                </Link>
                <div className="flex items-center md:order-2">
                    <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="dropdown">
                        <span className="sr-only">Open user menu</span>
                        <img className="w-8 h-8 rounded-full" src={userDetails.profileImage}
                            alt="user photo" />
                    </button>



                    {/* <div className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top"
                        style={{ "position": "absolute", "inset": "auto auto 0px 0px", "margin": "0px", "transform": "translate3d(870.4px, 1134.4px, 0px)" }}>
                        <div className="py-3 px-4">
                            <span className="block text-sm text-gray-900 dark:text-white">{userDetails.name}</span>
                        </div>
                        <ul className="py-1" aria-labelledby="dropdown">
                            <li>
                                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</Link>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</Link>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</Link>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
                            </li>
                        </ul>
                    </div> */}
                    <button onClick={onToggle} data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" >
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <li className="block py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                            <Link href="/posts" aria-current="page">Posts</Link>
                        </li>
                        <li className="block py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                            <Link href="/course" >Courses</Link>
                        </li>
                        <li className="block py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                            <Link href="/hire" >Hire</Link>
                        </li>
                        <li className="block py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                            <Link href="/make_post" >Make a Post</Link>
                        </li>
                        <li className="block py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                            <Link href="/create_course" >Make a Course</Link>
                        </li>
                        <li className="block py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                            <Link href="/profile" >Profile</Link>
                        </li>
                        <li onClick={LogOut}>
                            <a className="block py-2 pr-4 
                            pl-3 text-gray-700 border-red-200 border-2 hover:bg-red-400">SignOut</a>
                        </li>

                    </ul>
                </div>
                {toggle && <div className=" justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <li className="block py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                            <Link href="/posts" aria-current="page">Posts</Link>
                        </li>
                        <li className="block py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                            <Link href="/course" >Courses</Link>
                        </li>
                        <li className="block py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                            <Link href="/hire" >Hire</Link>
                        </li>
                        <li className="block py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                            <Link href="/make_post" >Make a Post</Link>
                        </li>
                        <li className="block py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                            <Link href="/create_course" >Make a Course</Link>
                        </li>
                        <li className="block py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                            <Link href="/profile" >Profile</Link>
                        </li>
                        <li onClick={LogOut}>
                            <a className="block py-2 pr-4 
                            pl-3 text-gray-700 border-red-200 border-2 hover:bg-red-400">SignOut</a>
                        </li>

                    </ul>
                </div>}
            </div>
        </nav >

    );
}

export default Navbar;