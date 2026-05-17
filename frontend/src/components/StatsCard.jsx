function StatsCard({ title, value, text, icon }) {

  return (

    <div className="card">

      <div className="cardTop">

        <h3>{title}</h3>

        <div className="cardIcon">

          {icon}

        </div>

      </div>

      <h1>{value}</h1>

      <p>{text}</p>

    </div>

  );

}

export default StatsCard;