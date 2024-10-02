package services.admin;
import java.util.*;

import java.io.IOException;

import dto.BookCarDto;
import dto.CarDto;

public interface AdminService {

	boolean postCar(CarDto carDto) throws IOException;
	
	List<CarDto> getAllCars();
	
	void deleteCar(Long id);
	
	CarDto getCarById(Long id);
	
	boolean updateCar(Long carId,CarDto carDto);
	
	List<BookCarDto> getBookings();
	
	boolean changeBookStatus(Long bookingId, String status);
}
