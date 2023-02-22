import { Injectable } from '@angular/core';

@Injectable()
export class PersistanceService {

    /**
     *  Добавление данных в localStorage в формате JSON
     */
    public set(key: string, data: any): void {
        return key === 'token'
          ? localStorage.setItem(key, data)
          : localStorage.setItem(key, JSON.stringify(data));
    }

    /**
     *  Удаление данных по ключу из localStorage
     */
    public remove(key: string): void {
        return localStorage.removeItem(key);
    }

    /**
     *  Извлечение данных по ключу из localStorage
     */
    public get<T>(key: string): T {
        return key === 'token' ? localStorage.getItem(key) : localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : null;
    }
}
