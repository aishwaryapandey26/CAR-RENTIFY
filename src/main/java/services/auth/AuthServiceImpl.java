package services.auth;

import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import dto.SignUpRequest;
import dto.UserDto;
import entity.User;
import enums.UserRole;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository = null;
 
    @PostConstruct
    public void createAdminAccount() {
    User adminAccount=userRepository.findUserRole(UserRole.ADMIN);
    if(adminAccount==null) {
    	User newAdminAccount=new User();
    	newAdminAccount.setName("admin");
    	newAdminAccount.setEmail("admin@test.com");
    	newAdminAccount.setPassword(new BCryptPasswordEncoder().encode("admin"));
    	newAdminAccount.setUserRole(UserRole.ADMIN);
    	userRepository.save(newAdminAccount);
    	System.out.println("Admin account is created successfully");
    	
    }
    
    }
    @Override
    public UserDto createCustomer(SignUpRequest signupRequest) {
        User user = new User();
        user.setName(signupRequest.getName());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        user.setUserRole(UserRole.CUSTOMER);

        User createdUser = userRepository.save(user);
        UserDto userDto = new UserDto();
        userDto.setId(createdUser.getId());
        return userDto;
    }

    @Override
    public boolean hasCustomerWithEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }
}
