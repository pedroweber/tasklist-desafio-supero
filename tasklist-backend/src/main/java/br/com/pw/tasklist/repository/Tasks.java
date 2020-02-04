package br.com.pw.tasklist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.pw.tasklist.entity.Task;

@Repository
public interface Tasks extends JpaRepository<Task, Long> { }