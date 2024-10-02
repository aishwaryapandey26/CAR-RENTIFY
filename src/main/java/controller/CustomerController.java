package controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dto.BookCarDto;
import dto.CarDto;
import lombok.RequiredArgsConstructor;
import services.customer.CustomerService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customer")
public class CustomerController {

	private final CustomerService customerService = null;
	
	@GetMapping("/cars")
	public ResponseEntity<List<CarDto>> getAllCars() {
	    List<CarDto> carDtoList = customerService.getAllCars();
	    return ResponseEntity.ok(carDtoList);
	}
	@PostMapping("/car/book")
	public ResponseEntity<Void> bookCar(@RequestBody BookCarDto bookCarDto){
		boolean success =customerService.bookCar(bookCarDto);
		if(success)return ResponseEntity.status(HttpStatus.CREATED).build();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
;	}
	
	@GetMapping("/car/{carId")
public ResponseEntity<CarDto> getCarById(@PathVariable Long carId){
		CarDto carDto=customerService.getCarById(carId);
		if(carDto==null) return ResponseEntity.notFound().build();
		return ResponseEntity.ok(carDto);
	}
	@GetMapping("/car/bookings/userId")
	public ResponseEntity<List<BookCarDto>> getBookingsByUserId(@PathVariable Long userId){
		return ResponseEntity.ok(customerService.getBookingsByUserId(userId));
	}

}
