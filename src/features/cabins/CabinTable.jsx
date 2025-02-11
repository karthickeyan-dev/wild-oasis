import { useSearchParams } from 'react-router-dom';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import CabinRow from './CabinRow';
import useCabins from './useCabins';

export default function CabinTable() {
  const { isPending, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;
  //FILTER
  const filterValue = searchParams.get('discount') || 'all';

  const filteredCabins = cabins.filter(cabin => {
    if (filterValue === 'all') return true;
    if (filterValue === 'with-discount') return cabin.discount !== 0;
    if (filterValue === 'no-discount') return cabin.discount === 0;
    return true;
  });
  //SORT
  const sortValue = searchParams.get('sort') || 'name-asc';
  const [field, direction] = sortValue.split('-');
  const modifier = direction === 'asc' ? 1 : -1;

  const sortedCabins = filteredCabins.toSorted((a, b) => {
    if (typeof a[field] === 'number' && typeof b[field] === 'number') {
      return (a[field] - b[field]) * modifier;
    }
    if (typeof a[field] === 'string' && typeof b[field] === 'string') {
      return a[field].localeCompare(b[field]) * modifier;
    }
    return 0;
  });
  // console.log(filterValue, sortValue);

  return (
    <Menus>
      <Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
