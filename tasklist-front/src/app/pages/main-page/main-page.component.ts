import { Component, OnInit, Injectable, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTaskComponent } from "../modal/create-task/create-task.component";
import { InfoTaskComponent } from '../modal/info-task/info-task.component'
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

import { TasklistServiceService } from '../../api/tasklist-service.service';
@Injectable({
  providedIn: "root"
})

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MainPageComponent implements OnInit {

  tasks: Array<any>;
  task: any;

  constructor(private modalService: NgbModal, private service: TasklistServiceService, private cd: ChangeDetectorRef) { }

  faPlusCircle = faPlusCircle;
  ngOnInit() {
    this.tasks = new Array<any>();

    this.updateTasksList();
  }

  updateTasksList() {
    this.service.listar()
      .subscribe(resposta => this.tasks = resposta);
    this.cd.detectChanges();
  }

  openCreateTask() {
    const modalRef = this.modalService.open(CreateTaskComponent);

    modalRef.result.then(() => {
      this.updateTasksList()
    });
  }

  openInfoTask(taskSelected: any) {
    const modalRef = this.modalService.open(InfoTaskComponent);
    modalRef.componentInstance.taskSelected = taskSelected;

    modalRef.result.then(() => {
      this.updateTasksList()
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      //call event conclusao
      this.task = event.item.data;
      console.log(event.previousContainer);
      if (event.previousContainer.id === 'cdk-drop-list-0') {
        this.task.concluida = true;
      } else {
        this.task.concluida = false;
      }
      this.service.editar(this.task).subscribe(resposta => this.updateTasksList());

    }
  }

  getTasksFazer() {
    return this.tasks.filter((task) => task.concluida == false);
  }

  getTasksConcluida() {
    return this.tasks.filter((task) => task.concluida == true);
  }


}
