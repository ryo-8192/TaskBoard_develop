package com.example.taskboard.config;

import com.example.taskboard.entity.Task;
import com.example.taskboard.entity.TaskPriority;
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

            // 既存データのpriorityがnullの場合、MEDIUMに更新
            taskRepository.findAll().forEach(task -> {

                System.out.println(
                        "更新前: id=" + task.getId()
                                + ", priority=" + task.getPriority()
                );

                if (task.getPriority() == null) {

                    task.setPriority(TaskPriority.MEDIUM);

                    System.out.println(
                            "setter後: id=" + task.getId()
                                    + ", priority=" + task.getPriority()
                    );

                    Task saved = taskRepository.saveAndFlush(task);

                    System.out.println(
                            "保存後: id=" + saved.getId()
                                    + ", priority=" + saved.getPriority()
                    );
                }
            });

            // 既存データが存在する場合、初期データは追加しない
            if (taskRepository.count() > 0) {
                return;
            }

            // 初期データ1
            taskRepository.save(new Task(
                    "Reactの画面を確認する",
                    "一覧・登録・編集・削除の動作を確認する",
                    TaskStatus.TODO,
                    TaskPriority.MEDIUM,
                    LocalDate.now().plusDays(7)
            ));

            // 初期データ2
            taskRepository.save(new Task(
                    "Spring Bootのコードを読む",
                    "Controller → Service → Repository の順番で処理を追う",
                    TaskStatus.IN_PROGRESS,
                    TaskPriority.MEDIUM,
                    LocalDate.now().plusDays(14)
            ));
        };
    }
}