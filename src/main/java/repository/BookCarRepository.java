package repository;

import org.springframework.stereotype.Repository;

import dto.BookCarDto;
import entity.BookCar;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface BookCarRepository extends JpaRepository<BookCar,Long> {

	List<BookCar> findAllByUserId(Long userId);

}
