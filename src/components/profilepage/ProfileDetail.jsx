
import { auth, db } from "../firebase";
import { onValue, ref, update } from "firebase/database";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";

const ProfileDetail = (props) => {
  const value = useContext(UserContext).userId;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [sucess, setSucess] = useState("");
  const [demoImg, setDemoImg] = useState("");
  const [imageUrl, setImageUrl] = useState(0);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {

        onValue(ref(db, `users/${user.uid}/profile`), (snapshot) => {
          setFirstName(snapshot.val().firstName);
          document.getElementById("firstName").value = snapshot.val().firstName;
          setLastName(snapshot.val().lastName);
          document.getElementById("lastName").value = snapshot.val().lastName;
          setBirthdate(snapshot.val().birthdate);
          document.getElementById("birthdate").value = snapshot.val().birthdate;
          setEmail(snapshot.val().emailId);
          document.getElementById("email").value = snapshot.val().emailId;
          setGender(snapshot.val().gender);
          document.getElementById("gender").value = snapshot.val().gender;
          setContact(snapshot.val().contact);
          document.getElementById("contact").value = snapshot.val().contact;
          setImageUrl(snapshot.val().imageUrl)
          setAddress(snapshot.val().address);
          document.getElementById("address").value = snapshot.val().address;
          setCity(snapshot.val().city);
          document.getElementById("city").value = snapshot.val().city;
          setState(snapshot.val().state);
          document.getElementById("state").value = snapshot.val().state;
          setPincode(snapshot.val().pincode);
          document.getElementById("pincode").value = snapshot.val().pincode;
        });
      }
    });
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.size <= 1000000) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDemoImg(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setSucess("File is selected");
    } else {
      setDemoImg(null);
      setSucess("File size must be 1 MB or smaller.");
    }
  }
  
  const handleUpload = () => {
    if (!demoImg) {
      alert("Please select an image first.");
    } else {
      update(ref(db, `users/${value}/profile`), {
        imageUrl: demoImg
      }).then(() => {
        setSucess("File uploaded successfully.");
      }).catch((error) => {
        setSucess(`Error uploading file: ${error.message}`);
      });
    }
  };

  const submit = (e) => {
    update(ref(db, "users/" + value + "/profile"), {
      firstName: firstName,
      emailId: email,
      lastName: lastName,
      birthdate: birthdate,
      city: city,
      state: state,
      pincode: pincode,
      contact: contact,
      address: address,
      gender: gender,

    });

  };

  return (
    <section className="mt8 md:mt-16  flex md:flex-row flex-col-reverse container mx-auto">
      <div className=" border-1  border-slate-800 bg-white rounded-lg md:m-4 shadow-lg md:w-3/5 p-6">
        <form className="space-y-4" onSubmit={submit}>
          <h1 className="block text-lg font-medium text-slate-700">
            General Information
          </h1>
          <div className="flex w-full md:flex-row flex-col  justify-between space-y-4 md:space-y-0 md:space-x-8 ">
            <div className="md:w-1/2 space-y-2">
              <h1 className="text-base font-base text-slate-800">First Name</h1>
              <input
                type="text"
                id="firstName"
                pattern="^[a-zA-Z]{2,}(?: [a-zA-Z]+)*$"
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
                placeholder="Enter your first name"
                className="w-full  px-5 py-2 text-gray-700  border border-slate-300 rounded focus:outline-blue-500 "
              />
            </div>
            <div className="md:w-1/2 space-y-2">
              <h1 className="text-base font-base text-slate-800">Last Name</h1>
              <input
                type="text"
                id="lastName"
                pattern="^[a-zA-Z]{2,}(?: [a-zA-Z]+)*$"
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
                placeholder="Enter your last name"
                className="w-full  px-5 py-2 text-gray-700  border border-slate-300 rounded focus:outline-blue-500 "
              />
            </div>
          </div>
          <div className="flex w-full md:flex-row flex-col  justify-between space-y-4 md:space-y-0 md:space-x-8">
            <div className="md:w-1/2 space-y-2">
              <h1 className="text-base font-base text-slate-800">Birthdate</h1>
              <input
                type="date"
                id="birthdate"
                onChange={(event) => {
                  setBirthdate(event.target.value);
                }}
                className="w-full  px-5 py-2 text-gray-700  border border-slate-300 rounded focus:outline-blue-500 "
              />
            </div>
            <div className="md:w-1/2 space-y-2">
              <h1>Gender</h1>
              <select
                id="gender"
                onChange={(event) => {
                  setGender(event.target.value);
                }}
                className="w-full  px-5 py-2 text-gray-700  border border-slate-300 rounded focus:outline-blue-500 "
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="flex w-full md:flex-row flex-col  justify-between space-y-4 md:space-y-0 md:space-x-8">
            <div className="md:w-1/2 space-y-2">
              <h1 className="text-base font-base text-slate-800">Email</h1>
              <input
                type="email"
                id="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                placeholder="crypstat@gmail.com"
                className=" w-full px-5 py-2 text-gray-700  border border-slate-300 rounded focus:outline-blue-500 "
              />
            </div>
            <div className="md:w-1/2 space-y-2">
              <h1 className="text-base font-base text-slate-800">Contact</h1>
              <input
                type="text"
                id="contact"
                pattern="^\d{1,10}$"
                onChange={(event) => {
                  setContact(event.target.value);
                }}
                placeholder="123456789"
                className=" w-full px-5 py-2 text-gray-700  border border-slate-300 rounded focus:outline-blue-500 "
              />
            </div>
          </div>

          <h1 className="block text-lg font-medium text-slate-700">Address</h1>

          <div className="w-full space-y-2">
            <h1 className="text-base font-base text-slate-800">Address</h1>
            <input
              type="text"
              id="address"
          
              onChange={(event) => {
                setAddress(event.target.value);
              }}
              placeholder="Enter your home address"
              className="w-full  px-5 py-2 text-gray-700  border border-slate-300 rounded focus:outline-blue-500 "
            />
          </div>
          <div className="flex w-full md:flex-row flex-col  justify-between space-y-4 md:space-y-0 md:space-x-8">
            <div className="md:w-1/2 space-y-2">
              <h1 className="text-base font-base text-slate-800">City</h1>
              <input
                type="text"
                id="city"
                pattern="^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
                placeholder="Enter your city name"
                className="w-full  px-5 py-2 text-gray-700  border border-slate-300 rounded focus:outline-blue-500 "
              />
            </div>
            <div className="md:w-1/2 space-y-2">
              <h1 className="text-base font-base text-slate-800">State</h1>
              <select
                id="state"
                onChange={(event) => {
                  setState(event.target.value);
                }}
                className="w-full  px-5 py-2 text-gray-700  border border-slate-300 rounded focus:outline-blue-500 "
              >
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Goa">Goa</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                <option value="Daman and Diu">Daman and Diu</option>
                <option value="Delhi">Delhi</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Puducherry">Puducherry</option>
              </select>
            </div>
            <div className="md:w-1/2 space-y-2">
              <h1 className="text-base font-base text-slate-800">Zip</h1>
              <input
                type="text"
                id="pincode"
                pattern="^\d{6}$"
                onChange={(event) => {
                  setPincode(event.target.value);
                }}
                placeholder="Enter your city pincode"
                className="w-full  px-5 py-2 text-gray-700  border border-slate-300 rounded focus:outline-blue-500 "
              />
            </div>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 w-fit text-white font-medium py-2 px-6 rounded-md focus:outline-none  focus:shadow-outline"
            type="submit"
          >
            Update Profile
          </button>
        </form>
      </div>
      <div className=" border-1 text-center border-slate-800  rounded-lg md:m-4 shadow-lg md:w-2/6 p-6">
        <div className="bg-gradient-to-r from-teal-300 to-yellow-100  h-32 md:h-1/3 items-end justify-center relative flex">
          <div className=" overflow-clip items-center flex justify-center absolute -bottom-14">
            <img id="image"
              className="w-40 h-40 rounded-full object-cover bg-green-500 "
              src={imageUrl ? imageUrl : ""}
            />
          </div>
          <br />
        </div>
        <div className="pt-16">
          <h1 className="text-xl font-medium text-slate-900">
            {firstName}&nbsp;{lastName}
          </h1>
          <div className="">
            <div className="flex flex-col justify-center text-sm text-slate-900 space-y-1">
              <p>{email}</p>
              <p>{contact}</p>
            </div>
            <div>
              <hr className="border-1 my-4" />
              <div>
                <div className="space-y-2">
                  <h5 className="mb-4">change profile photo</h5>
                  <div className="flex flex-row items-center">
                    <div className="w-32 h-32 p-2 overflow-hidden border-2 items-center">
                      {demoImg ? <img src={demoImg} alt="Uploaded image"  className=" object-center" /> : <img alt="Show selected image" className=" object-center" />}
                    </div>
                    <div className="">
                      <div className="flex flex-col  items-center text-md">
                        <div className="flex flex-row  w-full items-center">

                          <label for="fileinput" className="">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="paperclip"
                              className=" w-12 m-3"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path
                                fill="gray"
                                d="M43.246 466.142c-58.43-60.289-57.341-157.511 1.386-217.581L254.392 34c44.316-45.332 116.351-45.336 160.671 0 43.89 44.894 43.943 117.329 0 162.276L232.214 383.128c-29.855 30.537-78.633 30.111-107.982-.998-28.275-29.97-27.368-77.473 1.452-106.953l143.743-146.835c6.182-6.314 16.312-6.422 22.626-.241l22.861 22.379c6.315 6.182 6.422 16.312.241 22.626L171.427 319.927c-4.932 5.045-5.236 13.428-.648 18.292 4.372 4.634 11.245 4.711 15.688.165l182.849-186.851c19.613-20.062 19.613-52.725-.011-72.798-19.189-19.627-49.957-19.637-69.154 0L90.39 293.295c-34.763 35.56-35.299 93.12-1.191 128.313 34.01 35.093 88.985 35.137 123.058.286l172.06-175.999c6.177-6.319 16.307-6.433 22.626-.256l22.877 22.364c6.319 6.177 6.434 16.307.256 22.626l-172.06 175.998c-59.576 60.938-155.943 60.216-214.77-.485z"
                              ></path>
                            </svg>
                          </label>
                          <input
                            type="file"
                            id="fileinput"
                            accept="image/jpeg,image/jpg,image/png"
                            className="hidden"
                            onChange={handleFileChange}
                          />

                          <div className="block text-start text-sm">
                            <label
                              for="fileinput"
                              className="text-slate-800 mb-1 font-medium text-lg"
                            >
                              Choose Image
                            </label>
                            <div className="text-gray-500 text-xs">
                              JPG, GIF or PNG. Max size of 800K
                            </div>
                            {sucess ? <p className="text-red-500 p-2 w-3/4">{sucess}</p> : <p></p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Upload</button>
                </div>
                
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProfileDetail;
