import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class MsgService {

    constructor(private messageService: MessageService) {
    }

    info(title: string, msg: string) {
        this.messageService.add({key: 'tst', severity: 'info', summary: title, detail: msg});
    }

    warning(title: string, msg: string) {
        this.messageService.add({key: 'tst', severity: 'warn', summary: title, detail: msg});
    }

    error(title: string, msg: string) {
        this.messageService.add({key: 'tst', severity: 'error', summary: title, detail: msg});
    }

    success(title: string, msg: string) {
        this.messageService.add({key: 'tst', severity: 'success', summary: title, detail: msg});
    }

    clearMessage() {
        //  this.messageService.clear();
    }
}
