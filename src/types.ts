export interface IUserData {
    items: IUser[];
    total_count: number;
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
export interface IUserStore {
    items: IUser[];
    total_count: number;
    searchParams: IFormData;
}
