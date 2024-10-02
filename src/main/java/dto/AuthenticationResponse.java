package dto;

import enums.UserRole;
import lombok.Data;


@Data
public class AuthenticationResponse {
    private String jwt;
    private Long userId;
    private UserRole userRole;

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }
}
