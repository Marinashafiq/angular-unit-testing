import { Injectable } from '@angular/core'  
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';  
import { Observable } from 'rxjs';  

  
@Injectable()  
export class AuthInterceptor implements HttpInterceptor {  

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
         
        const dummyrequest = req.clone({  
            setHeaders: {  
                'X-Api-Key':'7owts65tss9lxsvr'                 
            }  
        })  
        console.log("Cloned Request");   
        console.log(dummyrequest);   
        return next.handle(dummyrequest);  
    }  
}  