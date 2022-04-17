import Layout from "../components/Layout";
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import { FaSearch } from 'react-icons/fa'
import { UserContext } from "../context/user";

const Course = () => {
    const router = useRouter()

    const [courses, setCourses] = useState([]);
    const [loading, setloading] = useState(false)

    const { userDetails, getUser } = useContext(UserContext)


    getUser()



    // Load all courses
    useEffect(async () => {
        // add your Realm App Id to the .env.local file

        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();


        try {
            const user = await app.logIn(credentials);
            const allCourse = await user.functions.xpaceViewCourses();
            setCourses(() => allCourse);

        } catch (error) {
            console.error(error);
        }
    }, [courses]);

    // make an order
    const createOrder = async (arg) => {
        setloading(true)

        const orderTrx = {
            owner: arg.owner,
            buyer: userDetails.walletAddress,
            courseid: arg.owner + userDetails.walletAddress + arg.name,
            price: arg.price,
            name: arg.name,
            pdf: arg.pdf,
            file: arg.file,
            status: "pending"
        };

        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();

        try {


            const user = await app.logIn(credentials);

            if (user) {

                const insertO = await user.functions.xpaceOrderTrx(orderTrx);

                console.log(insertO)

                router.push({
                    pathname: `/orderTrx`,
                });

            }

        } catch (error) {
            console.error(error);
        }
    }



    return (
        <Layout>
            <div className=" mb-30 h-screen w-full lg:px-40 px-3 py-2 lg:py-3">

                <div className="w-full">


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">

                        {courses.map((course, index) => (

                            <div key={index} className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {course.name}</h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 truncate"> {course.desc} </p>


                                <a onClick={() => createOrder(course)} className="inline-flex items-center hover:cursor-pointer py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Order Now
                                    <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </a>
                            </div>


                        ))}
                    </div>
                </div>


            </div>





        </Layout>
    );
}

export default Course;