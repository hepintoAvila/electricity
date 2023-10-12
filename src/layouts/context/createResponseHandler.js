const createResponseHandler = (response, setData) => {
  return {
    default: () => setData.setItemsQuery(response)
  };
};
export default createResponseHandler;
