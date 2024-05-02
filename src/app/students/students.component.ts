import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent implements OnInit, AfterViewInit {
  public students: any;
  public myDataSource: any;

  // liste des colonnes que l'on veut afficher
  public displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'payments',
  ];
  /**
   * 1ere chose: Etablissement du lien vers paginator avec le decorator @ViewChild
   * 2eme chose: Associer ce paginator au dataSource
   * Il faut donc le mettre une fois le composant est initialisé
   * Pour donc faire un traitement une fois que le composant est initialisé;
   * On importe l'interface AfterViewInit
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.students = [];
    for (let i: number = 1; i <= 100; i++) {
      this.students.push({
        id: i,
        firstName: Math.random().toString(20),
        lastName: Math.random().toString(20),
      });
    }

    /**
     * Pour afficher le tableau, il faut appeler la classe MatTableDataSource
     * Et lui affecter notre tableau
     */
    this.myDataSource = new MatTableDataSource(this.students);
  }

  ngAfterViewInit(): void {
    this.myDataSource.paginator = this.paginator;
    this.myDataSource.sort = this.sort;
  }

  /**
   *  Search a student
   *  D'abord, il faut recuperer la valeur
   */
  searchStudents(event: Event) {
    let value: string = (event.target as HTMLInputElement).value;
    this.myDataSource.filter = value;
  }

  getPayments(student: any) {
    this.router.navigateByUrl('payments');
  }
}
