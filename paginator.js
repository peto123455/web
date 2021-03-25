class Paginator {
    constructor(array, pageNumber, limit) {
      this.pageNumber = pageNumber;
      this.limit = limit;
      this.array = array;
  
      this.totalPages = Math.ceil((this.array.length) / this.limit);
  
      this.hasNextPage = this.totalPages > this.pageNumber;
      this.hasPreviousPage = this.pageNumber > 1;
  
      if (this.hasNextPage)
        this.nextPageNumber = this.pageNumber + 1;
      if (this.hasPreviousPage)
        this.previousPageNumber = this.pageNumber - 1;
    }
  
    paginate() {
      return this.array.slice((this.pageNumber - 1) * this.limit, this.pageNumber * this.limit);
    }
  }
  
  module.exports = Paginator;