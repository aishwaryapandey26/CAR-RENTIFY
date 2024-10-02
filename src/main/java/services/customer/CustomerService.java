package services.customer;

import java.util.List;

import dto.BookCarDto;
import dto.CarDto;

public interface CustomerService {

	List<CarDto> getAllCars();
	
	boolean bookCar(BookCarDto bookCarDto);
	CarDto getCarById(Long Id);
	
	List<BookCarDto> getBookingsByUserId(Long userId);
}
