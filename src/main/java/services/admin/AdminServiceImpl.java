package services.admin;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import dto.BookCarDto;
import dto.CarDto;
import entity.BookCar;
import entity.Car;
import enums.BookCarStatus;
import lombok.RequiredArgsConstructor;
import repository.BookCarRepository;
import repository.CarRepository;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

	private final BookCarRepository bookCarRepository = null;
	private final CarRepository carRepository = null;

	@Override
	public boolean postCar(CarDto carDto) throws IOException {
		try {
			Car car = new Car();
			car.setName(carDto.getName());
			car.setBrand(carDto.getBrand());
			car.setColor(carDto.getColor());
			car.setPrice(carDto.getPrice());
			car.setYear(carDto.getYear());
			car.setType(carDto.getType());
			car.setDescription(carDto.getDescription());
			car.setTransmission(carDto.getTransmission());
			car.setImage(carDto.getImage().getBytes());
			carRepository.save(car);
			return true;
		} catch (Exception e) {
			// Log the exception if needed
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public List<CarDto> getAllCars() {
		return carRepository.findAll().stream().map(Car::getCarDto).collect(Collectors.toList());
	}

	@Override
	public void deleteCar(Long id) {
		carRepository.deleteById(id);
	}

	@Override
	public CarDto getCarById(Long id) {
		Optional<Car> optionalCar = carRepository.findById(id);
		return optionalCar.map(Car::getCarDto).orElse(null);
	}

	@Override
	public boolean updateCar(Long carId, CarDto carDto) {
		Optional<Car> optionalCar = carRepository.findById(carId);
		if (optionalCar.isPresent()) {
			Car existingCar = optionalCar.get();
			if (carDto.getImage() != null) {
				try {
					existingCar.setImage(carDto.getImage().getBytes());
				} catch (IOException e) {
					// Log the exception if needed
					e.printStackTrace();
				}
			}
			existingCar.setBrand(carDto.getBrand());
			existingCar.setPrice(carDto.getPrice());
			existingCar.setYear(carDto.getYear());
			existingCar.setTransmission(carDto.getTransmission());
			existingCar.setDescription(carDto.getDescription());
			existingCar.setColor(carDto.getColor());
			existingCar.setName(carDto.getName());
			existingCar.setType(carDto.getType());
			carRepository.save(existingCar);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public List<BookCarDto> getBookings() {
		return bookCarRepository.findAll().stream().map(BookCar::getBookCarDto).collect(Collectors.toList());
	}

	@Override
	public boolean changeBookStatus(Long bookingId, String status) {
		Optional<BookCar> optionalBookCar = bookCarRepository.findById(bookingId);
		if (optionalBookCar.isPresent()) {
			BookCar existingBookCar = optionalBookCar.get();
			if (Objects.equals(status, "Approve")) {
				existingBookCar.setBookCarStatus(BookCarStatus.APPROVED);
			} else {
				existingBookCar.setBookCarStatus(BookCarStatus.REJECTED);
			}
			bookCarRepository.save(existingBookCar);
			return true;
		}
		return false;
	}
}
