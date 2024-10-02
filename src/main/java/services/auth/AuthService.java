package services.auth;

import dto.SignUpRequest;
import dto.UserDto;

public interface AuthService {
	
UserDto createCustomer(SignUpRequest signupRequest);

boolean hasCustomerWithEmail(String email);
}
