import { HiOutlineBriefcase, HiOutlineChartBar } from 'react-icons/hi';
import Stat from './Stat';
import { HiOutlineBanknotes, HiOutlineCalendarDays } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}) {
  const numBookings = bookings?.length;
  const sales = bookings?.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const checkIns = confirmedStays?.length;
  const occupancy =
    confirmedStays?.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        color="blue"
        title="Bookings"
        value={numBookings}
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        color="green"
        title="Sales"
        value={formatCurrency(sales)}
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        color="indigo"
        title="Check ins"
        value={checkIns}
      />
      <Stat
        icon={<HiOutlineChartBar />}
        color="yellow"
        title="Occupancy"
        value={Math.round(occupancy * 100) + '%'}
      />
    </>
  );
}
