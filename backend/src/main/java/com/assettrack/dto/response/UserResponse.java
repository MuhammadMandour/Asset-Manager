package com.assettrack.dto.response;

import com.assettrack.domain.Role;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class UserResponse {
    private UUID id;
    private String email;
    private String fullName;
    private Role role;
    private LocalDateTime createdAt;
}
