const pagination = (page = 1, limit = 10, totalItems) => {
  const totalPage = Math.ceil(totalItems / limit);
  const pagination = {
    page,
    limit,
    totalPage,
    totalItems,
  };
  if (page > 1) {
    pagination.prev_page = page - 1;
  }
  if (page < totalPage) {
    pagination.next_page = page - 0 + 1;
  }
  return pagination;
};

module.exports = pagination;
