export default function PerformanceTable() {

  const teams = [

    {
      team: "Development",
      productivity: "96%",
      projects: 8
    },

    {
      team: "Design",
      productivity: "89%",
      projects: 4
    },

    {
      team: "Testing",
      productivity: "92%",
      projects: 3
    },

    {
      team: "HR",
      productivity: "85%",
      projects: 2
    }
  ];

  return (

    <div className="chart-box">

      <div className="chart-header">

        <h2>
          Department Performance
        </h2>

      </div>

      <table className="performance-table">

        <thead>

          <tr>

            <th>Department</th>

            <th>Productivity</th>

            <th>Projects</th>

          </tr>

        </thead>

        <tbody>

          {
            teams.map((team, index) => (

              <tr key={index}>

                <td>
                  {team.team}
                </td>

                <td>
                  {team.productivity}
                </td>

                <td>
                  {team.projects}
                </td>

              </tr>
            ))
          }

        </tbody>

      </table>

    </div>
  );
}