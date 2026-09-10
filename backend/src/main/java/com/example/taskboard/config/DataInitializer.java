package com.example.taskboard.config;

import com.example.taskboard.entity.Task;
import com.example.taskboard.entity.TaskStatus;
import com.example.taskboard.repository.TaskRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initializeTasks(TaskRepository taskRepository) {
        return args -> {
            if (taskRepository.count() > 0) {
                return;
            }

            taskRepository.save(new Task(
                    "Reactの画面を確認する",
                    "一覧・登録・編集・削除の動作を確認する",
                    TaskStatus.TODO,
                    LocalDate.now().plusDays(7)
            ));

            taskRepository.save(new Task(
                    "Spring Bootのコードを読む",
                    "Controller → Service → Repository の順番で処理を追う",
                    TaskStatus.IN_PROGRESS,
                    LocalDate.now().plusDays(14)
            ));
        };
    }
}
