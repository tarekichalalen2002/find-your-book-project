import { Line , Bar , Pie } from "react-chartjs-2";

const PieChart = ({Chartdata}) => {
    return <Pie data={Chartdata} />
}
const LineChart = ({Chartdata}) => {
    return <Line data={Chartdata} />
}
const BarChart = ({Chartdata}) => {
    return <Bar data={Chartdata} />
}


export default { PieChart , LineChart , BarChart }