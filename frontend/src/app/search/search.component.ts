import { Component } from '@angular/core';
import { WordSearchService } from '../services/word-search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  wordDefinition: string = '';
  errorMessage: string = '';
  searchTerm: string = "";

  constructor(private wordSearchService: WordSearchService) { }

  onSearchWord(word: string): void {
    console.log('Searching for:', word);
    this.wordSearchService.searchWord(word).subscribe({
      next: (response) => {
        console.log('Response:', response);
        this.wordDefinition = response.definition || 'No definition found';
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.message || 'An error occurred while fetching the word';
        this.wordDefinition = '';
        console.error('API Error:', error);
      }
    });
  }
  resetSearch(): void {
    this.wordDefinition = '';
    this.errorMessage = '';
    this.searchTerm = '';
    console.log('Search reset');
  }
  
}
