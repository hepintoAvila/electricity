/* eslint-disable import/no-anonymous-default-export */
const handleSearch = (event) => {
  //setSearchTerm(event.target.value);
  //setSearchResults(filterData(event.target.value));
};

const filterData = (searchTerm,data) => {
  return data?.filter((item) =>
    item?.label?.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export default {filterData,handleSearch};
