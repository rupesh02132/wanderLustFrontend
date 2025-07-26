import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser, getUser } from '../../state/auth/Action';
import { getAllListings } from '../../state/listing/Action';
import { getAllBookings, getHostBookings } from '../../state/booking/Action';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const AdminDashboardScreen = () => {
  const dispatch = useDispatch();

  const { auth, isLoading: usersLoading, error: usersError } = useSelector(store => store);
  const { listings } = useSelector(s => s.listings);
  const { loading: bookingsLoading, error: bookingsError } = useSelector(s => s.bookings);
  const userBookings = useSelector(store => store.bookings.allBookings);

  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getAllListings());
    dispatch(getAllBookings());
    dispatch(getHostBookings());
    dispatch(getUser());
  }, [dispatch]);

  const barData = {
    labels: ['Users', 'Listings', 'Bookings'],
    datasets: [
      {
        data: [
          auth.users?.users?.length || 0,
          listings?.length || 0,
          userBookings?.length || 0
        ],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
      },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <h2 className="mb-6 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-800">
        Admin Dashboard
      </h2>

      {/* Stat cards */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <StatCard title="Total Users" value={auth.users?.users?.length || 0} />
        <StatCard title="Total Listings" value={listings?.length || 0} />
        <StatCard title="Total Bookings" value={userBookings?.length || 0} />
      </div>

      {/* Bar chart */}
      <div className="mb-10 rounded-lg bg-white p-4 sm:p-6 shadow overflow-x-auto">
        <div className="min-w-[300px] sm:min-w-0">
          <Bar
            data={barData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
            }}
            height={300}
          />
        </div>
      </div>

      {/* Recent tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentTable
          title="Recent Users"
          headers={['Name', 'Email', 'Admin']}
          rows={auth.users?.users?.slice(0, 10).map(u => [
            `${u.firstname} ${u.lastname}`,
            u.email,
            u.isAdmin ? 'Yes' : 'No',
          ])}
          loading={usersLoading}
          error={usersError}
        />

        <RecentTable
          title="Recent Bookings"
          headers={['Listing', 'Total', 'Paid']}
          rows={userBookings?.slice(0, 10).map(b => [
            b.listing?.title,
            `$${b.totalPrice}`,
            b.isPaid ? 'Yes' : 'No',
          ])}
          loading={bookingsLoading}
          error={bookingsError}
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="rounded-lg bg-white p-4 sm:p-6 shadow flex flex-col items-start">
    <p className="text-xs sm:text-sm font-medium text-gray-500">{title}</p>
    <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-gray-800">{value}</p>
  </div>
);

const RecentTable = ({ title, headers, rows, loading, error }) => (
  <div className="rounded-lg bg-white p-4 sm:p-6 shadow">
    <h4 className="mb-3 sm:mb-4 text-lg font-semibold text-gray-800">{title}</h4>
    {loading ? (
      <p className="text-gray-500">Loading…</p>
    ) : error ? (
      <p className="text-red-500">{error}</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              {headers.map(h => (
                <th key={h} className="px-3 sm:px-4 py-2 font-medium text-gray-600 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows?.map((row, i) => (
              <tr key={i} className="border-b last:border-none">
                {row.map((cell, j) => (
                  <td key={j} className="px-3 sm:px-4 py-2 whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default AdminDashboardScreen;
