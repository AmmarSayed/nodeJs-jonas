class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.qryString = queryString;
  }

  // FILTERING
  filter() {
    // 1A) Filtering
    const queryObjStr = { ...this.qryString };

    const excludedFields = [
      'page',
      'sort',
      'limit',
      'fields',
    ];

    excludedFields.forEach((el) => delete queryObjStr[el]);

    // 1B) Advanced Filtering
    let advQueryStr = JSON.stringify(queryObjStr);

    advQueryStr = advQueryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (matchedStr) => `$${matchedStr}`,
    );

    this.query = this.query.find(JSON.parse(advQueryStr));

    return this;
  }

  // SORTING
  sort() {
    if (this.qryString.sort) {
      const sortBy = this.qryString.sort
        .split(',')
        .join(' ');

      this.query = this.query.sort(sortBy);
    } else {
      // default sort
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  // LIMITING

  limitFields() {
    if (this.qryString.fields) {
      const fields = this.qryString.fields
        .split(',')
        .join(' ');

      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  // 4) Pagination

  paginate() {
    const page = this.qryString.page * 1 || 1;
    const limit = this.qryString.limit * 1 || 100;

    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
