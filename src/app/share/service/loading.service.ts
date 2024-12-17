import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    isLoading = false;

    load() {
        this.isLoading = true;
    }

    stop() {
        this.isLoading = false;
    }
}
