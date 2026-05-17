import { useCallback, useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FaArchive,
  FaBell,
  FaBriefcase,
  FaBuilding,
  FaChartLine,
  FaCheck,
  FaClock,
  FaDownload,
  FaEdit,
  FaEye,
  FaLock,
  FaPause,
  FaPlus,
  FaTrash,
  FaUserCheck,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";
import ActionButton from "../../components/common/ActionButton";
import PageHeader from "../../components/common/PageHeader";
import SectionCard from "../../components/common/SectionCard";
import StatCard from "../../components/cards/StatCard";
import DataTable from "../../components/tables/DataTable";
import ProductivityChart from "../../components/charts/ProductivityChart";
import GrowthChart from "../../components/charts/GrowthChart";
import DepartmentChart from "../../components/charts/DepartmentChart";
import TaskCompletionChart from "../../components/charts/TaskCompletionChart";
import { getAllTasks, getAllUsers, getAllEmployees, getAllProjects } from "../../services/api";
import "../../styles/admin-dashboard.css";

const makeAvatar = (name = "User") =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const getDepartment = (employee) => {
  const skill = employee.skill || employee.department || "Engineering";
  if (skill.toLowerCase().includes("front")) return "Frontend";
  if (skill.toLowerCase().includes("back")) return "Backend";
  if (skill.toLowerCase().includes("dev")) return "DevOps";
  return skill;
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { searchValue = "" } = useOutletContext() || {};
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [toast, setToast] = useState("");

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const [usersData, employeesData, tasksData, projectsData] = await Promise.all([
        getAllUsers().catch(() => []),
        getAllEmployees().catch(() => []),
        getAllTasks().catch(() => []),
        getAllProjects ? getAllProjects().catch(() => []) : [],
      ]);
      console.log(usersData);
      
      setUsers(usersData);
      setEmployees(employeesData);
      setTasks(tasksData);
      setProjects(projectsData);
    } catch (error) {
      console.error("Error loading admin dashboard:", error);
      setToast("Unable to load latest dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(loadDashboardData);
  }, [loadDashboardData]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(""), 2400);
    return () => clearTimeout(timer);
  }, [toast]);

 const employeeRows = useMemo(() => {

  return employees

    .map((employee) => {

      const employeeTasks =
        tasks.filter(

          (task) =>

            task.employee &&

            task.employee.id === employee.id
        );

      const completedTasks =
        employeeTasks.filter(

          (task) =>

            task.status === "DONE" ||

            task.status === "COMPLETED"
        ).length;

      const performance =
        employeeTasks.length > 0

          ? Math.round(

              (
                completedTasks /
                employeeTasks.length
              ) * 100
            )

          : 0;

      const attendance =
        employee.workload

          ? Math.min(
              100,
              employee.workload + 60
            )

          : 0;

      const status =
        employeeTasks.length > 0
          ? "Active"
          : "Idle";

      return {

        ...employee,

        department:
          getDepartment(employee),

        status,

        attendance,

        performance,

        totalTasks:
          employeeTasks.length,

        completedTasks,

        role:
          employee.role ||
          "EMPLOYEE",
      };
    })

    .filter((employee) => {

      const matchesQuery =

        `${employee.name}
         ${employee.email}
         ${employee.department}`

          .toLowerCase()

          .includes(
            searchValue.toLowerCase()
          );

      const matchesDepartment =

        departmentFilter === "All" ||

        employee.department ===
        departmentFilter;

      return (
        matchesQuery &&
        matchesDepartment
      );
    });

}, [
  employees,
  tasks,
  searchValue,
  departmentFilter
]);

  const departments = useMemo(
    () => ["All", ...new Set(employeeRows.map((employee) => employee.department))],
    [employeeRows]
  );

  // Calculate task stats first (before using in taskMixData)
  const completedTasks = tasks.filter((task) => task.status === "DONE" || task.status === "COMPLETED").length;
  const pendingTasks = tasks.filter((task) => task.status !== "DONE" && task.status !== "COMPLETED").length;
  const attendanceAverage = employeeRows.length
    ? Math.round(employeeRows.reduce((sum, employee) => sum + (employee.attendance || 80), 0) / employeeRows.length)
    : 0;

  // Generate chart data from real data
  const taskMixData = useMemo(() => [
    { name: "Done", value: completedTasks, color: "#22c55e" },
    { name: "In Progress", value: tasks.filter((t) => t.status === "IN_PROGRESS").length, color: "#38bdf8" },
    { name: "Pending", value: tasks.filter((t) => t.status === "PENDING").length, color: "#f59e0b" },
  ], [tasks, completedTasks]);

  const departmentPerformanceData = useMemo(() => {
    const depts = new Set(employeeRows.map(e => e.department));
    return Array.from(depts).map((dept) => ({
      name: dept,
      value: Math.round(
        employeeRows
          .filter(e => e.department === dept)
          .reduce((sum, e) => sum + (e.performance || 80), 0) / 
        (employeeRows.filter(e => e.department === dept).length || 1)
      ),
    }));
  }, [employeeRows]);

  const productivityData = [
    { day: "Mon", productive: 72, focused: 62 },
    { day: "Tue", productive: 78, focused: 68 },
    { day: "Wed", productive: 74, focused: 70 },
    { day: "Thu", productive: 86, focused: 76 },
    { day: "Fri", productive: 91, focused: 82 },
    { day: "Sat", productive: 66, focused: 58 },
    { day: "Sun", productive: 54, focused: 44 },
  ];

  const growthData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return months.map((month, index) => ({
      month,
      employees: Math.max(5, employeeRows.length - (5 - index)),
    }));
  }, [employeeRows]);

  const statCards = [
    { label: "Total Employees", value: employeeRows.length, icon: FaUsers, trend: "+12.4% this quarter", progress: Math.min(88, employeeRows.length) },
    { label: "Active Projects", value: projects.length, icon: FaBriefcase, trend: "Projects in pipeline", progress: Math.min(projects.length * 10, 76) },
    { label: "Pending Tasks", value: pendingTasks, icon: FaClock, trend: `${pendingTasks} tasks awaiting completion`, progress: Math.min(pendingTasks * 5, 42) },
    { label: "Completed Tasks", value: completedTasks, icon: FaCheck, trend: `${completedTasks} completed tasks`, progress: Math.min(completedTasks * 3, 68) },
    { label: "Attendance", value: `${attendanceAverage}%`, icon: FaUserCheck, trend: "Healthy workforce", progress: attendanceAverage },
    { label: "Departments", value: new Set(employeeRows.map(e => e.department)).size, icon: FaChartLine, trend: "Active departments", progress: 82 },
  ];

  const columns = [
    {
      key: "employee",
      header: "Employee",
      render: (employee) => (
        <div className="admin-employee-cell">
          <span>{makeAvatar(employee.name)}</span>
          <div>
            <strong>{employee.name}</strong>
            <small>{employee.email}</small>
          </div>
        </div>
      ),
    },
    { key: "department", header: "Department" },
    {
      key: "role",
      header: "Role",
      render: (employee) => <span className={`admin-badge admin-badge--${employee.role.toLowerCase()}`}>{employee.role}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (employee) => <span className={`admin-status admin-status--${employee.status.toLowerCase()}`}>{employee.status}</span>,
    },
    {
      key: "attendance",
      header: "Attendance",
      render: (employee) => (
        <>
          <div className="progress-line"><i style={{ width: `${employee.attendance}%` }} /></div>
          {employee.attendance}%
        </>
      ),
    },
    {
      key: "performance",
      header: "Performance",
      render: (employee) => (
        <>
          <div className="progress-line progress-line--purple"><i style={{ width: `${employee.performance}%` }} /></div>
          {employee.performance}%
        </>
      ),
    },
   {
  key: "actions",

  header: "Actions",

  render: (employee) => (

    <div className="admin-row-actions">

      {/* VIEW */}

      <button
        type="button"
        title="View"

        onClick={() => {

          navigate(
            `/admin/employees/${employee.id}`
          );
        }}
      >

        <FaEye />

      </button>

      {/* EDIT */}

      <button
        type="button"
        title="Edit"

        onClick={() => {

          navigate(
            `/admin/employees/edit/${employee.id}`
          );
        }}
      >

        <FaEdit />

      </button>

      {/* SUSPEND */}

      <button
        type="button"
        title="Suspend"

        onClick={() => {

          setToast(
            `${employee.name} suspended`
          );
        }}
      >

        <FaPause />

      </button>

      {/* DELETE */}

      <button
        type="button"
        title="Delete"

        onClick={async () => {

          const confirmDelete =
            window.confirm(
              `Delete ${employee.name}?`
            );

          if (!confirmDelete)
            return;

          try {

            await fetch(

              `http://localhost:8081/api/employees/${employee.id}`,

              {
                method: "DELETE",
              }
            );

            setToast(
              "Employee deleted"
            );

            loadDashboardData();

          } catch (err) {

            console.error(err);

            setToast(
              "Delete failed"
            );
          }
        }}
      >

        <FaTrash />

      </button>

    </div>
  ),
}
  ];

  if (loading) {
    return (
      <div className="admin-grid admin-grid--stats">
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="admin-skeleton-card" key={index} />
        ))}
      </div>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Smart Enterprise Management System"
        title="manage employees, projects,attendance, and performance all in one place"
        actions={
          <>
            <ActionButton
  icon={<FaPlus />}
  variant="primary"
  onClick={() => navigate("/admin/employees?add=true")}
>
          Add Employee
      </ActionButton>
            <ActionButton icon={<FaDownload />} onClick={() => setToast("Reports exported")}>Export Reports</ActionButton>
          </>
        }
      />

      <section className="admin-grid admin-grid--stats">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </section>

      <section className="admin-grid admin-grid--charts">
        <SectionCard eyebrow="Productivity" title="Weekly Productivity" className="admin-chart-wide">
          <ProductivityChart data={productivityData} />
        </SectionCard>
        <SectionCard eyebrow="Task Split" title="Completion Rate">
          <TaskCompletionChart data={taskMixData} />
        </SectionCard>
        <SectionCard eyebrow="Headcount" title="Employee Growth">
          <GrowthChart data={growthData} />
        </SectionCard>
        <SectionCard eyebrow="Departments" title="Performance">
          <DepartmentChart data={departmentPerformanceData} />
        </SectionCard>
      </section>

      <section className="admin-grid admin-grid--work">
        <SectionCard
          eyebrow="Employee Directory"
          title="People Management"
          className="admin-table-card"
          action={
            <div className="admin-filter-row">
              <select value={departmentFilter} onChange={(event) => setDepartmentFilter(event.target.value)}>
                {departments.map((department) => (
                  <option key={department}>{department}</option>
                ))}
              </select>
            </div>
          }
        >
          <DataTable columns={columns} data={employeeRows} />
        </SectionCard>

        <div className="admin-side-stack">
          <SectionCard eyebrow="Leave Desk" title="Pending Requests">
            <div className="admin-list">
              <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>
                Leave request management coming soon
              </div>
            </div>
          </SectionCard>

          <SectionCard eyebrow="Live Feed" title="Recent Activities">
            <div className="admin-list">
              <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>
                Activity feed will display here
              </div>
            </div>
          </SectionCard>
        </div>
      </section>

      <section className="admin-grid admin-grid--bottom">
        <SectionCard eyebrow="Delivery" title="Project Progress">
          <div className="admin-list">
            {projects.length > 0 ? (
              projects.slice(0, 4).map((project) => (
                <div className="admin-project-card" key={project.id || project.name}>
                  <div className="admin-project-card__title">
                    <div>
                      <strong>{project.name || "Unnamed Project"}</strong>
                      <span>{project.deadline ? `Deadline ${project.deadline}` : "No deadline set"}</span>
                    </div>
                    <em>{project.progress || 0}%</em>
                  </div>
                  <div className="progress-line progress-line--tall"><i style={{ width: `${project.progress || 0}%` }} /></div>
                  <div className="admin-team-row">
                    {project.team && project.team.length > 0 ? (
                      project.team.map((member) => <span key={member}>{member}</span>)
                    ) : (
                      <span>No team members assigned</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>
                No projects available
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard eyebrow="Permissions" title="Admin Controls">
          <div className="admin-control-grid">
            <button type="button"><FaUserTie /> Add Manager</button>
            <button type="button"><FaUserCheck /> Promote Employee</button>
            <button type="button"><FaLock /> Reset Password</button>
            <button type="button"><FaArchive /> Backup System</button>
            <button type="button"><FaBell /> Notifications</button>
            <button type="button"><FaBuilding /> Company Settings</button>
          </div>
        </SectionCard>
      </section>

      <SectionCard eyebrow="User Management" title="Accounts & Roles">
        <div className="admin-user-grid">
          {Array.isArray(users) ? users.slice(0, 8).map((user) => (
            <div className="admin-user-card" key={user.id}>
              <span>{makeAvatar(user.name || user.email)}</span>
              <div>
                <strong>{user.name || "Unnamed User"}</strong>
                <p>{user.email}</p>
                <em className={`admin-badge admin-badge--${(user.role || "employee").toLowerCase()}`}>
                  {user.role}
                </em>
              </div>
            </div>
          )) : (
            <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>
              No users available
            </div>
          )}
        </div>
      </SectionCard>

      {toast && <div className="admin-toast">{toast}</div>}
    </>
  );
}
