import { SignUpInput, SignInInput } from "@adityaat2810/medium-blog"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { BACKEND_URL } from "../config"

export const AuthComponet = ({ type }: { type: "signup" | "signin" }) => {

    const navigate =useNavigate()
    // type for created common

    const [postInputs, setPostInputs] = useState<SignUpInput>({
        name: "",
        email: "",
        password: ""
    })

    // try creating different signup and signup componet it looks ugly

    async function sendRequest(){
        try{
            const resp = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs)
            const jwt = resp.data
            localStorage.setItem("token", jwt)
            navigate('/blogs')
        }catch(e){
            // alert user if request fails
            alert("error while signing up")
            console.log(e);
            
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">

            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="  text-3xl font-semibold ">
                            Create an Account
                        </div>

                        <div className="  text-slate-400 ">
                            {type==="signin"?"Don't have an account": "Already have an account?"}
                           
                            <Link className="pl-2 underline" to={type ==="signin"?"/signup":"/signin"}> 
                                {type === "signup"?"signin":"signup"}
                            </Link>

                        </div>

                    </div>

                   

                    <div className="pt-8">

                        {type=="signup"&&
                          <LabelledInput label="Name" placeholder="adity saini" onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                name: e.target.value
                            }))  // spred the c object and overide name in it 

                        }} />}

                      

                        <LabelledInput label="Email" placeholder="enter your email" onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                email: e.target.value
                            }))  // spred the c object and overide name in it 

                        }} />

                        <LabelledInput label="Password" type={"password"} placeholder="enter your password" onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                password: e.target.value
                            }))  // spred the c object and overide name in it 

                        }} />



                    </div>

                    <button onClick={sendRequest}  className="py-2.5 px-5 me-2 mb-2 mt-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-full"> {type==="signup"?"Create Account" :"Sign in"}</button>

                </div>


            </div>


        </div>
    )
}

interface LabelledInputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    type?: string
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <div>
            <label className="block mb-2 pt-4 text-sm font-medium text-black">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>

    </div>
}