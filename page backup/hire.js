import Layout from "../components/Layout";
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import { useEffect, useState } from "react"
import Link from 'next/link'


const Hire = () => {
    const [users, setUsers] = useState([]);


    // Load all courses
    useEffect(async () => {
        // add your Realm App Id to the .env.local file
        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();

        try {
            const user = await app.logIn(credentials);
            const allCourse = await user.functions.xpaceViewUsers();
            setUsers(() => allCourse);

        } catch (error) {
            console.error(error);
        }
    }, [users]);


    return (
        <Layout>
            <div className="h-full w-full lg:px-40 px-3 py-2 lg:py-3">

                <div className="py-2 ">
                    <p className="text-xl font-semibold text-gray-700">Professionals</p>
                    <p className="text-md text-gray-400">7 Results Found</p>
                </div>


                <div className="w-full">
                    <ul>
                        {users.map((user, index) => (
                            <li key={index} className="flex border p-3 border-1 rounded-lg">
                                <div className="flex flex-row items-center justify-center"  >
                                    <img src={user.profileImage} alt="user" className="rounded-full w-10 h-10" />
                                    <div className="flex flex-col items-left justify-center ml-3">
                                        <p className="text-black font-semibold text-lg">{user.name} k</p>
                                        {/* <p className="text-sm text-gray-400">Product Designer</p> */}
                                    </div>
                                </div>
                                <a href={`/page?id=${user.walletAddress}`} className="py-2 px-3 text-white rounded-lg bg-blue-600 ml-auto font-semibold">
                                    View Profile
                                </a>

                            </li>

                        ))}
                    </ul>
                </div>

            </div>
        </Layout>
    );
}

export default Hire;