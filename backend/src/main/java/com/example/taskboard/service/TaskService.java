package com.example.taskboard.service;

import com.example.taskboard.dto.TaskRequest;
import com.example.taskboard.dto.TaskResponse;
import com.example.taskboard.entity.Task;
import com.example.taskboard.exception.TaskNotFoundException;
import com.example.taskboard.repository.TaskRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<TaskResponse> findAll() {
        return taskRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"))
                .stream()
                .map(TaskResponse::from)
                .toList();
    }

    public TaskResponse findById(Long id) {
        return TaskResponse.from(findEntityById(id));
    }

    @Transactional
    public TaskResponse create(TaskRequest request) {
        Task task = new Task(
                request.title(),
                request.description(),
                request.status(),
                request.priority(),
                request.dueDate()
        );

        return TaskResponse.from(taskRepository.save(task));
    }

    @Transactional
    public TaskResponse update(Long id, TaskRequest request) {
        Task task = findEntityById(id);

        task.update(
                request.title(),
                request.description(),
                request.status(),
                request.priority(),
                request.dueDate()
        );

        return TaskResponse.from(task);
    }

    @Transactional
    public void delete(Long id) {
        Task task = findEntityById(id);
        taskRepository.delete(task);
    }

    private Task findEntityById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
    }
}
