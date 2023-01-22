import Header from "./Header"
import { useSelector } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import {Chart as ChartJS} from "chart.js/auto"
import Charts from "./Chart"

import {personalBooksLiked , colors ,personalBooksRead , visitsPerMonth , likesPerMonth} from "./data.js"

const {PieChart , LineChart} = Charts;
const PersonalStatistics = () => {
    const state = useSelector((state) => state);
    const darkMode = (state.mode === "dark");
    
    const Readdata = {
        labels:personalBooksRead.map((category) => category[0]),
        datasets:[
            {
                label:"Readers by Category",
                data:personalBooksRead.map((category) => category[1]),
                backgroundColor:colors.slice(1),
                borderColor: darkMode ? "#1e293b":"#f1f5f9" ,
                borderWidth: 3,
            }
        ],
    }
    const Likedata = {
        labels:personalBooksLiked.map((category) => category[0]),
        datasets:[
            {
                label:"Likes by Category",
                data:personalBooksLiked.map((category) => category[1]),
                backgroundColor:colors.slice(1),
                borderColor: darkMode ? "#1e293b":"#f1f5f9" ,
                borderWidth: 3,
            }
        ],
    }

    const Visitsdata = {
        labels:visitsPerMonth.map((category) => category[0]),
        datasets:[
            {
                label:"Visits per month",
                data:visitsPerMonth.map((category) => category[1]),
                backgroundColor:colors.slice(1),
                borderColor: darkMode ? "#f1f5f9" : "#1e293b" ,
                borderWidth: 3,
            }
        ],
    }

    const LikePerMonthdata = {
        labels:likesPerMonth.map((category) => category[0]),
        datasets:[
            {
                label:"Likes per month",
                data:likesPerMonth.map((category) => category[1]),
                backgroundColor:colors.slice(1),
                borderColor: darkMode ? "#f1f5f9" : "#1e293b" ,
                borderWidth: 3,
            }
        ],
    }

    return(
    <section
        className="sm:w-4/6 h-full absolute right-0 w-11/12
        p-7 ">
    <Header title="Personal Statistics"/>

        <section
        className={`flex flex-col gap-5 text-2xl font-medium
        ${darkMode ? "text-gray-200" : "text-gray-800"}
        `} 
        >
            <div
            className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6 p-5 gap-10"
            >

                <div
                className="flex flex-col items-center gap-4"
                >
                    <div
                    className="w-[20vh]"
                    >
                    <CircularProgressbar value={63} text="63%"/>
                    </div>
                    <h1
                    className={`text-center text-base`}
                    >Books you read among you visited</h1>
                </div>

                <div
                className="flex flex-col items-center gap-4"
                >
                    <div
                    className="w-[20vh]"
                    >
                    <CircularProgressbar value={40} text="40%"/>
                    </div>
                    <h1
                    className={`text-center text-base`}
                    >Books you liked among you visited</h1>
                </div>

                
            </div>

            <div>
                <h1
                className="text-3xl"
                >Classifying by Categories: </h1>
                <div 
                className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7 p-5`}
                >
                    <div
                    className={`flex flex-col items-center`}
                    >
                        <div
                        className={`w-[40vh]`}>
                        <PieChart Chartdata={Readdata}/>
                        </div>
                        <h1
                    className={`text-center text-base`}
                    >Books you read by category</h1>
                    </div>
                    <div
                    className={`flex flex-col items-center`}
                    >
                        <div
                        className={`w-[40vh]`}>
                        <PieChart Chartdata={Likedata}/>
                        </div>
                        <h1
                    className={`text-center text-base`}
                    >Books you liked by category</h1>
                    </div>
                </div>
            </div>

            <div 
            className="flex flex-col gap-7"
            >
                <h1
                className="text-3xl"
                >Your Activities:</h1>
                <div className={`flex flex-col items-center w-[60vh]
                gap-5 self-center
                `}>
                    <LineChart Chartdata={Visitsdata} 
                    />
                    <h1
                    className="text-center text-base"
                    >Your Visits Of Books Per Month</h1>
                </div>

                <div className={`flex flex-col items-center w-[60vh]
                gap-5 self-center
                `}>
                    <LineChart Chartdata={LikePerMonthdata} 
                    />
                    <h1
                    className="text-center text-base"
                    >Your Likes For Books Per Month</h1>
                </div>
            </div>
        </section>
        <div 
        className="w-full h-[100px]"
        ></div>
    </section>
    )}

export default PersonalStatistics;