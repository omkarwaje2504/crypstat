import { onValue, ref } from "firebase/database";
import { db } from "../firebase"
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
    const [blogData, setBlogData] = useState("")
    useEffect(() => {
        onValue(ref(db, `blog/`), (snapshot) => {
            if (snapshot && snapshot.val()) {
                setBlogData(snapshot.val());
                console.log(snapshot.val())
            }
            else { }
        });
    }, []);

    const blogs = [];
    for (const [key, blog] of Object.entries(blogData)) {
        if (blog) {
            blogs.push(
                <Link to={"/blogPage"} state={{ title: blog.title, image: blog.image, date: blog.date, dis: blog.des,content:blog.content }} >
                    <div className="items-center flex bg-white border rounded-lg flex-col justify-center" >
                        <div className="md:h-80 w-full overflow-hidden h-52">
                            <img src={blog.image} className="rounded-lg w-full h-full" alt="post 1" />
                        </div>
                        <div className="p-4 space-y-2 md:space-y-4 py-8 md:py-12">
                            <p className="text-xs">{blog.date}</p>
                            <h1 className="font-semibold text-2xl 2xl:text-3xl ">{blog.title}</h1>
                            <p className="text-sm text-gray-500">{blog.des}</p>
                            <h5 className="text-blue-500">Read more</h5>
                        </div>
                    </div>
                </Link>
            );
        }
        else { }
    }
    return (
        <section className="bg-[#f7f7f7]">
            <div className="flex flex-col md:pt-32 py-20 p-6 container mx-auto justify-center space-y-24">
                <div className="text-center text-md space-y-4 font-mono">
                    <h1 className=" text-5xl md:text-7xl font-semibold text-slate-800">The Blog</h1>
                    <p className="font-lato md:w-1/2 md:text-lg text-sm mx-auto text-gray-600 ">Understanding the World of Cryptocurrency: An In-Depth Look into the Benefits, Risks, and Future of Digital Currency</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:mx-32">
{blogs}
                    {/* {header.map((item, index) => {
                        let im = image[index];
                        let dt = date[index]
                        let des = description[index]
                        return (
                            <Link to={"/blogPage"} state={{ title: item, image: im, date: dt, dis: des, index: index }} >
                                <div className="items-center flex bg-white border rounded-lg flex-col justify-center" >
                                    <div className="md:h-80 w-full overflow-hidden h-52">
                                        <img src={im} className="rounded-lg w-full h-full" alt="post 1" />
                                    </div>
                                    <div className="p-4 space-y-2 md:space-y-4 py-8 md:py-12">
                                        <p className="text-xs">{dt}</p>
                                        <h1 className="font-semibold text-2xl 2xl:text-3xl ">{item}</h1>
                                        <p className="text-sm text-gray-500">{des}</p>
                                        <h5 className="text-blue-500">Read more</h5>
                                    </div>
                                </div>
                            </Link>
                        );
                    })} */}
                </div>
            </div>
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
        </section>


    )
}
export default Blog