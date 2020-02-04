

package br.com.pw.tasklist.controller;


import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.pw.tasklist.entity.Task;
import br.com.pw.tasklist.repository.Tasks;
import java.util.Date;
/**
 *
 * @author pedroweber
 */
@RestController
@RequestMapping("/tasks")
public class TasksController{
        @Autowired
	private Tasks tasks;
	
	@PostMapping
	public Task adicionar(@Valid @RequestBody Task task) {
            task.setDataCadastro(new Date(System.currentTimeMillis()));
            return tasks.save(task);
	}
	
	@GetMapping
	public List<Task> listar() {
		return tasks.findAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Task> buscar(@PathVariable Long id) {
		Task task = tasks.getOne(id);
		
		if (task == null) {
			return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok(task);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Task> atualizar(@PathVariable Long id, 
			@Valid @RequestBody Task task) {
		Task existente = tasks.getOne(id);
		
		if (existente == null) {
			return ResponseEntity.notFound().build();
		}
		
                //Verificar se foi conclusao ou edicao
                if(task.getConcluida() != existente.getConcluida()){
                    if(task.getConcluida()){
                        task.setDataConclusao(new Date(System.currentTimeMillis()));
                    }else{
                        task.setDataConclusao(null);
                    }
                } else{
                    task.setDataEdicao(new Date(System.currentTimeMillis()));
                }
                
		BeanUtils.copyProperties(task, existente, "id");
		existente = tasks.save(existente);
		
		return ResponseEntity.ok(existente);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> remover(@PathVariable Long id) {
		Task task = tasks.getOne(id);
		
		if (task == null) {
			return ResponseEntity.notFound().build();
		}
		
		tasks.delete(task);
		
		return ResponseEntity.noContent().build();
	}
}
