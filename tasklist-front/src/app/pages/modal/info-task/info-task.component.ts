import { Component, Input, OnInit, Injectable } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { TasklistServiceService } from '../../../api/tasklist-service.service';


@Injectable({
  providedIn: "root"
})

@Component({
  selector: 'app-info-task',
  templateUrl: './info-task.component.html',
  styleUrls: ['./info-task.component.scss']
})
export class InfoTaskComponent implements OnInit {

  @Input() public taskSelected;

  task: any;
  constructor(
    public activeModal: NgbActiveModal, private service: TasklistServiceService
  ) { }

  ngOnInit() {
    this.task = {};
    this.task = this.taskSelected;
  }

  editar(frm: FormGroup) {
    this.service.editar(this.task).subscribe(resposta => {
      frm.reset();
    });
    this.activeModal.close();
  }

  deletar() {
    this.service.deletar(this.task).subscribe(resposta => {
      this.activeModal.close();
    });;

  }

  close() {
    this.activeModal.close();
  }
}