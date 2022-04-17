import Layout from "../components/Layout";
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import { UserContext } from "../context/user";

const Page = () => {
    const [post, setPost] = useState([]);

    const { userDetails, getUser } = useContext(UserContext)

    getUser()



    // Load all Posts
    useEffect(async () => {
        // add your Realm App Id to the .env.local file
        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const profileID = urlParams.get("id")

        // console.log(profileID)


        try {


            const user = await app.logIn(credentials);
            const allPost = await user.functions.xpaceOnePost(profileID);
            setPost(() => allPost);

        } catch (error) {
            console.error(error);
        }
    }, [post]);

    return (
        <Layout>
            <div className="mx-5 md:mx-20  h-full rounded-lg bg-gray-300 px-2">
                <br /><br />
                <div className="flex flex-col w-full justify-center items-center mb-4">
                    <img src={userDetails.profileImage} style={{ width: "150px", height: "150px", borderRadius: "50%" }} className="bg-blue-100 p-3 border-2 border-black" />
                    <div className="mb-6 flex flex-col justify-center items-center">
                        <h1 className="font-bold text-gray-800 text-2xl">
                            {userDetails.name}
                        </h1>

                        <p className="my-4 font-medium truncate  w-2/3 text-gray-800">
                            {userDetails.walletAddress}
                        </p>

                        <h1 className="font-bold text-gray-800 text-xl">
                            Bio
                        </h1>

                        <p className="mb-4 font-medium text-gray-600">
                            {userDetails.bio}
                        </p>
                    </div>
                </div>
                <div className="max-w-md mx-auto shadow-lg bg-gray-200 rounded-lg overflow-hidden md:max-w-lg">
                    <div className="md:flex justify-center items-center">
                        <div className="mx-auto mt-8">
                            <div className="mb-6 flex flex-col items-center">

                                <p className="text-3xl justify-center font-semibold mb-2"></p>
                                <p className="text-lg text-gray-700 mt-2 w-10/12">
                                    {post.msg}
                                </p>

                                <button type="submit" className="text-white mt-6 bg-blue-700 
                            hover:bg-blue-800 rounded-md px-5  py-2.5 font-bold text-center">
                                    Send Message
                                </button>

                            </div>



                        </div>

                    </div>
                    <br />
                    <br />
                </div>
            </div>
        </Layout>
    );
}

export default Page;