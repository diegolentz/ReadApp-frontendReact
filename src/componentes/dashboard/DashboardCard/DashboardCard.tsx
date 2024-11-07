import './DashoardCard.css'

export const DashboardCard = ({svg, title, data} : {svg:string, title:string, data:number}) =>
    <article className="dashboard-item">
                <img src={svg} alt="ICON" />
                <div className="dashboard-description">
                <h2>{data}</h2>
                <h4>{title}</h4>
                </div>
        </article>