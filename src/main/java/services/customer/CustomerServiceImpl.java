package services.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dto.BookCarDto;
import dto.CarDto;
import entity.BookCar;
import entity.Car;
import lombok.RequiredArgsConstructor;
import repository.BookCarRepository;
import repository.CarRepository;
import repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CarRepository carRepository = null;
    private final UserRepository userRepository = null;
    private final BookCarRepository bookCarRepository = null;

    @Override
    public List<CarDto> getAllCars() {
        try {
            return carRepository.findAll().stream() // Changed to carRepository
                .map(Car::getCarDto) // Assuming Car entity has getCarDto() method
                .collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
            return List.of(); // Return an empty list in case of an error
        }
    }

    @Override
    @Transactional // Ensure that booking is done within a transaction
    public boolean bookCar(BookCarDto bookCarDto) {
        try {
            BookCar bookCar = new BookCar();
            // Set properties from DTO to entity
            bookCar.setFromDate(bookCarDto.getFromDate());
            bookCar.setToDate(bookCarDto.getToDate());
            bookCar.setDays(bookCarDto.getDays());
            bookCar.setPrice(bookCarDto.getPrice());
            bookCar.setBookCarStatus(bookCarDto.getBookCarStatus());

            // Assuming user and car are fetched from their respective repositories
            bookCar.setUser(userRepository.findById(bookCarDto.getUserId()).orElse(null));
            bookCar.setCar(carRepository.findById(bookCarDto.getCarId()).orElse(null));

            bookCarRepository.save(bookCar); // Save the booking
            return true; // Booking successful
        } catch (Exception e) {
            e.printStackTrace();
            return false; // Booking failed
        }
    }

    @Override
    public CarDto getCarById(Long id) {
        Optional<Car> optionalCar = carRepository.findById(id);
        return optionalCar.map(Car::getCarDto).orElse(null);
    }

    @Override
    public List<BookCarDto> getBookingsByUserId(Long userId) {
        return bookCarRepository.findAllByUserId(userId).stream()
            .map(BookCar::getBookCarDto) // Correctly map to BookCarDto
            .collect(Collectors.toList());
    }

}
