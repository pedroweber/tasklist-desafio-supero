
import { Component, Input, OnInit, Injectable } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { TasklistServiceService } from '../../../api/tasklist-service.service';

@Injectable({
  providedIn: "root"
})
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  @Input() title = `Information`;

  task: any;
  constructor(
    public activeModal: NgbActiveModal, private service: TasklistServiceService
  ) { }

  ngOnInit() {
    this.task = {};
  }

  criar(frm: FormGroup) {
    this.task.concluida = false;
    this.service.criar(this.task).subscribe(resposta => {
      frm.reset();
    });
    this.activeModal.close();
  }
  close() {
    this.activeModal.close();
  }
}
