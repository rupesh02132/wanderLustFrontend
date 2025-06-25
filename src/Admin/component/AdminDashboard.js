import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser,getUser } from '../../state/auth/Action';
import { getAllListings } from '../../state/listing/Action';
import {getAllBookings, getMyBookings,getHostBookings } from '../../state/booking/Action';
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

  /* selectors from section‑1 */
  const {
    auth,
    isLoading: usersLoading,
    error: usersError,
  } = useSelector(store=>store);
 
console.log("auth..",auth);
  const {listings} = useSelector((s) => s.listings);


  const {loading: bookingsLoading,error: bookingsError,} = useSelector((s) => s.bookings);
   const userBookings = useSelector(store=>store.bookings.allBookings);



  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getAllListings());
    dispatch(getAllBookings());
    dispatch(getHostBookings());
    dispatch(getUser());
  }, [dispatch]);

  /* chart data */
  const barData = {
    labels: ['Users', 'Listings', 'Bookings'],
    datasets: [
      {
        data: [auth.users?.users?.length, listings.length, userBookings.length],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="mb-8 text-3xl font-bold tracking-tight">Admin Dashboard</h2>

      {/* Stat cards */}
      <div className="mb-10 grid gap-6 sm:grid-cols-3">
        <StatCard title="Total Users" value={auth.users?.users?.length} />
        <StatCard title="Total Listings" value={listings.length} />
        <StatCard title="Total Bookings" value={userBookings.length} />
      </div>

      {/* Bar chart */}
      <div className="mb-12 rounded-lg bg-white p-6 shadow">
        <Bar data={barData} options={{ plugins: { legend: { display: false } } }} />
      </div>

      {/* Recent tables */}
      <div className="grid gap-8 lg:grid-cols-2">
        <RecentTable
          title="Recent Users"
          headers={['Name', 'Email', 'Admin']}
          rows={auth.users?.users?.slice(0, 10).map((u) => [
            u.firstname + ' ' + u.lastname,
            u.email,
            u.isAdmin ? 'Yes' : 'No',
          ])}
          loading={usersLoading}
          error={usersError}
        />

        <RecentTable
          title="Recent Bookings"
          headers={['Listing', 'Total', 'Paid']}
          rows={userBookings.slice(0, 10).map((b) => [
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

/* --- small reusable components --- */
const StatCard = ({ title, value }) => (
  <div className="rounded-lg bg-white p-6 shadow">
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <p className="mt-2 text-3xl font-bold text-gray-800">{value}</p>
  </div>
);

const RecentTable = ({ title, headers, rows, loading, error }) => (
  <div className="rounded-lg bg-white p-6 shadow">
    <h4 className="mb-4 text-lg font-semibold">{title}</h4>
    {loading ? (
      <p>Loading…</p>
    ) : error ? (
      <p className="text-red-500">{error}</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              {headers.map((h) => (
                <th key={h} className="px-4 py-2 font-medium text-gray-600">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows?.map((row, i) => (
              <tr key={i} className="border-b last:border-none">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-2">
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
