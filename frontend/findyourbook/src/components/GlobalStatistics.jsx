import Header from "./Header"
import {CircularProgressbar} from 'react-circular-progressbar';
    import 'react-circular-progressbar/dist/styles.css';
import { useSelector } from "react-redux";
import Charts from "./Chart"
import {Chart as ChartJS} from "chart.js/auto"
import {categoriesGlobalStats , colors ,categoriesReaders} from "./data.js"
import { useState } from "react";
import { useEffect } from "react";

const {PieChart} = Charts;

const GlobalStatistics = () => {
    const state = useSelector((state) => state);
    const darkMode = (state.mode === "dark");

    const [globalStats , setGlobalStats] = useState(null)

    const Chartdata = {
        labels:categoriesReaders.map((category) => category[0]),
        datasets:[
            {
                label:"Books you read by categorie",
                data:categoriesReaders.map((category) => category[1]),
                backgroundColor:colors.slice(1),
                borderColor: darkMode ? "#1e293b":"#f1f5f9" ,
                borderWidth: 3,
            }
        ],
    }

//----------------------------------------------------------------------------------------------------------------

    const getGlobalStats = async () => {
        const response = await fetch(
            `http://localhost:3001/api/v1/statistics/global`,
            {
                method:"GET",
                headers: { "Content-Type": "application/json" ,"Authorization":`Bearer ${state.token}`},
            }
        )
        const result = await response.json();
        setGlobalStats(result.data);
    }
    
    useEffect(() => {
        getGlobalStats()
    },[])

    console.log(globalStats);

    const LikedBooksProgressBar = (value) => {
        if(value){
            return(
                <CircularProgressbar value={value} text={`${value}%`} />
            )
        }
        else{
            while(1);
        }
    }

    // if(globalStats){
    //     console.log(globalStats.books.likedAmongRead);
    // }

//----------------------------------------------------------------------------------------------------------------



    const Statbar = () =>{
        var i = 0;
        var j= 0;
        return(
            <div 
            className="felx flex-col gap-15 items-center"
            >
                <div 
                className="w-full h-[3vh] flex flex-row rounded-lg shadow-lg opacity-90 bg-white mb-7 mt-6"
                >
                    {categoriesGlobalStats.map((category) => {
                        i++;
                        return(
                            
                            <div  
                            style={{width:String(category[1])+"%", backgroundColor:String(colors[i])}}
                            ></div>
                        
                        )
                    })
                    }
                </div>
                <div
                className="grid mobile:grid-cols-3 tablet:grid-cols-4 laptop:grid-cols-5 gap-3"
                >
                    {categoriesGlobalStats.map((category) => {
                        j++;
                        return(
                            <div className="flex flex-row gap-2 items-center">
                            <div  
                            style={{width:"2vh",height:"2vh", backgroundColor:String(colors[j])}}
                            ></div>
                            <h1
                            className="text-sm font-light"
                            >{category[0]}</h1>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        )
    }


    return(
    <section
        className="sm:w-4/6 h-full absolute right-0 w-11/12
        p-7 ">
    <Header title="Global Statistics"/>
    
        <section
        className={`w-full
        text-2xl font-medium
        ${darkMode ? "text-gray-200" :"text-gray-800"}`}
        >
            {/* Global statistics */}
        <div
        className="flex flex-col gap-5"
        >
            <div
            className={`grid mobile:grid-cols-1 tablet:grid-cols-2
            laptop:grid-cols-3 gap-10 pt-5`}
            >  
                <div
                className={`flex flex-col gap-3 items-center`}
                >
                    <div 
                        className="w-[15vh]"
                        >
                            <CircularProgressbar value={55}  text="55%" />
                        </div>
                      
                    <h1
                    className={`text-base text-center w-2/3`}
                    >Books rated more than 3 stars from 560 books total</h1>
                </div>
                <div
                className={`flex flex-col gap-3 items-center`}
                >
                    <div 
                        className="w-[15vh]"
                        >
                        <CircularProgressbar value={70} text={`${70}%`} />
                        </div>
                      
                    <h1
                    className={`text-base text-center w-2/3`}
                    >authors liked by users of 150 author</h1>
                </div>
                <div
                className={`flex flex-col gap-3 items-center`}
                >
                    <div 
                        className="w-[15vh]"
                        >
                        <CircularProgressbar value={55} text={`${55}%`} />
                        </div>
                      
                    <h1
                    className={`text-base text-center w-2/3`}
                    >Books saled among visited</h1>
                </div>
            </div>
            <div className="py-10">
                <h1>Number Of Books by Category:</h1>
                <Statbar/>
            </div>
            <div
            className="flex flex-col gap-5"
            >
                <h1>Number Of Readers By Category:</h1>
                <div 
                className="w-3/4 sm:w-1/2 self-center text-center"
                >
                    <PieChart Chartdata={Chartdata}/>
                </div>
            </div>   
        </div>
        <div 
        className="w-full h-[100px]"
        ></div>
        </section>
    </section>
    )}

export default GlobalStatistics;