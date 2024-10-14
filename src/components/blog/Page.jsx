import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Page = () => {
    var title = useLocation("")
    var data = title.state;
    useEffect(()=>{
        document.getElementById("content").innerHTML = data.content
    })
    return (
        <div>
            <main class="pt-24 pb-16  bg-gray-50">
                <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">

                    <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">

                        <header class="mb-4 lg:mb-6 space-y-4">
                            <div class="flex items-center">
                                <img src={data.image} alt="" />
                            </div>
                            <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl ">{data.title}</h1>
                            <p className="text-blue-500 text-lg font-semibold">{data.date}</p>
                            <p class="font-medium text-gray-500">{data.dis}</p>
                        </header>
                        <div id="content" className=" text-lg  lg:text-xl text-gray-900">
                           
                        </div>
                 
                    </article>
                </div>
            </main>
            <footer className="bg-gray-900 text-white md:px-32 px-6 py-3 2xl:px-0">
                <div className="container mx-auto flex flex-col md:flex-row space-y-2 justify-between items-center">
                    <p className="text-sm">&copy; 2023 Dark Coder</p>
                    <ul className="flex space-x-4">
                        <li><a href="#" className="hover:text-gray-500">About</a></li>
                        <li><a href="#" className="hover:text-gray-500">Contact</a></li>
                        <li><a href="#" className="hover:text-gray-500">Privacy Policy</a></li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}
export default Page;