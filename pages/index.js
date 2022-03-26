import Layout from "../components/Layout";
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import { Modules } from 'web3'


const Home = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false)



  // Create user
  const createUser = async (e) => {

    if ("solana" in window) {
      e.preventDefault();
      const resp = await window.solana.connect();
      const address = await resp.publicKey.toString()


      const userdetail = {
        uid: address,
        name: "Unnamed",
        bio: "Nothing to see here",
        profileImage: "/assets/profile.png",
        walletAdress: address,
      };

      const REALM_APP_ID = "products-qexct";
      const app = new Realm.App({ id: REALM_APP_ID });
      const credentials = Realm.Credentials.anonymous();

      try {


        const user = await app.logIn(credentials);

        if (user) {

          const insertO = await user.functions.xpaceuser(userdetail);

          console.log(insertO)

          router.push({
            pathname: `/profile`,
          });

        }

      } catch (error) {
        console.error(error);
      }
    } else {
      setToggle(true)
    }



  }


  return (
    <div>
      <header class="text-gray-700 body-font border-b border-gray-200">
        <div class="container mx-auto  flex-wrap p-5 flex md:flex-row items-center">
          <a class="flex  title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="/" target="_blank">
            <img src="/assets/svg.svg" class="w-10  sm:h-9 md:mt-0 mt-6 mr-2 md:mr-3" alt="Flowbite Logo" />
            <span class="ml-3 text-xl md:mt-0 mt-6 mr-3 md:mr-0 font-bold">Xpace</span>
          </a>
          <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a class="mr-5 p-2 text-gray-700 border-blue-200 border-2 mt-4 md:mt-0 hover:bg-blue-400">About </a>

          </nav>
          <button onClick={createUser} class="inline-flex items-center text-white font-bold  bg-green-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0">Connect
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>
      <section class="text-gray-700 body-font">
        <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Naval
              <br />
              <span class="hidden lg:inline-block text-gray-500 text-2xl sm:text-2xl" ><a href="https://twitter.com/naval">@naval</a> </span>
            </h1>
            <p class="mb-8 leading-relaxed">
              Today the frontier is on the internet and even on the internet,
              the frontier is within Web3 and crypto because
              it’s sort of the least regulated the most decentralized,
              most permissionless, 24x7x365 markets
              that are self-funding hackers from all around the world.</p>

          </div>
          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img class="object-cover object-center rounded" alt="hero"
              src="/assets/hero.jpg" />
          </div>
        </div>
      </section>
      <section class="text-gray-700 body-font border-t border-gray-200">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">

            <h1 class="sm:text-3xl text-2xl font-medium border-b-2 border-black title-font text-gray-900">Quotes</h1>
          </div>
          <div class="flex flex-wrap -m-4">
            <div class="p-4 md:w-1/3">
              <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <h2 class="text-gray-900 text-lg title-font font-medium">Community value</h2>
                </div>
                <div class="flex-grow">
                  <p class="leading-relaxed text-base">If Bitcoin can have value, if Ethereum can have value, then in theory, an NFT can have value as long as the smart contracts and the social contracts and the community enforcing it has value.</p>

                </div>
              </div>
            </div>
            <div class="p-4 md:w-1/3">
              <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h2 class="text-gray-900 text-lg title-font font-medium">Digital Ownership</h2>
                </div>
                <div class="flex-grow">
                  <p class="leading-relaxed text-base">If you're skeptical about the idea of owning digital property, then you're not only denying capitalism on the internet ....

                    You're saying we're not going to have a collectively owned future. We're going to have a government-owned future and corporate-owned future.</p>

                </div>
              </div>
            </div>
            <div class="p-4 md:w-1/3">
              <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <circle cx="6" cy="6" r="3"></circle>
                      <circle cx="6" cy="18" r="3"></circle>
                      <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                    </svg>
                  </div>
                  <h2 class="text-gray-900 text-lg title-font font-medium">Opportunity</h2>
                </div>
                <div class="flex-grow">
                  <p class="leading-relaxed text-base">It's not even the first inning. It’s like the anthem before the game has even started.

                    And I have never seen so many highly intelligent, ambitious, capable people drop whatever they’re doing, in many cases really attractive things, to dedicate their time to this.</p>

                </div>
              </div>
            </div>
          </div>
          <button onClick={createUser} class="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-3 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Connect</button>

        </div>



      </section>



      <footer class="text-gray-700 body-font">
        <div class="bg-gray-200">
          <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p class="text-gray-500 text-sm text-center sm:text-left">© 2022 Xpace —
              <a href="https://twitter.com/thexovc" class="text-gray-600 ml-1" target="_blank" rel="noopener noreferrer">@thexovc</a>
            </p>
          </div>
        </div>
      </footer>


      {/* modal start */}

      {toggle && <div id="popup-modal" tabindex="-1" class="flex justify-center w-full h-full items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
        <div class="relative p-4 w-full max-w-md h-full md:h-auto ">

          <div class="relative bg-white border-2 border-indigo-900 rounded-lg shadow dark:bg-gray-700">

            <div class="flex justify-end p-2">
              <button onClick={() => setToggle(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </button>
            </div>
            <div class="p-6 pt-0 text-center">
              <svg class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <h3 class="mb-5 text-lg text-gray-500 font-bold dark:text-gray-700">Solana wallet not detected</h3>
              <h3 class="mb-5 text-xl font-normal text-gray-500 dark:text-gray-400">You must have a solana wallet to continue</h3>
              <button onClick={() => setToggle(false)} data-modal-toggle="popup-modal" type="button" class="font-bold text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800  rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Yes, I Understand
              </button>
            </div>
          </div>
        </div>
      </div>}


      {/* modal end */}



    </div>
  );
}

export default Home;