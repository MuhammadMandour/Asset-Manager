package com.assettrack.service;

import com.assettrack.domain.Role;
import com.assettrack.domain.User;
import com.assettrack.dto.request.LoginRequest;
import com.assettrack.dto.request.SignupRequest;
import com.assettrack.dto.response.AuthResponse;
import com.assettrack.repository.UserRepository;
import com.assettrack.security.JwtTokenProvider;
import com.assettrack.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthResponse signup(SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new IllegalArgumentException("Error: Email is already in use!");
        }

        // Create new user's account
        User user = User.builder()
                .fullName(signUpRequest.getFullName())
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .role(Role.DEVELOPER) // Default role
                .build();

        userRepository.save(user);

        // Auto login after signup
        return login(new LoginRequest(signUpRequest.getEmail(), signUpRequest.getPassword()));
    }

    public AuthResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtTokenProvider.generateToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userRepository.findByEmail(userDetails.getEmail()).orElseThrow();

        return AuthResponse.builder()
                .token(jwt)
                .userId(userDetails.getId())
                .email(userDetails.getEmail())
                .fullName(userDetails.getFullName())
                .role(user.getRole())
                .build();
    }
}
