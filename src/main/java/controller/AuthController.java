package controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dto.AuthenticationRequest;
import dto.AuthenticationResponse;
import dto.SignUpRequest;
import dto.UserDto;
import jwt.UserService;
import lombok.RequiredArgsConstructor;
import repository.UserRepository;
import services.auth.AuthService;
import utils.JWTUtil;

@RestController
@RequestMapping("/api/auth")
//@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;
    
    public AuthController(JWTUtil jwtUtil, UserRepository userRepository,AuthService authService, AuthenticationManager authenticationManager,UserService userService) {
    	this.authService=authService;
    	this.jwtUtil=jwtUtil;
    	this.userRepository=userRepository;
    	this.authenticationManager=authenticationManager;
    	this.userService=userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signupCustomer(@RequestBody SignUpRequest signupRequest) {
        System.out.println("Signup Request: " + signupRequest);
        UserDto createdCustomerDto = authService.createCustomer(signupRequest);
        if (createdCustomerDto == null) {
            return new ResponseEntity<>("Customer not created, please try again later", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(createdCustomerDto, HttpStatus.CREATED);
        }
    }


    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                    		authenticationRequest.getEmail(),
                            authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(((UserDetails) authenticationRequest).getUsername());
        Optional<entity.User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());

        final String jwt = jwtUtil.generateToken(userDetails);
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();

        if (optionalUser.isPresent()) {
            authenticationResponse.setJwt(jwt);
            authenticationResponse.setUserId(optionalUser.get().getId());
            authenticationResponse.setUserRole(optionalUser.get().getUserRole()); // Adjust this if needed
        }

        return ResponseEntity.ok(authenticationResponse);
    }
}
