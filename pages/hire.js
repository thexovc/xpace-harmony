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
            <div class="p-4 mx-auto max-w-lg bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-between items-center mb-4">
                    <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">New users</h5>
                    <a href="#" class="text-xl font-medium text-blue-600 hover:underline dark:text-blue-500">
                        ...
                    </a>
                </div>
                <div class="flow-root">
                    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                        {users.map((user, index) => (
                            <li key={index} class="py-3 sm:py-4">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <img class="w-8 h-8 rounded-full" src={user.profileImage} alt="Neil image" />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {user.name}
                                        </p>
                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {user.walletAddress}
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        <a href={`/page?id=${user.walletAddress}`} className="py-2 px-3 text-white rounded-lg bg-blue-600 ml-auto font-semibold">
                                            Hire
                                        </a>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
}

export default Hire;