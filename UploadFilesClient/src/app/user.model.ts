export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: number;
    address: string;
    email: string;
    imgPath?: string;
    filePath?: string;
}