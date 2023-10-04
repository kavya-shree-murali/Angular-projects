

export interface ICommunication {
    limit?: any;
    skip?: any;
    sortByKey: any
    sortByType: any
  }
  
  export class PaginationDTO implements ICommunication {
    limit ?: any = 10;
    skip ?: any = 0;
    sortByKey: any
    sortByType: any
  }
  