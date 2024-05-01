import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WordSearchService {
  private apiUrl = 'http://localhost:3000/users/searchWord'; // Update with your actual API URL

  constructor(private http: HttpClient) { }

  searchWord(word: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?word=${word}`).pipe(
      catchError((error) => {
        console.error('Error fetching word', error);
        return throwError(() => new Error('Error fetching word. Please check the console for details.'));
      })
    );
  }
}
