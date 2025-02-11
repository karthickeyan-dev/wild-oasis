import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import Sort from '../../ui/Sort';

export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: 'all', label: 'All' },
          { value: 'with-discount', label: 'With Discount' },
          { value: 'no-discount', label: 'No Discount' },
        ]}
      />
      <Sort
        options={[
          { value: 'name-asc', label: 'Sort by Name (A-Z)' },
          { value: 'name-desc', label: 'Sort by Name (Z-A)' },
          { value: 'regularPrice-asc', label: 'Sort by Price (Lowest)' },
          { value: 'regularPrice-desc', label: 'Sort by Price (Highest)' },
          { value: 'maxCapacity-asc', label: 'Sort by Capacity (Low)' },
          { value: 'maxCapacity-desc', label: 'Sort by Capacity (High)' },
        ]}
      />
    </TableOperations>
  );
}
