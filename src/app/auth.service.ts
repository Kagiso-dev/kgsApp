import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthService implements CanActivate {

    constructor(private router: Router, private user: UserService) {}

    async canActivate(route) {
        if (await this.user.isAuthenticated()) {
            return true;
        }
        return false;
    }

}

