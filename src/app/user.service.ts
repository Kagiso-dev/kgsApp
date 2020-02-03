import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
interface User {
    username: string;
    uid: string;
}


@Injectable()
export class UserService {
    private user: User;

    constructor(private afAuth: AngularFireAuth) {}

    setUser(user: User) {
        this.user = user;
    }

    getUID() {
        /*if (!this.user) {
            if (this.afAuth.auth.currentUser) {
                const user = this.afAuth.auth.currentUser;
                this.setUser({
                    username: user.email,
                    uid: user.uid
                });
                return user.uid;
            } else {
                throw new Error('User not logged in');
            }
        } else {
            return this.user.uid;
        }*/
        return this.user.uid;
    }

    async isAuthenticated() {
        if (this.user) {
            return true;
        }

        const user = await this.afAuth.authState.pipe(first()).toPromise();

        if (user) {
            this.setUser({
                username: user.email,
                uid: user.uid
            });
            return true;
        }
        return false;
    }

    getUsername() {
        return this.user.username;
    }

}



