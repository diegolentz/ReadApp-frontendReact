import './DashoardCard.css'
import { Card } from '@mui/material';

export const DashboardCard = ({ svg, title, data }: { svg: string, title: string, data: number }) =>

    <Card className='dashboard-item'><img src={svg} alt="ICON" />
        <div className="dashboard-description">
            <h1>{data}</h1>
            <h4>{title}</h4>
        </div>
    </Card>
{/* <article className="dashboard-item">
                <img src={svg} alt="ICON" />
                <div className="dashboard-description">
                <h2>{data}</h2>
                <h4>{title}</h4>
                </div>
        </article> */}