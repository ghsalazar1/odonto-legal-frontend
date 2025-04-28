import { Injectable } from "@angular/core";
import { UserDTO } from "../shared/models/user-model";

@Injectable({ providedIn: 'root' })
export class TokenService {

    Sigin(accessToken: any, user: UserDTO){
        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(user))
    }

    SignOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    GetUser(): UserDTO{
        var userRaw = localStorage.getItem('user');
        const user = userRaw ? JSON.parse(userRaw) : null;
        return user;

    }
}