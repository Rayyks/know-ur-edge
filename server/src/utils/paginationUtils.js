const paginate = (query, { page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const options = { skip, limit: parseInt(limit) };
  return { query, options };
};

module.exports = paginate;
