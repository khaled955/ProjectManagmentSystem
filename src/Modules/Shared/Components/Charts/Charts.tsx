
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useAuth } from '../../../../Context/Auth.context';

const dashboardData = [
  { name: 'Jan', projects: 20, tasks: 120, employees: 30, active: 25, inactive: 5, progress: 40 },
  { name: 'Feb', projects: 22, tasks: 150, employees: 35, active: 30, inactive: 5, progress: 50 },
  { name: 'Mar', projects: 25, tasks: 160, employees: 40, active: 34, inactive: 6, progress: 60 },
  { name: 'Apr', projects: 30, tasks: 200, employees: 45, active: 38, inactive: 7, progress: 70 },
  { name: 'May', projects: 35, tasks: 220, employees: 50, active: 42, inactive: 8, progress: 80 },
];

const roleDistribution = [
  { name: 'Admins', value: 4 },
  { name: 'Team Leads', value: 6 },
  { name: 'Employees', value: 40 },
];

const pieColors = ['#0d6efd', '#6610f2', '#20c997'];

export default function Charts() {
  const {isEmployee} = useAuth()
  return (
    <div className="row mt-4">
      {/* Project Trend Line Chart */}
      <div className="col-md-6 mb-4">
        <h5 className="text-primary">Projects Over Time</h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dashboardData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="projects" stroke="#0d6efd" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Task Bar Chart */}
      <div className="col-md-6 mb-4">
        <h5 className="text-success">Tasks Per Month</h5>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dashboardData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tasks" fill="#20c997" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Employee Growth Line Chart */}
    {!isEmployee &&   <div className="col-md-6 mb-4">
        <h5 className="text-warning">Employee Count</h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dashboardData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="employees" stroke="#ffc107" strokeWidth={3} />
            <Line type="monotone" dataKey="active" stroke="#198754" strokeWidth={2} strokeDasharray="5 5" name="Active Employees" />
            <Line type="monotone" dataKey="inactive" stroke="#dc3545" strokeWidth={2} strokeDasharray="3 3" name="Inactive Employees" />
          </LineChart>
        </ResponsiveContainer>
      </div>
}



      {/* Progress Pie Chart */}
      <div className="col-md-6 mb-4">
        <h5 className="text-info">Role Distribution</h5>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={roleDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {roleDistribution.map((_, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}









