import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
@Injectable()

export class CourseGuardService implements CanActivate{
    router: any;
    constructor(private authService:AuthService,router:Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.authService.IsAuthenticated())
        {
            return true;
        }
        else{
            this.router.navigate(['']);
            return false;
        }
    }
    
}