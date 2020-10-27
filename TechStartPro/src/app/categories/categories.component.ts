import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { AngularFirestore } from  '@angular/fire/firestore';
import {CategoriesService} from '../services/categories.service'
import { MatSnackBar, _SnackBarContainer } from '@angular/material/snack-bar';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  csvRecords: any[] = [];
  header = false;
 
  constructor(private ngxCsvParser: NgxCsvParser,
  private firestore: AngularFirestore,
  private categoriesService: CategoriesService,
  private snackBar: MatSnackBar,
  ) { }
 
  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;
 
  // Your applications input change listener for the CSV File
  fileChangeListener($event: any): void {
 
    // Select the files from the event
    const files = $event.srcElement.files;
 
    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
 
        for(let i = 0; i < result.length; i++){
          var resultado = result[i].toString();
          this.categoriesService.add(resultado);
        }

        this.csvRecords = result;

        this.snackBar.open('Categories list added successfully!');
        
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
        this.snackBar.open('Error Wrong format file!');
      });
 
  }

  ngOnInit(): void{
    
  }

}
