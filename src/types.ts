export interface IUserData {
    userList: IUser[];
    totalCount: number;
}

export interface IUser {
    avatar_url: string;
    html_url: 'https://github.com/srg';
    id: number;
    login: string;
    type: 'Organization';
}

export interface IFormData {
    userLogin: string;
    currentPage: number;
    sort: string;
    order: string;
}
