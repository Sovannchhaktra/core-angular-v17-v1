import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Message} from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class RightPanelService {
    private emitShowRight = new Subject();
    showRight$ = this.emitShowRight.asObservable();

    addFormValidation(messages: Message[]) {
        this.emitShowRight.next({messages});
    }
}
