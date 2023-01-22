import AdminHeader from "./AdminHeader"
import { useSelector } from "react-redux"
import Charts from "./Chart"
import {useSpring , animated} from "react-spring";
import { AiOutlineUser,AiOutlineStar,AiFillPrinter } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import { usersPerMonth,colors,averageRattingPerMonth } from "./data";
import {BsBook, BsQuestionOctagon} from "react-icons/bs";
import {SlBadge} from "react-icons/sl";
import  ReactToPrint,{PrintContextConsumer } from "react-to-print";
import React from "react";

const AdminStatistics = () => {
    const state = useSelector((state) => state);
    const darkMode = (state.mode === "dark");
    const { PieChart , LineChart , BarChart } = Charts;
    const Number = ({ n }) => {
        const { number } = useSpring({
            from: { number : 0 },
            number:n,
            delay:200,
            config:{mass:1 ,tension:20, friction:10},
        });
        return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
    }

    const [userIconHidden , setuserIconHidden] = useState(true);
    useEffect(() => {
        setuserIconHidden(false);
    },[])

    const usersPerMonthData = {
        labels:usersPerMonth.map((category) => category[0]),
        datasets:[
            {
                label:"Users joining per month",
                data:usersPerMonth.map((category) => category[1]),
                backgroundColor:colors.slice(1),
                borderColor: darkMode ? "#f1f5f9" : "#1e293b" ,
                borderWidth: 3,
            }
        ],
    }
    const rattingPerMonthData = {
        labels:averageRattingPerMonth.map((category) => category[0]),
        datasets:[
            {
                label:"Average Rattings per month",
                data:averageRattingPerMonth.map((category) => category[1]),
                backgroundColor:colors.slice(1),
                borderColor: darkMode ? "#f1f5f9" : "#1e293b" ,
                borderWidth: 3,
            }
        ],
    }
    class PrintBtn extends React.PureComponent {
        render() {
          return (
            <div>
              <ReactToPrint 
              content={() => this.componentRef}
              trigger={() => {return(
                <button
                className="flex flex-rox items-center gap-2 text-2xl p-2 bg-emerald-600
                rounded-xl shadow-lg self-center h-[10vh] w-[40vh] justify-center
                hover:bg-emerald-700 ease-in-out duration-200
                "
                ><AiFillPrinter/> Print</button>
              )}}
              >
              </ReactToPrint>
                <div className="hidden">
                    <div 
                    className="w-full h-[50vh] bg-white text-black p-4"
                    ref={el => (this.componentRef = el)}
                    >
                        <h1>{Date().toLocaleString()}</h1>
                        <table
                        className="w-full"
                        >
                            <thead>
                                <tr>
                                    <th colSpan="2"
                                    className="text-center
                                    p-2
                                    "
                                    >Find Your Book Statistics</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td
                                    className="border-2 px-2 py-1 border-black w-1/2"
                                    >Number of users</td>
                                    <td
                                    className="border-2 px-2 py-1 border-black w-1/2"
                                    >2366</td>
                                </tr>
                                <tr>
                                    <td
                                    className="border-2 px-2 py-1 border-black w-1/2"
                                    >Number of Books</td>
                                    <td
                                    className="border-2 px-2 py-1 border-black w-1/2"
                                    >5293</td>
                                </tr>
                                <tr>
                                    <td
                                    className="border-2 px-2 py-1 border-black w-1/2"
                                    >Number of users</td>
                                    <td
                                    className="border-2 px-2 py-1 border-black w-1/2"
                                    >2366</td>
                                </tr>
                                <tr>
                                    <td
                                    className="border-2 px-2 py-1 border-black w-1/2"
                                    >Number of users</td>
                                    <td
                                    className="border-2 px-2 py-1 border-black w-1/2"
                                    >2366</td>
                                </tr>
                                <tr>
                                    <td
                                    className="border-2 px-2 py-1 border-black w-1/2"
                                    >Number of users</td>
                                    <td
                                    className="border-2 px-2 py-1 border-black w-1/2"
                                    >2366</td>
                                </tr>
                                <tr>
                                    <td
                                    className="border-2 px-2 py-1 border-black w-1/2"
                                    >Number of users</td>
                                    <td
                                    className="border-2 px-2 py-1 border-black w-1/2"
                                    >2366</td>
                                </tr><tr>
                                    <td
                                    className="border-2 px-2 py-1 border-black w-1/2"
                                    >Number of users</td>
                                    <td
                                    className="border-2 px-2 py-1 border-black w-1/2"
                                    >2366</td>
                                </tr><tr>
                                    <td
                                    className="border-2 px-2 py-1 border-black w-1/2"
                                    >Number of users</td>
                                    <td
                                    className="border-2 px-2 py-1 border-black w-1/2"
                                    >2366</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          );
        }
      }


    return (
        <section
        className={`
        ${darkMode ? "text-gray-200" : "text-gray-800"}
        `}
        >
            <AdminHeader/>
            <section
            className={`
            p-5 pl-10 font-medium text-xl flex flex-col gap-7
            `}
            >
                <div 
                className="flex flex-col gap-7"
                >
                    <h1
                    className="text-2xl font-semibold"
                    >Users Statistics:</h1>
                    <div
                    className={`w-full h-auto
                    grid mobile:grid-cols-1 laptop:grid-cols-2 gap-5
                    `}
                    >
                        <div className="w-full flex justify-center">
                            <div
                            className="w-2/3 p-4 min-h-[15vh] rounded-lg shadow-lg
                            flex flex-col items-center
                            gap-5 text-[10vh]
                            "
                            >
                                <h1
                                className={`ease-in-out duration-1000
                                ${userIconHidden ? "opacity-0":"opacity-100"}
                                `}
                                ><AiOutlineUser/></h1>
                                <h1
                                className="text-2xl"
                                >
                                     <Number n={2366}/>
                                </h1>
                                <h1
                                className="text-xl"
                                >Readers Use Your App</h1>
                                <a href="/admin/users">
                                    <button
                                    className={`
                                    text-xl text-gray-200
                                    bg-blue-900
                                    p-2 rounded-lg
                                    hover:text-gray-300
                                    `}
                                    >See All Users</button>
                                </a>
                            </div>
                        </div>
                        <div className="w-full flex justify-center">
                            <div
                            className="w-2/3 p-4 min-h-[15vh] rounded-lg shadow-lg
                            flex flex-col items-center gap-4
                            "
                            >
                                <LineChart Chartdata={usersPerMonthData} />
                                <h1
                                className="text-center"
                                >Evolution of Number of Users Joining Your App During the Last 6 Months</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                className="flex flex-col gap-7"
                >
                    <h1
                    className="text-2xl font-semibold"
                    >Books Statistics:</h1>
                    <div
                    className={`w-full h-auto
                    grid mobile:grid-cols-1 laptop:grid-cols-2 gap-5
                    `}
                    >
                        <div className="w-full flex justify-center">
                            <div
                            className="w-2/3 p-4 min-h-[15vh] rounded-lg shadow-lg
                            flex flex-col items-center
                            gap-5 text-[10vh]
                            "
                            >
                                <h1
                                className={`ease-in-out duration-1000
                                ${userIconHidden ? "opacity-0":"opacity-100"}
                                `}
                                ><BsBook/></h1>
                                <h1
                                className="text-2xl"
                                >
                                     <Number n={5293}/>
                                </h1>
                                <h1
                                className="text-xl"
                                >Total Number Of Books</h1>
                                <a href="/admin/add-book">
                                    <button
                                    className={`
                                    text-xl text-gray-200
                                    bg-blue-900
                                    p-2 rounded-lg
                                    hover:text-gray-300
                                    `}
                                    >Add a Book</button>
                                </a>
                            </div>
                        </div>

                        <div className="w-full flex justify-center">
                            <div
                            className="w-2/3 p-4 min-h-[15vh] rounded-lg shadow-lg
                            flex flex-col items-center
                            gap-5 text-[10vh]
                            "
                            >
                                <h1
                                className={`ease-in-out duration-1000 text-yellow-500
                                ${userIconHidden ? "opacity-0":"opacity-100"}
                                `}
                                ><AiOutlineStar/></h1>
                                <h1
                                className="text-2xl"
                                >
                                     3.9
                                </h1>
                                <h1
                                className="text-xl text-center"
                                >Average Ratting of Books
                                <br/><span
                                className="text-yellow-500"
                                >
                                It is reflecting the satisfaction of your clients!</span>
                                </h1>
                                
                            </div>
                        </div>
                        <div className="w-full flex justify-center">
                            <div
                            className="w-2/3 p-4 min-h-[15vh] rounded-lg shadow-lg
                            flex flex-col items-center gap-4
                            "
                            >
                                <LineChart Chartdata={rattingPerMonthData} />
                                <h1
                                className="text-center"
                                >Evolution Of Average Books Rating During the Last 6 Months</h1>
                            </div>
                        </div>
                        
                        <div className="w-full flex justify-center">
                            <div
                            className="w-2/3 p-4 min-h-[15vh] rounded-lg shadow-lg
                            flex flex-col items-center
                            gap-5 text-[10vh]
                            "
                            >
                                <h1
                                className={`ease-in-out duration-1000 text-yellow-500
                                ${userIconHidden ? "opacity-0":"opacity-100"}
                                `}
                                ><SlBadge/></h1>
                                <h1
                                className="text-2xl text-center"
                                >
                                    4.7 <span className="text-base flex justify-around"> from 456 rattes </span>
                                </h1>
                                <h1
                                className="text-xl text-center"
                                >Best Book 
                                <br/><span
                                className="text-yellow-500"
                                >
                                Monkey Grip </span>
                                <br/>
                                <span>
                                by Helen Warner
                                </span>
                                </h1>
                                
                            </div>
                        </div>
                        

                    </div>
                </div>
                <div
                className="w-full flex justify-center pt-10"
                ><PrintBtn/></div>
            </section>
        </section>
    )
}

export default AdminStatistics