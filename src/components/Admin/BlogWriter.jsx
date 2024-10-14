import React, { useState, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';
import { db, auth } from "../firebase";
import { push, set, ref } from "firebase/database";

const BlogWriter = () => {
    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const [content, setContent] = useState('');
    const [demoImg, setDemoImg] = useState("");
    const [success, setSuccess] = useState("");
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1; // January is 0
    const year = today.getFullYear();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();

    const handleFileChange = (event) => {
        // Get the selected file from the event object
        const selectedFile = event.target.files[0];
        
        // Check if the file size is smaller than or equal to 1 MB
        if (selectedFile && selectedFile.size <= 1000000) {
          // Create a FileReader object to read the file contents
          const reader = new FileReader();
          
          // Set a callback function to be called when the file is loaded
          reader.onloadend = () => {
            // Set the loaded file contents as the source for a demo image
            setDemoImg(reader.result);
          };
          
          // Read the selected file as a data URL
          reader.readAsDataURL(selectedFile);
          
          // Set a success message
          setSuccess("File is selected");
        } else {
          // Clear the demo image and file input
          setDemoImg(null);
          document.getElementById("fileinput").value = "";
          
          // Set an error message
          setSuccess("File size must be 1 MB or smaller.");
        }
      }

      
    // const handleFileChange = (event) => {
    //     const selectedFile = event.target.files[0];
        
    //     if (selectedFile && selectedFile.size <= 1000000) {
    //       const reader = new FileReader();
    //       reader.onloadend = () => {
    //         // Create an image element to hold the loaded image
    //         const img = new Image();
    //         img.onload = () => {
    //           // Create a canvas element to hold the cropped image
    //           const canvas = document.createElement("canvas");
    //           canvas.width = 400;
    //           canvas.height = 250;
              
    //           // Calculate the cropping dimensions
    //           const srcX = (img.width - canvas.width) / 2;
    //           const srcY = (img.height - canvas.height) / 2;
    //           const srcWidth = canvas.width;
    //           const srcHeight = canvas.height;
    //           const destX = 0;
    //           const destY = 0;
    //           const destWidth = canvas.width;
    //           const destHeight = canvas.height;
              
    //           // Draw the cropped image onto the canvas
    //           const ctx = canvas.getContext("2d");
    //           ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight);
              
    //           // Get the data URL of the cropped image
    //           const croppedImg = canvas.toDataURL();
              
    //           // Set the cropped image as the source for a demo image
    //           setDemoImg(croppedImg);
    //         };
    //         img.src = reader.result;
    //       };
    //       reader.readAsDataURL(selectedFile);
    //       setSuccess("File is selected");
    //     } else {
    //       setDemoImg(null);
    //       document.getElementById("fileinput").value = "";
    //       setSuccess("File size must be 1 MB or smaller.");
    //     }
    //   }


    const handleEditorChange = (content, editor) => {
        setContent(content);
      };
    const handleSubmit = (e) => {
        e.preventDefault()
        if (demoImg) {
            push(ref(db, "blog/"), {
                title: title,
                des: des,
                content: content,
                image: demoImg,
                date: date +"-"+month + "-" + year,
            })
            setSuccess("Blog is created successfully")
            setDemoImg("");
            document.getElementById("title").value = ""
            document.getElementById("description").value = ""
            setContent("");
            document.getElementById("fileinput").value ="";
        }
        else {
            setSuccess("select image to upload")
        }
    }


    return (
        <div>

            <div class="py-4">
                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div class="bg-white overflow-hidden shadow-md sm:rounded-lg">
                        <div class="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                <div class="mb-4">
                                    <label class="text-xl text-gray-600">Title <span class="text-red-500">*</span></label><br></br>
                                    <input type="text" onChange={(e) => setTitle(e.target.value)} class="border-2 border-gray-300 p-2 w-full" name="title" id="title" required />
                                </div>

                                <div class="mb-4">
                                    <label class="text-xl text-gray-600">Description</label><br></br>
                                    <input type="text" class="border-2 border-gray-300 p-2 w-full" onChange={(e) => setDes(e.target.value)} name="description" id="description" required placeholder="(Optional)" />
                                </div>

                                <div class="mb-8">
                                    <Editor
                                        initialValue={content}
                                        id="content"
                                        onEditorChange={handleEditorChange}
                                        apiKey="your-api-key"
                                        init={{
                                            height: 300,
                                            plugins: [
                                                'advlist autolink lists link image charmap print preview anchor',
                                                'searchreplace visualblocks code fullscreen',
                                                'insertdatetime media table paste code help wordcount'
                                            ],
                                            toolbar: 'undo redo | formatselect | ' +
                                                'bold italic backcolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help'
                                        }}
                                    />
                                </div>

                                <div className="mb-4">
                                    <div className={`${demoImg ? 'md:h-80  overflow-hidden h-52 w-3/4' : ''}`}>
                                        {demoImg ? <img src={demoImg} alt="Uploaded image" className=" object-center" /> : <img alt="Show selected image" className=" object-center" />}
                                    </div>
                                    <input
                                        type="file"
                                        id="fileinput"
                                        accept="image/jpeg,image/jpg,image/png"
                                        required
                                        onChange={handleFileChange}
                                    />
                                </div>

                                <div class="flex p-1 flex-col">
                                    <h1 className="text-lg font-semibold text-red-400 py-4">{success}</h1>
                                    <button type="submit" class=" w-fit py-2 bg-blue-500 text-white hover:bg-blue-400 px-8 rounded-lg" required>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogWriter;
