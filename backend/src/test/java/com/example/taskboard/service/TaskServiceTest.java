package com.example.taskboard.service;

import com.example.taskboard.dto.TaskRequest;
import com.example.taskboard.dto.TaskResponse;
import com.example.taskboard.entity.Task;
import com.example.taskboard.entity.TaskStatus;
import com.example.taskboard.repository.TaskRepository;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class TaskServiceTest {

    private final TaskRepository taskRepository = mock(TaskRepository.class);
    private final TaskService taskService = new TaskService(taskRepository);

    @Test
    void findById_returnsTask() {
        Task task = new Task(
                "テストタスク",
                "説明",
                TaskStatus.TODO,
                LocalDate.of(2026, 9, 30)
        );

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        TaskResponse response = taskService.findById(1L);

        assertThat(response.title()).isEqualTo("テストタスク");
        assertThat(response.status()).isEqualTo(TaskStatus.TODO);
    }

    @Test
    void update_changesTaskValues() {
        Task task = new Task(
                "変更前",
                "説明",
                TaskStatus.TODO,
                null
        );

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        TaskRequest request = new TaskRequest(
                "変更後",
                "更新しました",
                TaskStatus.DONE,
                LocalDate.of(2026, 10, 1)
        );

        TaskResponse response = taskService.update(1L, request);

        assertThat(response.title()).isEqualTo("変更後");
        assertThat(response.status()).isEqualTo(TaskStatus.DONE);
        verify(taskRepository).findById(1L);
    }
}
