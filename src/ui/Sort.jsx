import { useSearchParams } from 'react-router-dom';
import Select from './Select';

export default function Sort({ options }) {
  const [searchParam, setSearchParam] = useSearchParams();
  const currentSort = searchParam.get('sort') || options[0].value;

  function handleChange(e) {
    searchParam.set('sort', e.target.value);
    setSearchParam(searchParam);
  }

  return (
    <Select
      options={options}
      type="white"
      value={currentSort}
      onChange={handleChange}
    />
  );
}
