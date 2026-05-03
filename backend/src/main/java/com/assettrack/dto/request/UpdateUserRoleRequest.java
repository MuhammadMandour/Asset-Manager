package com.assettrack.dto.request;

import com.assettrack.domain.Role;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateUserRoleRequest {
    @NotNull
    private Role role;
}
