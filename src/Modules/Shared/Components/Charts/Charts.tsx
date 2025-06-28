
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useMemo } from 'react';
import { useAuth } from '../../../../Hooks/useAuth';

ChartJS.register(ArcElement, Tooltip, Legend);

type DashboardProps = {
  activeUsers: number;
  inactiveUsers: number;
  todo: number;
  inProgress: number;
  done: number;
  totalProjects: number | null;
  tasksNumber:number,
};

export default function Charts({
  activeUsers ,
  inactiveUsers,
  todo,
  inProgress,
  done,
  totalProjects,
  tasksNumber
}: DashboardProps) {

const {isEmployee} = useAuth()

  const userStatusData = useMemo(() => ({
    labels: ['Active Users', 'Inactive Users'],
    datasets: [
      {
        data: [activeUsers, inactiveUsers],
        backgroundColor: ['#28a745', '#dc3545'],
        borderWidth: 1,
      },
    ],
  }), [activeUsers, inactiveUsers]);





  const taskStatusData = useMemo(() => ({
    labels: ['To Do', 'In Progress', 'Done'],
    datasets: [
      {
        data: [todo, inProgress, done],
        backgroundColor: ['#ffc107', '#0d6efd', '#20c997'],
        borderWidth: 1,
      },
    ],
  }), [todo, inProgress, done]);

  const projectData = useMemo(() => ({
    labels: ['Projects'],
    datasets: [
      {
        data: [totalProjects],
        backgroundColor: ['#6f42c1'],
        borderWidth: 1,
      },
    ],
  }), [totalProjects]);

  return (
    <div className="container py-4">
      <div className="row g-4 justify-content-center">


        {/* Users */}
        {!isEmployee && <div className="col-md-4">
          <div className="card p-3 shadow text-center">
            <h5 className="mb-3">Users Status</h5>
            <Doughnut data={userStatusData} />
            <span className='pt-2 fs-6 fw-light text-info'>{`Number Of All Users ${activeUsers + inactiveUsers}`}</span>
          </div>
        </div>}


        {/* Tasks */}
        <div className="col-md-4">
          <div className="card p-3 shadow text-center">
            <h5 className="mb-3">Tasks Status</h5>
            <Doughnut data={taskStatusData} />
         <span className='pt-2 fs-6 fw-light text-info'>{`Number Of All Tasks ${tasksNumber}`}</span>
          </div>
        </div>

        {/* Projects */}
        <div className="col-md-4">
          <div className="card p-3 shadow text-center">
            <h5 className="mb-3">Projects Count</h5>
            <Pie data={projectData} />
       <span className='pt-2 fs-6 fw-light text-info'>{`Number Of All Projects ${totalProjects}`}</span>

          </div>
        </div>
      </div>
    </div>
  );
}
