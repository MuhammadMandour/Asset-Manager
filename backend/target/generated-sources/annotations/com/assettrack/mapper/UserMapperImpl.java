package com.assettrack.mapper;

import com.assettrack.domain.User;
import com.assettrack.dto.response.UserResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-05-04T01:09:51+0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.10 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserResponse toResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponse userResponse = new UserResponse();

        userResponse.setId( user.getId() );
        userResponse.setEmail( user.getEmail() );
        userResponse.setFullName( user.getFullName() );
        userResponse.setRole( user.getRole() );
        userResponse.setCreatedAt( user.getCreatedAt() );

        return userResponse;
    }
}
