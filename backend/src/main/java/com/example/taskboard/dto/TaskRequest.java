package com.example.taskboard.dto;

import com.example.taskboard.entity.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record TaskRequest(

        @NotBlank(message = "タイトルは必須です")
        @Size(max = 100, message = "タイトルは100文字以内で入力してください")
        String title,

        @Size(max = 1000, message = "説明は1000文字以内で入力してください")
        String description,

        @NotNull(message = "ステータスは必須です")
        TaskStatus status,

        LocalDate dueDate
) {
}
