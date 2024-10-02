package dto;


import enums.UserRole;
import lombok.Data;

@Data
public class UserDto {
	private Long id;
	private String name;
	private String email;
	
	private UserRole userRole;

	public void setId(Long id2) {
		// TODO Auto-generated method stub
		
	}
}
