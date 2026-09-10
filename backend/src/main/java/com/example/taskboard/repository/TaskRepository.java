package com.example.taskboard.repository;

import com.example.taskboard.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

// テストコミット用コメント
public interface TaskRepository extends JpaRepository<Task, Long> {
}
