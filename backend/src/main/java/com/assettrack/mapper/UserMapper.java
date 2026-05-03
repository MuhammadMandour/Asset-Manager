package com.assettrack.mapper;

import com.assettrack.domain.User;
import com.assettrack.dto.response.UserResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toResponse(User user);
}
